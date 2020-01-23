import React, { useState, useEffect } from "react";
import Main from './Main_Components/Main.js';
import Dashboard from './Dashboard_Components/Dashboard.js';
import ProfileSetting from './ProfileSetting.js';
import ProfileSideBar from './ProfileSideBar.js';

export default function App() {
	
  return (
	<div style={{ width: "100vw", height: "100vh" }}>
		<Main />
		{
			/* Conditional rendering 
			
				1. Show Main component when user first enters the website
				2. If the user login as an admin show Dashboard component
				3. In the profileSideBar component, if user clicks on the profile icon display ProfileSetting component
				3.1. If the admin clicks on the profile icon in the Dashboard component display ProfileSetting component
				4. 
			*/
		}
	</div>
  );
}
