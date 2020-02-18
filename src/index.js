import React, { Component } from "react";
import ReactDOM from "react-dom";
import SeasonalDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends Component {
  state = {
    lat: null,
    long: null,
    errormessage: "",
    display: "block"
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          display: "none"
        });
      },
      err => {
        this.setState({
          errorMessage: err.message,
          display: "none"
        });
      }
    );
  }
  render() {
    const { lat, long, errorMessage } = this.state;
    return (
      <div>
        <div style={{ display: this.state.display }}>
          <Spinner message="Waiting for location request..." />
        </div>
        {lat === null ? (
          <h1>{errorMessage}</h1>
        ) : (
          <SeasonalDisplay lat={lat} long={long} errorMessage={errorMessage} />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
