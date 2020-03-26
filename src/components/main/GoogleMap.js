import React, { Component, createRef } from "react";
import top10Products from "../../data/topTenProducts.json";
// import top10Products from "../../data/TempTop10.json";
import Regions from "../../data/Regions.json";
// import Regions from "../../data/TempRegion.json";
// import Regions from "../../data/TempRegion_pushpin.json";
import ProductsInRegion from "../../data/productsInRegion.json";
const mapStyles = {
  width: "100vw",
  height: "100vh"
};

var regionsPolygons = [];
var currentHighlightedRegions = []; //holds reg_id
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
    const googleMapScript = document.createElement("script");
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
          return element.reg_id;
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
      if (currentHighlightedRegions.indexOf(marker.reg_id) === -1) {
        // console.log(marker)
        let index = regionsPolygons
          .map(element => {
            return element.reg_id;
          })
          .indexOf(marker.reg_id);
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
    fetch("http://localhost:8080/products")
      .then(response => response.json())
      .then(data => {
        /*********************************************************************
         * TO BE CHANGED ONCE BACKEND HAS IMPLEMENTED TO FETCH /TOP10PRODUCTS
         *********************************************************************/
        let temp = top10Products;
        temp.forEach(product => {
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            if (product.prod_id === element.prod_id) {
              product.name = element.name;
            }
          }
        });
        this.props.setCurrentMarkers(temp);
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
          name: regions[regionsIndex].name,
          reg_id: regions[regionsIndex].reg_id,
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
    grouped.forEach(function(item, i) {
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
      this.props.setSelectedRegion(regionInfo.name, regionInfo.reg_id);
      if (this.props.closeBarState === true) {
        this.props.closeBar();
      }

      fetch("http://localhost:8080/productRegion/" + regionInfo.reg_id)
        .then(response => response.json())
        .then(productsInRegion => {
          // console.log(productsInRegion)
          this.props.setHeader(
            "Products in " + regionInfo.name + " Region"
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
          regionInfo.name
        );
      } else {
        regionPushpins.forEach(pushpin => {
          pushpin.setMap(this.googleMap);
        });
      }

      let isHighlighted = this.isHighlighted(regionInfo.reg_id);

      if (!isHighlighted) {
        regionsPolygons.forEach(regionPolygons => {
          if (regionPolygons.reg_id === regionInfo.reg_id) {
            regionPolygons.polygon.setOptions({ strokeWeight: "2" });
          }
        });
      }
    });

    polygon.addListener("mouseout", event => {
      regionPushpins.forEach(element => {
        element.setMap(null);
      });

      let isHighlighted = this.isHighlighted(regionInfo.reg_id);

      if (!isHighlighted) {
        regionsPolygons.forEach(regionPolygons => {
          if (regionPolygons.reg_id === regionInfo.reg_id) {
            regionPolygons.polygon.setOptions({ strokeWeight: "0.2" });
          }
        });
      }
    });

    let unhightlightAllRegions = () => {
      regionsPolygons.forEach(region => {
        for (let index = 0; index < currentHighlightedRegions.length; index++) {
          const reg_id = currentHighlightedRegions[index];
          if (
            reg_id === region.reg_id &&
            region.reg_id !== regionInfo.reg_id
          ) {
            region.toggleHighlightRegion();
            currentHighlightedRegions = [];
          }
        }
      });
    };

    let toggleHighlightRegion = () => {
      let isHighlighted = this.isHighlighted(regionInfo.reg_id);
      if (isHighlighted) {
        regionsPolygons.forEach(regionPolygons => {
          if (regionInfo.reg_id === regionPolygons.reg_id) {
            regionPolygons.polygon.setOptions({ strokeWeight: "0.2" });
          }
        });

        for (let index = 0; index < currentHighlightedRegions.length; index++) {
          const hightlightedRegion = currentHighlightedRegions[index];
          if (hightlightedRegion === regionInfo.reg_id) {
            currentHighlightedRegions.splice(index, 1);
          }
        }
      } else {
        regionsPolygons.forEach(regionPolygons => {
          if (regionInfo.reg_id === regionPolygons.reg_id) {
            regionPolygons.polygon.setOptions({ strokeWeight: "2" });
          }
        });
        currentHighlightedRegions.push(regionInfo.reg_id);
      }
    };

    regionsPolygons.push({
      reg_id: regionInfo.reg_id,
      polygon: polygon,
      toggleHighlightRegion: toggleHighlightRegion
    });
  };

  showProductsInRegion = products => {
    this.clearCurrentMarkers();
    this.props.setCurrentMarkers(products);
    // this.showMarkers(products);
    // this.highlightRegion(reg_id);
  };

  /********************************
   * Create Region Pushpins
   ********************************/
  createPushpinsInRegion = (pushpins, name) => {
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
          text: name,
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

  isHighlighted = reg_id => {
    let isHighlighted = false;
    currentHighlightedRegions.forEach(ID => {
      if (ID === reg_id) {
        isHighlighted = true;
      }
    });
    return isHighlighted;
  };

  render() {
    return (
      <div>
        <div ref={this.googleMapRef} id="google-map" style={mapStyles} />
      </div>
    );
  }
}

export default GoogleMap;
