import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import * as markerData from "../data/markers.json";//ToDo remove after "fetch" has been implemented


function Map(props) {
	
	const {selectedMarker, setSelectedMarker} = props;
	
	//the default State will be the "Top 10 products"
	let [selectedSearch, setSelectedSearch] = useState()
	
	//ToDo change this to be "fetch"
	const markerComponents = markerData.markers.map(marker => (
		<Marker
		  key={marker.id}
		  position={marker.position}
		  onClick={() => {
			setSelectedMarker(marker);
			console.log(marker.position);
		  }}
		/>
	));
  
  
  //ComponentDidMount
  useEffect(() => {
	const listener = e => {
	  if (e.key === "Escape") {
		setSelectedMarker(null);
	  }
	};
	window.addEventListener("keydown", listener);

	return () => {
	  window.removeEventListener("keydown", listener);
	};
  }, []);

  return (
	<div>
		
	  
		{/* google maps */}
		<GoogleMap
			defaultZoom={10}
			defaultCenter={{ lat: 56.13, lng: 106.34 }}
		  // defaultOptions={{ styles: mapStyles }}
		>
			{markerComponents}
			{selectedMarker && (
				<InfoWindow
					onCloseClick={() => {
						setSelectedMarker(null);
					}}
					position={selectedMarker.position}
				>
					<div>
						<h2>{selectedMarker.product.name}</h2>
						<p>{selectedMarker.product.description}</p>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
		
		
	</div>
  );
  
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function GMap(props) {
	const {selectedMarker, setSelectedMarker} = props;
	return (
	<div>
		<MapWrapped
			googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: `100%` }} />}
			mapElement={<div style={{ height: `100%` }} />}
		/>
	</div>
  );
	
}


