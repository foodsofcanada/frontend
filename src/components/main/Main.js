import React from "react";
//import { Link } from "react-router-dom";
import InfoBar from "./InfoBar";
import GoogleMap from "./GoogleMap";
import SearchSideBar from "./SearchSidebar";
// import ProductInfoSidebar from "./ProductInfoSidebar";
// import ProfileSidebar from "./ProfileSidebar";
// import FavoritesBar from "./FavoritesBar";
// import PantriesBar from "./PantriesBar";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import "./css/Main.css";
import SearchSidebar from "./SearchSidebar";

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedMarker: null,
      currentMarkers: [],
      tabOpen: true,
      selectedRegion: null,
      showState: {
        showTop10: true,
        showPantries: false,
        showFav: false,
        showRegion: false,
        showProductInformation: false
      }
    };

    this.openCloseBar = this.openCloseBar.bind(this);
  }

  componentDidUpdate() {
    console.log("Main component update!");

    if (this.state.tabOpen === true) {
      document.getElementById("bar").style.width = "360px";
    } else {
      document.getElementById("bar").style.width = "0";
    }

    fetch("http://localhost:8080/save-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": "password",
        "password": "yellow",
        })
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
      });
  }

  setSelectedMarker = marker => {
    // this.setState( {selectedMarker: marker} );
    console.log("selected markers: " + marker.label.text);
  };

  setCurrentMarkers = markers => {
    this.setState({ currentMarkers: markers });
  };

  setSelectedRegion = (regionName, regionID) => {
    this.setState({ selectedRegion: regionName });
    console.log("selected Region: " + regionID);
  };

  openCloseBar() {
    this.setState(prevState => ({
      tabOpen: !prevState.tabOpen
    }));
  }

  render() {
    // const p = "hello";

    return (
      //   <Link to="/settings">{p === "Hell" ? <h1>Hello</h1> : <h1>Ho</h1>}</Link>
      <div>
        <div
          style={{
            display: "inline-flex",
            width: "100%",
            position: "fixed",
            zIndex: "0"
          }}
        >
          <SearchSidebar/>

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
        <SearchSideBar/>

        {/* <ProductInfoSidebar
          header={this.state.selectedRegion}
          currentMarkers={this.state.currentMarkers}
        /> */}

        {/* <ProfileSidebar
          header={this.state.selectedRegion}
          currentMarkers={this.state.currentMarkers}
        /> */}

        {/* <FavoritesBar
          header={this.state.selectedRegion}
          currentMarkers={this.state.currentMarkers}
        /> */}
        {/* 
        <PantriesBar
          header={this.state.selectedRegion}
          currentMarkers={this.state.currentMarkers}
        /> */}
        <div
          className="d-flex justify-content-center pullTab"
          onClick={this.openCloseBar}
        >
          {this.state.tabOpen ? (
            <ReactSVG
              src={icon}
              style={{
                height: "15px",
                marginTop: "11px",
                marginRight: "9px",
                transform: "rotate(270deg)"
              }}
            />
          ) : (
            <ReactSVG
              src={icon}
              style={{
                height: "15px",
                marginTop: "11.5px",
                marginLeft: "10.5px",
                transform: "rotate(90deg)"
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Main;
