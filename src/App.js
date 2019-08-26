import React from "react";
import "./App.css";
import loader from "quantlib-wasm";
import wasm from "quantlib-wasm/dist/quantlib.wasm";
import fetchMarketData from "./fetchMarketData";

const toWasmVector = (arr, type) => {
    let res = new type(arr.length);
    for (let j = 0; j < arr.length; j++) {
        res.set(j, arr[j]);
    }
    return res;
};

function bootstrap(QuantLib, marketData) {
    const { Date, /*Sweden,*/ SwapRateHelper, Frequency, USDLibor, Month, Compounding } = QuantLib;
    const { TimeUnit, BusinessDayConvention, setValuationDate, Actual360, QuoteHandle, Period, DepositRateHelper } = QuantLib;

    const toPeriod = (str) => new Period(Number(str.substring(0, str.length-1)), TimeUnit[str[str.length-1]]);
    var calendar = new QuantLib.UnitedKingdom(QuantLib.UnitedKingdomMarket.Settlement);

    var todaysDate = Date.fromISOString(marketData[0].date);
    var fixingDays = 2;
    var settlementDate = calendar.advance(todaysDate, fixingDays, TimeUnit.Days, BusinessDayConvention.Following, false);
    setValuationDate(todaysDate);

    var depositDayCounter = new Actual360();
    var depositsBusinessDayConvention = BusinessDayConvention.ModifiedFollowing;

    var trashcan = [calendar, settlementDate, todaysDate, depositDayCounter];

    var depoFutSwapInstruments = [];

    var deposits = marketData.filter(d=>d.type==="Deposit");
    deposits.forEach((d) => {
        var quote = new QuoteHandle(d.price);
        var period = toPeriod(d.period);
        depoFutSwapInstruments.push(
            new DepositRateHelper(quote, period, fixingDays, calendar, depositsBusinessDayConvention, true, depositDayCounter)
        );
        trashcan.push(quote);
        trashcan.push(period);
    });

    var swFixedLegFrequency = Frequency.Annual;
    var swFixedLegConvention = BusinessDayConvention.Unadjusted;
    var swFixedLegDayCounter = new Actual360();
    var swFloatingLegIndexPeriod = new Period(3, TimeUnit.Months);
    var swFloatingLegIndex = new USDLibor(swFloatingLegIndexPeriod);
    trashcan.push(swFixedLegDayCounter);
    trashcan.push(swFloatingLegIndexPeriod);
    trashcan.push(swFloatingLegIndex);

    var swaps = marketData.filter(d=>d.type==="Swap");
    swaps.forEach((d) => {
        var quote = new QuoteHandle(d.price);
        var period = toPeriod(d.period);
        depoFutSwapInstruments.push(
            new SwapRateHelper(
                quote,
                period,
                calendar,
                swFixedLegFrequency,
                swFixedLegConvention,
                swFixedLegDayCounter,
                swFloatingLegIndex
            )
        );
        trashcan.push(quote);
        trashcan.push(period);
    });

    var termStructureDayCounter = new Actual360();
    trashcan.push(termStructureDayCounter);
    var instrs = toWasmVector(depoFutSwapInstruments, QuantLib.Vector$RateHelper$);
    var depoFutSwapTermStructure = new QuantLib.PiecewiseYieldCurve$Discount$Linear$(
        settlementDate,
        instrs,
        termStructureDayCounter,
        1.0e-15
    );

    var curveDate = new Date(18, Month.February, 2020);
    var interestRate = depoFutSwapTermStructure.zeroRate(curveDate, depositDayCounter, Compounding.Compounded, Frequency.Annual, false);
    console.log(`${interestRate}`);
    interestRate.delete();

    trashcan.push(depoFutSwapTermStructure);
    trashcan.push(instrs);

    trashcan.forEach((d) => d.delete());
}

class App extends React.Component {
    constructor(props) {
        super(props);
        const QuantLib = loader({ locateFile: (path) => (path.endsWith(".wasm") ? wasm : path) });
        QuantLib.onRuntimeInitialized = () => {
            this.setState({ status: "Done!", QuantLib });
            var marketData = fetchMarketData();
            bootstrap(QuantLib, marketData);
        };
        this.state = { status: "Loading...", QuantLib };
    }

    render() {
        const { status, QuantLib } = this.state;
        return <h2>{status + (QuantLib.version ? ` Version ${QuantLib.version} loaded` : ``)}</h2>;
    }
}

export default App;
