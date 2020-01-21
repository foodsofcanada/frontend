import React, { useState, useEffect } from "react";
import SearchSidebar from "./SearchSidebar.js";
import InfoSidebar from './InfoSidebar.js';
import GMap from './GMap.js';


function Main() {
	const [selectedMarker, setSelectedMarker] = useState("test");
	
	return(
			<div>
			
				{ /*left side bar of the map*/ }
				<SearchSidebar/> 
			
				<GMap selectedMarker={selectedMarker} setSelectedMarker={setSelectedMarker}/>
				
				{/*right side bar of the map*/}
				<InfoSidebar selectedMarker={selectedMarker}/> 
			
			</div>
		);
		
}
	
export default Main;