// import React, { useState, useEffect, useRef } from "react";

// function SearchSidebar(props) {
//   //Search input box
//   let [searchText, setsearchText] = useState("");

//   const inputText = useRef("");

// searchCategories = Fetch search options I.E Products, Season, Region.
// 	This also include the array of items I.E Products item are [Barley, Leek, Sockeye Salmon], Season: [winter, summer]

// import React, { useState, useEffect, useRef } from 'react';
import React, { Component } from "react";
import SearchItem from "./SearchItem";

class SearchSidebar extends Component {
  constructor(props) {
    super();
    this.state = {
      productsLoading: true,
      productsError: false,
      regionsLoading: true,
      regionsError: false,
      seasonsLoading: true,
      productTypesLoading: true,
      searchText: "", //Search Input text box
      products: [],
      regions: [],
      seasons: ["Fall", "Spring", "Summer", "Winter"],
      searchQuery: {
        productsSearched: [1,2,3],
        seasonSearched: ["spring","summer"],
        regionSearched: [1,2] 
      },
      // productTypes: ["Seed","Grain","Plant","Herb","Fruit","Vegetable","Animal","By-product","Freshwater product","Saltwater product",
        // "Farmed product","Green house product","Aquaponic product","Sustainable","Endangered","Artisanal product"]
      
    };
  }

  componentDidMount() {
    //Fetch products
    fetch("http://localhost:8080/products")
      .then(response => response.json())
      .then(productsData => {
        productsData = productsData.map( product => {
          product.checked = false;
          return product;
        });
        productsData.forEach(element => {
          console.log(element.checked)
        });
        this.setState({
          productsLoading: false,
          products: productsData
        });
      })
      .catch((error) => {
        console.log(error)
        console.log("Failed to retrieve products for SearchSidebar");
        this.setState({ productsError: true });
      }); //end of fetch

    /*********************************************************************************
     * Note: region most likely to fetched in main component and passed down in props
     *********************************************************************************/
    //fetch regions name
    fetch("http://localhost:8080/regions")
      .then(response => response.json())
      .then(regionsData => {
        const regionNames = regionsData.map(region => {
          return region.name;
        });
        this.setState({
          regionsloading: false,
          regions: regionNames
        });
      })
      .catch(() => {
        console.log("Failed to retrieve products for SearchSidebar");
        this.setState({ regionsError: true });
      }); //end of fetch
  }

  handleChange = (event) => {
    console.log("item selected")
    const { name, value, type, checked } = event.target;
    
    // (type === "checkbox") ? 
    // () => {
    //   this.setState({ [name]: checked });
    //   if (name === "products" && checked) {
    //   }
    // } 
    

    // : 
    
    // this.setState({ [name]: value });


    /************************************************************************************
     * Fetch search results
     * WIP (Working In Progress)
     ************************************************************************************/
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.searchQuery)
    }

    fetch("http://localhost:8080/search", requestOption)
     .then(response => response.json())
     .then(data => {
       console.log(data);
       this.props.setCurrentMarkers(data);
     })
     .catch( (error) => {
       console.log("Failed to fetch search query.");
      //  console.log("error:" + error)
   });


  }

  render() {
    const searchProducts = this.state.productsError
      ? "Failed to load. Please try again later."
      : this.state.productsLoading
      ? "loading..."
      : this.state.products.map(product => {
          return (
            <SearchItem
              key={product.prod_id}
              value={product.prod_id}
              className="products"
              name={product.name}
              checked={product.checked}
              handleChange={this.handleChange}
            />
          );
        });

    const searchRegions = this.state.regionsError
      ? "Failed to load. Please try again later."
      : this.state.regionsloading
      ? "loading..."
      : this.state.regions.map(region => {
          return (
            <SearchItem
              key={region}
              value={region}
              className="regions"
              name={region}
              handleChange={this.handleChange}
            />
          );
        });

    const searchSeasons = this.state.seasonsloading
      ? "loading..."
      : this.state.seasons.map((season, index) => {
          return (
            <SearchItem
              key={season}
              value={season}
              attributeName="seasons"
              name={season}
              handleChange={this.handleChange}
            />
          );
        });

    // const searchTypes = (this.state.productTypesloading) ? "loading..."
    //   : this.state.productTypes.map((type, index) => {
    //     return (
    //       <SearchItem
    //         key={type}
    //         value={type}
    //         attributeName="types"
    //         name={type}
    //         handleChange={this.handleChange}
    //       />
    //     );
    //   });
    return (
      <div>
        <div>
          <div
            style={{
              display: "inline-block",
              right: "341px",
              marginTop: "10px",
              position: "relative",
              zIndex: "4"
            }}
          >
            <input type="text" placeholder="Search Here..." />
          </div>
          <div className="SearchSidebar">
            <div id="test">
              <h1>Products</h1>
              {searchProducts}

              <h1>Regions</h1>
              {searchRegions}

              <h1>Seasons</h1>
              {searchSeasons}

              {/* <h1>Types</h1>
              {searchTypes} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/****************************************************
 * PLEASE LEAVE ONLY (don't remove this section) yet.
 ****************************************************/
//  function SearchSidebar(props) {
//  	//Search input box
//  	let [searchText, setsearchText] = useState("");

//  	const inputText = useRef("");

/*
 		searchCategories = Fetch search options I.E Products, Season, Region. 
 			This also include the array of items I.E Products item are [Barley, Leek, Sockeye Salmon], Season: [winter, summer]

		
 		Create an array of search options by "mapping" the fetched categories (searchCategories) 
 		using this component: <searchCategory categoryHeader=searchCategory.name itemList=searchCategory.items/>
		

		Note: 	categoryHeader - the search option category name/header.
				itemList - an array of the options that you can check mark to display on map 
					I.E ["Barley", "Wild Leek", "Sockeye Salmon"], ["Winter", "Summer", "Spring"]
	*/
//   const searchCategories = null;
/* 
 		Note: 	categoryHeader - the search option category name/header.
 				itemList - an array of the options that you can check mark to display on map 
 					I.E ["Barley", "Wild Leek", "Sockeye Salmon"], ["Winter", "Summer", "Spring"]
 	*/
// const searchCategories = null;

//  	const autoCompleteComponents = null;
//  	useEffect( () => {
//  		// autoCompleteComponents = update the autoComplete feature I.E searchText="B", list of anything that starts with 'b' and case-insensitive.
//  	}, [searchText]);

//  	const [selectedFilterProduct, setselectedFilterProduct] = useState(null);

//  	return (
//  		<div className="SearchSidebar">
//  			{/*
//  				display Search bar and pull tab button.
//  				<input ref={inputText} type="text" value={searchText}/>
//  				{autoCompleteComponents}
//  				{searchCategories}
//  				{display advanced filter window. <FilterProductWindow product={}/>}
//  			*/}
//  			<div id="test">

// 			</div>

//  		</div>
//  	);

// }

//   const autoCompleteComponents = null;
//   useEffect(() => {
//     // autoCompleteComponents = update the autoComplete feature I.E searchText="B", list of anything that starts with 'b' and case-insensitive.
//   }, [searchText]);

//   const [selectedFilterProduct, setselectedFilterProduct] = useState(null);

//   return (

//   );
// }

export default SearchSidebar;
