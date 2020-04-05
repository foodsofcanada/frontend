import React, { Component, createRef } from "react";
import Regions from "../../data/Regions.json";
import favourite from "../../data/favourite.json";
const mapStyles = {
  width: "100vw",
  height: "100vh"
};

var regionsPolygons = [];
var currentHighlightedRegions = []; //holds regionId
var markers = [];

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionsPolygons: []
    };
    this.googleMapRef = createRef();
  }

  componentDidMount() {
    if (document.getElementById('map') !== null) {
      var element = document.getElementById('map');
      element.parentNode.removeChild(element);
    }
    const googleMapScript = document.createElement("script");
      googleMapScript.setAttribute("id", "map");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&language=${this.props.language}`;
      window.document.body.appendChild(googleMapScript);

      googleMapScript.addEventListener("load", () => {
        this.createGoogleMap();
        this.showTop10Products();
        this.createRegions();
      });
    
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.currentMarkers !== this.props.currentMarkers;
    // return false;
  }

  componentDidUpdate() {
    console.log("Google Map Component updated!");
    // console.log(regionsPolygons)
    /****************************************************
     * unhighlight of currentlyHighlightedRegions
     ***************************************************/
    let length = currentHighlightedRegions.length;
    while (length !== 0) {
      let pos = regionsPolygons
        .map(element => {
          return element.regionId;
        })
        .indexOf(currentHighlightedRegions[0]);
      regionsPolygons[pos].toggleHighlightRegion();
      length--;
    }

    /****************************************
     * Highlight region of currentMarkers
     *****************************************/
    // console.log(this.props.currentMarkers)
    this.props.currentMarkers.forEach(marker => {
      if (currentHighlightedRegions.indexOf(marker.regionId) === -1) {
        // console.log(marker)
        let index = regionsPolygons
          .map(element => {
            return element.regionId;
          })
          .indexOf(marker.regionId);
        regionsPolygons[index].toggleHighlightRegion();
      }
    });
  } //end of componentDidMount

  createGoogleMap = () => {
    // var CANADA_BOUNDS = {
    //   north: 85.06,
    //   south: 40,
    //   west: -165.6,
    //   east: 0
    // };

    this.googleMap = new window.google.maps.Map(this.googleMapRef.current, {
      center: {
        lat: 59.8478,
        lng: -80.8939
      },
      zoom: 4,
      // restriction: {
      //   latLngBounds: CANADA_BOUNDS,
      //   strictBounds: false,
      // },
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true
    });
    this.googleMap.setOptions({ minZoom: 3, maxZoom: 6 });
  };

  showTop10Products = () => {
    let url = this.appendEmail("http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/products/top");
    fetch(url)
      .then(response => response.json())
      .then(data => {

        this.props.setCurrentMarkers(data);
        // console.log(favourite)
        // this.props.setCurrentMarkers(favourite);

      })
      .catch(() => {
        console.log("Failed to fetch top 10 products");
      });
    // this.showMarkers(top10Products); //uncomment to enable top10products markers. Note must uncomment all showMarkers()
  };

  showMarkers = newMarkers => {
    for (let index = 0; index < newMarkers.length; index++) {
      const { position } = newMarkers[index];
      let gMapMarker = new window.google.maps.Marker({
        position: {
          lat: position.lat,
          lng: position.lng
        },
        label: {
          text: (index + 1).toString(),
          color: "white"
        },
        map: this.googleMap
      });

      gMapMarker.addListener("click", () => {
        this.props.setSelectedMarker(gMapMarker);
      });
      markers.push(gMapMarker);
    }
  };

  clearCurrentMarkers = () => {
    // this.props.setCurrentMarkers([]);
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  };

  createRegions = () => {
    var regions = Regions;
    for (let regionsIndex = 0; regionsIndex < regions.length; regionsIndex++) {
      //loop every region
      //every region
      // console.log("region: " + regions)
      let polygons = regions[regionsIndex].polygons;
      for (
        let polygonsIndex = 0;
        polygonsIndex < polygons.length;
        polygonsIndex++
      ) {
        //loop every polygons in a region
        //every polygons
        // console.log("polygons: " + polygons[polygonsIndex])
        // console.log("outer: " + polygons[polygonsIndex].outerPath)
        let polygon = polygons[polygonsIndex];
        let polygonPaths = [];
        let outerPath = this.convertStringToArrayCoords(polygon.outerPath);
        polygonPaths.push(outerPath);
        for (
          let innerIndex = 0;
          innerIndex < polygon.innerPaths.length;
          innerIndex++
        ) {
          //loop every inner polygon
          // console.log("inner: " + polygon.innerPaths[innerIndex].innerPath)
          let innerPath = this.convertStringToArrayCoordsBackwards(
            polygon.innerPaths[innerIndex].innerPath
          );
          polygonPaths.push(innerPath);
        }
        let pushpinsCoords = this.convertStringToArrayCoords(
          regions[regionsIndex].pushpins
        );
        let regionInfo = {
          regionName: regions[regionsIndex].regionName,
          regionId: regions[regionsIndex].regionId,
          polygonStyle: regions[regionsIndex].polygonStyle,
          polygonPaths: polygonPaths,
          pushpins: pushpinsCoords
        };
        this.createRegion(regionInfo);
      }
    }
  };

  convertStringToArrayCoords = MultiGeometryCoordinates => {
    let finalData = [];
    var grouped = MultiGeometryCoordinates.split("\n");
    grouped.forEach(function (item, i) {
      let a = item.trim().split(",");

      finalData.push({
        lng: parseFloat(a[0]),
        lat: parseFloat(a[1])
      });
    });
    return finalData;
  };

  convertStringToArrayCoordsBackwards = MultiGeometryCoordinates => {
    let finalData = [];
    var grouped = MultiGeometryCoordinates.split("\n");
    for (let index = grouped.length - 1; index >= 0; index--) {
      let item = grouped[index];
      let a = item.trim().split(",");

      finalData.push({
        lng: parseFloat(a[0]),
        lat: parseFloat(a[1])
      });
    }
    return finalData;
  };

  /************************************************************
   * Regions/Polygons
   ************************************************************/
  createRegion = regionInfo => {
    // const { strokeColor, strokeWeight, fillColor } = regionInfo.polygonStyle;
    const { strokeWeight, fillColor } = regionInfo.polygonStyle;
    let regionPushpins = [];
    var polygon = new window.google.maps.Polygon({
      paths: regionInfo.polygonPaths,
      // strokeColor: strokeColor,
      strokeColor: "#7764e4",
      strokeWeight: strokeWeight,
      fillColor: fillColor,
      fillOpacity: 0.6,
      map: this.googleMap
    });
    polygon.addListener("click", event => {
      /**
       * Show products in region
       **/
      this.googleMap.panTo(event.latLng);
      // this.googleMap.setZoom(6);
      this.props.setSelectedRegion(regionInfo.regionName, regionInfo.regionId);
      if (this.props.closeBarState === true) {
        this.props.closeBar();
      }

      let url = this.appendEmail("http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/productRegion/" + regionInfo.regionId);
      fetch(url)
        .then(response => response.json())
        .then(productsInRegion => {
          console.log(productsInRegion)
          this.props.setHeader(
            "Products in " + regionInfo.regionName + " Region"
          );
          this.showProductsInRegion(productsInRegion);
          this.props.setCurrentPage("");
        })
        .catch(() => {
          console.log("Failed to retrieve products in region");
        }); //Fetch closing brackets

      // unhightlightAllRegions();
      // toggleHighlightRegion();
    });

    polygon.addListener("mouseover", event => {
      if (regionPushpins.length === 0) {
        regionPushpins = this.createPushpinsInRegion(
          regionInfo.pushpins,
          regionInfo.regionName
        );
      } else {
        regionPushpins.forEach(pushpin => {
          pushpin.setMap(this.googleMap);
        });
      }

      let isHighlighted = this.isHighlighted(regionInfo.regionId);

      if (!isHighlighted) {
        regionsPolygons.forEach(regionPolygons => {
          if (regionPolygons.regionId === regionInfo.regionId) {
            regionPolygons.polygon.setOptions({ strokeWeight: "2" });
          }
        });
      }
    });

    polygon.addListener("mouseout", event => {
      regionPushpins.forEach(element => {
        element.setMap(null);
      });

      let isHighlighted = this.isHighlighted(regionInfo.regionId);

      if (!isHighlighted) {
        regionsPolygons.forEach(regionPolygons => {
          if (regionPolygons.regionId === regionInfo.regionId) {
            regionPolygons.polygon.setOptions({ strokeWeight: "0.2" });
          }
        });
      }
    });

    let unhightlightAllRegions = () => {
      regionsPolygons.forEach(region => {
        for (let index = 0; index < currentHighlightedRegions.length; index++) {
          const regionId = currentHighlightedRegions[index];
          if (
            regionId === region.regionId &&
            region.regionId !== regionInfo.regionId
          ) {
            region.toggleHighlightRegion();
            currentHighlightedRegions = [];
          }
        }
      });
    };

    let toggleHighlightRegion = () => {
      let isHighlighted = this.isHighlighted(regionInfo.regionId);
      if (isHighlighted) {
        regionsPolygons.forEach(regionPolygons => {
          if (regionInfo.regionId === regionPolygons.regionId) {
            regionPolygons.polygon.setOptions({ strokeWeight: "0.2" });
          }
        });

        for (let index = 0; index < currentHighlightedRegions.length; index++) {
          const hightlightedRegion = currentHighlightedRegions[index];
          if (hightlightedRegion === regionInfo.regionId) {
            currentHighlightedRegions.splice(index, 1);
          }
        }
      } else {
        regionsPolygons.forEach(regionPolygons => {
          if (regionInfo.regionId === regionPolygons.regionId) {
            regionPolygons.polygon.setOptions({ strokeWeight: "2" });
          }
        });
        currentHighlightedRegions.push(regionInfo.regionId);
      }
    };

    regionsPolygons.push({
      regionId: regionInfo.regionId,
      polygon: polygon,
      toggleHighlightRegion: toggleHighlightRegion
    });
  };

  showProductsInRegion = products => {
    this.clearCurrentMarkers();
    this.props.setCurrentMarkers(products);
    // this.showMarkers(products);
    // this.highlightRegion(regionId);
  };

  /********************************
   * Create Region Pushpins
   ********************************/
  createPushpinsInRegion = (pushpins, regionName) => {
    return pushpins.map(element => {
      let marker = new window.google.maps.Marker({
        position: {
          lat: element.lat,
          lng: element.lng
        },
        // icon: {
        //   url: "http://maps.google.com/mapfiles/kml/shapes/placemark_circle.png",
        //   labelOrigin: new window.google.maps.Point(10, 3),
        // },
        icon: "#",
        label: {
          text: regionName,
          fontSize: "12px",
          color: "ffffff",
          fontWeight: "bold"
        },
        map: this.googleMap
      });
      marker.setOpacity(1);
      return marker;
    });
  };

  isHighlighted = regionId => {
    let isHighlighted = false;
    currentHighlightedRegions.forEach(ID => {
      if (ID === regionId) {
        isHighlighted = true;
      }
    });
    return isHighlighted;
  };

  appendEmail(url) {
    const email = sessionStorage.getItem("currentUser");
    if (email !== null && email !== "") {
      url += "/" + email;
    } else {
      url += "/\"\"";
    }
    return url;
  }

  render() {
    return (
      <div>
        <div ref={this.googleMapRef} id="google-map" style={mapStyles} />
      </div>
    );
  }
}

export default GoogleMap;
