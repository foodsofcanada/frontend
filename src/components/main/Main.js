import React, { useState, useEffect } from "react";
import SearchSidebar from "./SearchSidebar.js";
import InfoSidebar from './InfoSidebar.js';
import GoogleMap from './GoogleMap.js';


function Main() {
	const [selectedMarker, setSelectedMarker] = useState("test");
	
	return(
			<div>
			
				{ /*left side bar of the map*/ }
					{/*<SearchSidebar/> */}
			
				<GoogleMap/>
				
				{/*right side bar of the map*/}
					{/*<InfoSidebar selectedMarker={selectedMarker/> }*/}
			
			</div>
		);
		
}
	
export default Main;