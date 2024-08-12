import React, { useState, useEffect } from "react";
import "./App.css";

import Plotly from "plotly.js-finance-dist";
import createPlotlyComponent from "react-plotly.js/factory";

import wasmUrl from "quantlib-wasm/dist/quantlib.wasm?url";
import quantlibWasm from "quantlib-wasm";

import { marketData } from "./fetchMarketData";
import bootstrap from "./bootstrap";

const Plot = createPlotlyComponent(Plotly);

const Table = ({ headers, columns, rows }) => (
    <table className="table table-sm table-dark table-striped">
        <thead>
            <tr>
                {headers.map((d, i) => (
                    <th className="" key={i}>
                        {d}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {rows
                ? rows.map((d, i) => (
                      <tr key={i}>
                          {columns.map((e, i) => (
                              <td key={i}>{d[e]}</td>
                          ))}
                      </tr>
                  ))
                : null}
        </tbody>
    </table>
);

const CaptorLogomark = ({ thickness }) => {
    const { sin, acos, sqrt } = Math;
    var sw = 1;
    var r = thickness ? sw / Number(thickness) : 20;
    var width = sw + 2 * r;
    var height = width;

    var f = (x) => sin(acos(x));
    var scale = (d) => sw / 2 + r + d * r;
    var df = (c, xs) => c + xs.map((d, i) => (c === "A" && i <= 4 ? d : scale(d).toFixed(2))).join(",");

    var x1 = -0.666666;
    var y1 = f(x1);
    var x2 = x1 + sqrt(3) * y1;
    var y2 = f(x2);

    var s1 = df("M", [x1, -y1]) + df("L", [x1, y1]) + df("L", [x2, 0]) + df("L", [x1, -y1]);
    var s2 = df("M", [x2, 0]) + df("L", [x2, y2]) + df("A", [r, r, 0, 1, 1, x2, -y2]) + df("L", [x2, 0]);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" className="captor-logomark">
            <path fill="none" strokeWidth={sw} strokeLinejoin="bevel" d={s1} />
            <path fill="none" strokeWidth={sw} d={s2} />
        </svg>
    );
};

const Footer = (props) => (
    <React.Fragment>
        <a href="https://nodei.co/npm/quantlib-wasm" rel="nofollow">
            <img
                src="https://camo.githubusercontent.com/19eaafc39d5790116e1728fb7219d748537661bc/68747470733a2f2f6e6f6465692e636f2f6e706d2f7175616e746c69622d7761736d2e706e673f646f776e6c6f6164733d7472756526646f776e6c6f616452616e6b3d74727565"
                alt="NPM"
                style={{ maxWidth: "100%" }}
            />
        </a>
        <a href="https://captor.se/">
            <CaptorLogomark thickness={1 / 15} />
        </a>
        <a href="https://reactjs.org/">
            <svg className="react-logomark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
                <g fill="#61DAFB">
                    <path
                        d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-4
9.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"
                    />
                    <circle cx="420.9" cy="296.5" r="45.7" />
                    <path d="M520.5 78.1z" />
                </g>
            </svg>
        </a>
    </React.Fragment>
);

function App() {
    const [quantLibLoaded, setQuantLibLoaded] = useState(false);
    const [QuantLib, setQuantLib] = useState(null);

    useEffect(() => {
        if (!quantLibLoaded) {
            quantlibWasm({
                locateFile: () => wasmUrl,
            }).then((loaded) => {
                setQuantLib(loaded);
                setQuantLibLoaded(true);
            });
        }
    });

    const headers = ["Instrument", "Type", "Price"];
    const columns = ["name", "type", "quote"];

    if (!QuantLib) {
        return <div></div>;
    }

    const { benchmarks, curvePoints } = bootstrap(QuantLib, marketData);
    let trace1 = {
        x: benchmarks.map((d) => new Date(d.date)),
        y: benchmarks.map((d) => d.rate),
        mode: "markers",
        type: "scatter",
    };
    let trace2 = {
        x: curvePoints.map((d) => new Date(d.date)),
        y: curvePoints.map((d) => d.rate),
        mode: "lines",
        type: "scatter",
    };
    let data = [trace1, trace2];
    let layout = {
        yaxis: {
            color: "#ffb15e",
            gridcolor: "#454d55",
            tickformat: ".2%f",
            zeroline: false,
        },
        xaxis: {
            color: "#ffb15e",
            gridcolor: "#454d55",
            hoverformat: "%Y-%m-%d",
        },
        paper_bgcolor: "#222",
        plot_bgcolor: "#343434",
        margin: { l: 42, r: 10, t: 2, b: 20, pad: 0 },
        colorway: ["#ffb15e", "#1f77b4"],
        showlegend: false,
        font: "Inconsolata",
        autosize: true,
    };

    if (marketData) {
        marketData.forEach((d) => {
            if (!("quote" in d)) {
                Object.defineProperty(d, "quote", {
                    get: () => `${(100 * d.price).toFixed(4)}%`,
                });
            }
        });
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h2>Swedish Kronor interest rate swap yield curve</h2>
                    <h4>Market date: 2019-08-26</h4>
                    <p className="text">
                        This app uses QuantLib WebAssembly, which is a JavaScript compilation of the quantitative finance library QuantLib (codebase in C++).
                        The app fetches latest market prices and bootstraps the interest yield curve in pure JavaScript. No server-side calculations or
                        rendering is needed. The app only loads static content.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Table headers={headers} columns={columns} rows={marketData} />
                </div>
                <div className="col-12 col-md-6">
                    <Plot
                        data={data}
                        layout={layout}
                        useResizeHandler={true}
                        style={{ width: "100%", height: "100%" }}
                        config={{
                            responsive: true,
                            displayModeBar: true,
                            showSendToCloud: false,
                            toImageButtonOptions: { format: "svg" },
                            displaylogo: false,
                            modeBarButtonsToRemove: [
                                "zoom2d",
                                "pan2d",
                                "select2d",
                                "resetViews",
                                "toggleSpikelines",
                                "hoverClosestCartesian",
                                "hoverCompareCartesian",
                                "lasso2d",
                                "zoomIn2d",
                                "zoomOut2d",
                                "autoScale2d",
                                "resetScale2d",
                                "hoverClosestPie",
                                "sendDataToCloud",
                            ],
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default App;
