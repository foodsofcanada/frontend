import React from "react";
//import { Link } from "react-router-dom";
import InfoBar from "./InfoBar";
import GoogleMap from "./GoogleMap";

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedMarker: null,
      currentMarkers: [],
      selectedRegion: null,
      showState: {
        showTop10: true,
        showPantries: false,
        showFav: false,
        showRegion: false,
        showProductInformation: false
      }
    };
  }

  componentDidUpdate() {
    console.log("Main component update!");
  }

  setSelectedMarker = marker => {
    // this.setState( {selectedMarker: marker} );
    console.log("selected markers: " + marker.label.text);
  };

  setCurrentMarkers = markers => {
    // console.log("update markers: " + markers);
    this.setState({ currentMarkers: markers });
  };

  setSelectedRegion = region => {
    this.setState({ selectedRegion: region });
    console.log("selected Region: " + region);
  };

  render() {
    // const p = "hello";
    return (
      //   <Link to="/settings">{p === "Hell" ? <h1>Hello</h1> : <h1>Ho</h1>}</Link>
      <div>
        <div
          style={{
            display: "inline-flex",
            width: "75%",
            position: "fixed"
          }}
        >
          <GoogleMap
            language={this.props.language}
            setSelectedMarker={this.setSelectedMarker}
            currentMarkers={this.state.currentMarkers}
            setCurrentMarkers={this.setCurrentMarkers}
            setSelectedRegion={this.setSelectedRegion}
          />
        </div>
        <InfoBar
          header={this.state.selectedRegion}
          currentMarkers={this.state.currentMarkers}
        />
      </div>
    );
  }
}

export default Main;
