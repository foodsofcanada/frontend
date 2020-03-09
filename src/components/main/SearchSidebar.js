import React, { useState, useEffect, useRef } from "react";

function SearchSidebar(props) {
  //Search input box
  let [searchText, setsearchText] = useState("");

  const inputText = useRef("");

  /*
		searchCategories = Fetch search options I.E Products, Season, Region. 
			This also include the array of items I.E Products item are [Barley, Leek, Sockeye Salmon], Season: [winter, summer]
		
		Create an array of search options by "mapping" the fetched categories (searchCategories) 
		using this component: <searchCategory categoryHeader=searchCategory.name itemList=searchCategory.items/>
		
		Note: 	categoryHeader - the search option category name/header.
				itemList - an array of the options that you can check mark to display on map 
					I.E ["Barley", "Wild Leek", "Sockeye Salmon"], ["Winter", "Summer", "Spring"]
	*/
  const searchCategories = null;

  const autoCompleteComponents = null;
  useEffect(() => {
    // autoCompleteComponents = update the autoComplete feature I.E searchText="B", list of anything that starts with 'b' and case-insensitive.
  }, [searchText]);

  const [selectedFilterProduct, setselectedFilterProduct] = useState(null);

  return (
    <div>
      {" "}
      <div
        style={{ display: "inline-block", right: "341px",marginTop:"10px", position: "relative",zIndex:"4" }}
      >
        <input type="text" placeholder="Search Here..." />
      </div>
      <div className="SearchSidebar">
        <div id="test"></div>
      </div>
    </div>
  );
}

export default SearchSidebar;
