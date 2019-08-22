import React from "react";
import "./App.css";
import loader from "quantlib-wasm";
import wasm from "quantlib-wasm/dist/quantlib.wasm";

class App extends React.Component {
    constructor(props) {
        super(props);
        const QuantLib = loader({ locateFile: (path) => (path.endsWith(".wasm") ? wasm : path) });
        QuantLib.onRuntimeInitialized = () => {
            this.setState({ status: "Done!", QuantLib });
        };
        this.state = { status: "Loading...", QuantLib };
    }
    render() {
        const { status, QuantLib } = this.state;
        return <h2>{status + (QuantLib.version ? ` Version ${QuantLib.version} loaded` : ``)}</h2>;
    }
}

export default App;
