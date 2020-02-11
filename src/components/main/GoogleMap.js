import React, { Component, createRef } from "react";
import top10Products from '../../data/topTenProducts.json';
// import myIcon from './myMarker.png';
import Regions from '../../data/Regions.json';

const mapStyles = {
	width: "74vw",
	height: "100vh",
};

var markers = [];
var polygons = [];


class GoogleMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
		this.googleMapRef = createRef();

	}
	componentDidMount() {
		const googleMapScript = document.createElement("script");
		googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&language=${this.props.language}`;
		window.document.body.appendChild(googleMapScript);

		this.markers = [];
		//getTop10Products(); //this will fetch the top10Products, may have "wait" for data before displaying

		googleMapScript.addEventListener("load", () => {
			this.createGoogleMap();
			this.showTop10Products();
			this.createRegions();
		});
		
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (nextProps.currentMarkers !== this.props.currentMarkers)
	}

	componentDidUpdate() {
		console.log("Google Map Component updated!")
		this.showMarkers(this.props.currentMarkers);
		// console.log(this.markers);
	}

	createGoogleMap = () => {
		this.googleMap = new window.google.maps.Map(this.googleMapRef.current, {
			center: {
				lat: 59.8478, lng: -101.8939
			},
			zoom: 4,
			zoomControl: true,
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: true,
		});

	}

	showTop10Products = () => {
		this.props.setCurrentMarkers(top10Products);
		this.showMarkers(top10Products);
	}


	showMarkers = (newMarkers) => {
		newMarkers.map(marker => {
			const { position, id } = marker;
			var gMapMarker = new window.google.maps.Marker({
				position: {
					lat: position.lat,
					lng: position.lng
				},
				// label: id.toString(),
				map: this.googleMap
			});
			let myLabel = {
				text: id.toString(),
				color: "white"
			}
			gMapMarker.setLabel(myLabel);

			let myIcon = {

			}
			gMapMarker.addListener("click", () => {
				this.props.setSelectedMarker(gMapMarker);
			});
			this.markers.push(gMapMarker);
		});
	}

	clearCurrentMarkers = () => {
		this.props.setCurrentMarkers([]);
		for (var i = 0; i < this.markers.length; i++) {
			this.markers[i].setMap(null);
		}
		this.markers = [];
	}

	createRegions = () => {
		var regions = Regions;
		for (let regionsIndex = 0; regionsIndex < regions.length; regionsIndex++) {//loop every region
			//every region
			// console.log("region: " + regions)
			let polygons = regions[regionsIndex].polygons;
			for (let polygonsIndex = 0; polygonsIndex < polygons.length; polygonsIndex++) {//loop every polygons in a region
				//every polygons
				// console.log("polygons: " + polygons[polygonsIndex])
				// console.log("outer: " + polygons[polygonsIndex].outerPath)
				let polygon = polygons[polygonsIndex];
				let polygonPaths=[];
				let outerPath = this.convertStringToArrayCoords(polygon.outerPath);
				polygonPaths.push(outerPath);
				for (let innerIndex = 0; innerIndex < polygon.innerPaths.length; innerIndex++) {//loop every inner polygon
					// console.log("inner: " + polygon.innerPaths[innerIndex].innerPath)
					let innerPath = this.convertStringToArrayCoordsBackwards(polygon.innerPaths[innerIndex].innerPath);
					polygonPaths.push(innerPath);
				}
				let regionInfo = {"regionName":regions[regionsIndex].regionName, "polygonStyle":regions[regionsIndex].polygonStyle, "polygonPaths":polygonPaths};
				this.createRegion(regionInfo);
			}
			
		}
	}

	convertStringToArrayCoords = (MultiGeometryCoordinates) => {
		let finalData = [];
		var grouped = MultiGeometryCoordinates.split("\n");
		grouped.forEach(function(item, i){
			// item = item.trim().replace(/,0/g, "");
			// console.log(item);
			let a = item.trim().split(',');
	
			finalData.push({
				lng: parseFloat(a[0]),
				lat: parseFloat(a[1])
			});
			
		});
		return finalData;
	}

	convertStringToArrayCoordsBackwards = (MultiGeometryCoordinates) => {
		let finalData = [];
		var grouped = MultiGeometryCoordinates.split("\n");
		for (let index = grouped.length-1; index >= 0 ; index--) {
			let item = grouped[index];
			let a = item.trim().split(',');
	
			finalData.push({
				lng: parseFloat(a[0]),
				lat: parseFloat(a[1])
			});
			
		}
		return finalData;
	}

	createRegion = (regionInfo) => {
		const {strokeColor, strokeWeight, fillColor} = regionInfo.polygonStyle;
		// console.log(newpolygons)
	  	var polygon = new window.google.maps.Polygon({
				paths: regionInfo.polygonPaths,
				strokeColor: strokeColor,
				strokeWeight : strokeWeight,
				fillColor: fillColor,
				map: this.googleMap,
			});
		polygon.addListener("click", () => {
			const requestAnimeAwait = async(id=100) => {
				const response = await fetch('url/')
				const products = await response.json();
				this.showProductsInRegion(products);
			}
			console.log(regionInfo.regionName)
		});
	  	polygons.push(polygon);
	}	  

	showProductsInRegion = (products) => {
		this.showMarkers(products);
	}


	render() {
		return (
			<div>
				<div
					ref={this.googleMapRef}
					id="google-map"
					style={mapStyles}
				/>

			</div>
		);
	}

}

	


export default GoogleMap;