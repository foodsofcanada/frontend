import React from "react";
//import { Link } from "react-router-dom";
import InfoBar from "./InfoBar";
import GoogleMap from "./GoogleMap";
import SearchSideBar from "./SearchSidebar";
import ProductInfoSidebar from "./ProductInfoSidebar";
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
      },
      currentPage: ""
    };

    this.openCloseBar = this.openCloseBar.bind(this);
  }

  setCurrentPage = value => {
    this.setState({ currentPage: value });
  };

  componentDidUpdate() {
    console.log("Main component update!");

    if (this.state.tabOpen === true) {
      document.getElementById("bar").style.width = "360px";
    } else {
      document.getElementById("bar").style.width = "0";
    }
  }

  setSelectedMarker = marker => {
    // this.setState( {selectedMarker: marker} );
    console.log("selected markers: " + marker.label.text);
  };

  setCurrentMarkers = markers => {
    // console.log(markers)
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
    console.log(this.state.currentPage + " this is the current page");
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
          <GoogleMap
            language={this.props.language}
            setSelectedMarker={this.setSelectedMarker}
            currentMarkers={this.state.currentMarkers}
            setCurrentMarkers={this.setCurrentMarkers}
            setCurrentPage={this.setCurrentPage}
            setSelectedRegion={this.setSelectedRegion}
          />
        </div>
        {this.state.currentPage.startsWith("products/") ? (
          <ProductInfoSidebar
            currentProduct={this.state.currentPage}
            setCurrentPage={this.setCurrentPage}
          />
        ) : (
          <InfoBar
            header={this.state.selectedRegion}
            currentMarkers={this.state.currentMarkers}
            setCurrentPage={this.setCurrentPage}
          />
        )}

        <SearchSideBar 
          setCurrentMarkers={this.setCurrentMarkers}
        />

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
