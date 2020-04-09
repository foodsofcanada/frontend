import React from "react";
//import { Link } from "react-router-dom";
import InfoBar from "./InfoBar";
import GoogleMap from "./GoogleMap";
import SearchSideBar from "./SearchSidebar";
import ProductInfoSidebar from "./ProductInfoSidebar";
import ProfileSidebar from "./ProfileSidebar";
import FavoritesBar from "./FavoritesBar";
import PantriesBar from "./PantriesBar";
import PantryInfo from "./PantryInfo";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import "./css/Main.css";
import CreatePantry from "./popUp/CreatePantryPopup";
import PantryPopup from "./popUp/ListOfPantriesPopup";
import AddedPopup from "./popUp/ProductAddedPopup";
import NotAddedPopup from "./popUp/ProductNotAddedPopup";

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedMarker: null,
      header: "Top 10 searched products",
      currentMarkers: [],
      tabOpen: true,
      userPantries: [],
      tabOpenSearch: true,
      selectedRegion: null,
      prevPage: "",
      currentPage: "",
      productToAddToPantry: null,
      url: "",
      searchBody: null,
    };

    // this.openCloseBar = this.openCloseBar.bind(this);
    this.openCloseSearchBar = this.openCloseSearchBar.bind(this);
  }

  //this sets the url that the info bar would use to refetch
  setUrl = (value) => {
    this.setState({ url: value });
  };

  setBody = (value) => {
    this.setState({ searchBody: value });
  };

  setproductToAddToPantry = (value) => {
    let prod = {
      prodId: value.actualProduct,
      regId: value.regionId,
      coordinates: value.coordinates,
    };
    this.setState({ productToAddToPantry: prod });
  };
  setUserPantries = (value) => {
    this.setState({ userPantries: value });
  };

  setCurrentPage = (value) => {
    this.setState({ currentPage: value });
  };

  setPrevPage = (value) => {
    this.setState({ prevPage: value });
  };

  componentDidUpdate() {
    console.log("Main component update!");

    if (this.state.tabOpen === true) {
      document.getElementById("bar").style.width = "360px";
    } else {
      document.getElementById("bar").style.width = "0";
    }

    if (this.state.tabOpenSearch === true) {
      document.getElementById("searchbar").style.width = "360px";
    } else {
      document.getElementById("searchbar").style.width = "0";
    }
  }

  setSelectedMarker = (marker) => {
    // this.setState( {selectedMarker: marker} );
    console.log("selected markers: " + marker.label.text);
  };

  setHeader = (newHeader) => {
    console.log("New Header: " + newHeader);
    this.setState({ header: newHeader });
  };

  setCurrentMarkers = (markers) => {
    // console.log(markers)
    this.setState({ currentMarkers: markers });
  };

  setSelectedRegion = (regionName, regionID) => {
    this.setState({ selectedRegion: regionName });
    console.log("selected Region: " + regionID);
  };

  openCloseBar = () => {
    this.setState((prevState) => ({
      tabOpen: !prevState.tabOpen,
    }));
  };

  openCloseSearchBar() {
    this.setState((prevState) => ({
      tabOpenSearch: !prevState.tabOpenSearch,
    }));
  }

  sidebarController = () => {
    if (this.state.currentPage.startsWith("products/")) {
      return (
        <ProductInfoSidebar
          currentProduct={this.state.currentPage}
          setCurrentPage={this.setCurrentPage}
          prevPage={this.state.prevPage}
        />
      );
    }

    if (this.state.currentPage.startsWith("profile/")) {
      return (
        <ProfileSidebar
          header={this.state.selectedRegion}
          currentMarkers={this.state.currentMarkers}
          setCurrentPage={this.setCurrentPage}
        />
      );
    }

    if (this.state.currentPage.startsWith("favorites/")) {
      return (
        <FavoritesBar
          header={this.state.selectedRegion}
          setCurrentMarkers={this.setCurrentMarkers}
          currentMarkers={this.state.currentMarkers}
          setCurrentPage={this.setCurrentPage}
          currentPage={this.state.currentPage}
          setPrevPage={this.setPrevPage}
          setproductToAddToPantry={this.setproductToAddToPantry}
        />
      );
    }

    if (this.state.currentPage.startsWith("pantry/")) {
      return (
        <PantriesBar
          header={this.state.selectedRegion}
          currentMarkers={this.state.currentMarkers}
          userPantries={this.state.userPantries}
          setUserPantries={this.setUserPantries}
          setCurrentPage={this.setCurrentPage}
        />
      );
    }

    if (this.state.currentPage.startsWith("pantryinfo/")) {
      return (
        <PantryInfo
          header={this.state.selectedRegion}
          setCurrentMarkers={this.setCurrentMarkers}
          currentMarkers={this.state.currentMarkers}
          setCurrentPage={this.setCurrentPage}
          currentPage={this.state.currentPage}
          setPrevPage={this.setPrevPage}
          setproductToAddToPantry={this.setproductToAddToPantry}
        />
      );
    }
    return (
      <InfoBar
        // header={this.state.selectedRegion}
        header={this.state.header}
        setCurrentMarkers={this.setCurrentMarkers}
        currentMarkers={this.state.currentMarkers}
        setCurrentPage={this.setCurrentPage}
        currentPage={this.state.currentPage}
        setPrevPage={this.setPrevPage}
        url={this.state.url}
        body={this.state.searchBody}
        setproductToAddToPantry={this.setproductToAddToPantry}
      />
    );
  };

  render() {
    // const p = "hello";
    const bar = this.sidebarController();
    console.log(this.state.currentPage + " this is the current page");
    return (
      //   <Link to="/settings">{p === "Hell" ? <h1>Hello</h1> : <h1>Ho</h1>}</Link>
      <div>
        <PantryPopup
          userPantries={this.state.userPantries}
          setUserPantries={this.setUserPantries}
          product={this.state.productToAddToPantry}
        />
        <NotAddedPopup />
        <AddedPopup />
        <CreatePantry setUserPantries={this.setUserPantries} />
        <div
          style={{
            display: "inline-flex",
            width: "100%",
            position: "fixed",
            zIndex: "0",
          }}
        >
          <GoogleMap
            language={this.props.language}
            setSelectedMarker={this.setSelectedMarker}
            setHeader={this.setHeader}
            currentMarkers={this.state.currentMarkers}
            setCurrentMarkers={this.setCurrentMarkers}
            setCurrentPage={this.setCurrentPage}
            setSelectedRegion={this.setSelectedRegion}
            closeBar={this.openCloseSearchBar}
            closeBarState={this.state.tabOpenSearch}
            infoBarState={this.state.tabOpen}
            openInfoBar={this.openCloseBar}
            setUrl={this.setUrl}
          />
        </div>
        {bar}

        {/* <PantryInfo
          header={this.state.selectedRegion}
          currentMarkers={this.state.currentMarkers}
          setCurrentPage={this.setCurrentPage}
        /> */}
        <SearchSideBar
          setCurrentMarkers={this.setCurrentMarkers}
          setHeader={this.setHeader}
          setCurrentPage={this.setCurrentPage}
          setUrl={this.setUrl}
          setBody={this.setBody}
        />

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
                transform: "rotate(270deg)",
              }}
            />
          ) : (
            <ReactSVG
              src={icon}
              style={{
                height: "15px",
                marginTop: "11.5px",
                marginLeft: "10.5px",
                transform: "rotate(90deg)",
              }}
            />
          )}
        </div>
        <div
          className="d-flex justify-content-center pullTab2"
          onClick={this.openCloseSearchBar}
        >
          {!this.state.tabOpenSearch ? (
            <ReactSVG
              src={icon}
              style={{
                height: "15px",
                marginTop: "11px",
                marginRight: "9px",
                transform: "rotate(270deg)",
              }}
            />
          ) : (
            <ReactSVG
              src={icon}
              style={{
                height: "15px",
                marginTop: "11.5px",
                marginLeft: "10.5px",
                transform: "rotate(90deg)",
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Main;
