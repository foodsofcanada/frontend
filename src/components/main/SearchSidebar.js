// import React, { useState, useEffect, useRef } from 'react';
import React, { Component } from 'react';
import SearchItem from './SearchItem';

class SearchSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productsLoading: true,
			productsError: false,
			regionsLoading: true,
			regionsError: false,
			seasonsLoading: true,
			seasonsError: false,
			productTypesLoading: true,
			productTypesError: false,
			searchText: "",//Search Input text box
			products: [],
			regions: [],
			seasons: ["Fall", "Spring", "Summer", "Winter"],
			productTypes: ["Seed", "Grain", "Plant", "Herb", "Fruit", "Vegetable", "Animal", "By-product", 
				"Freshwater product", "Saltwater product", "Farmed product", "Green house product", "Aquaponic product",
				"Sustainable", "Endangered", "Artisanal product"] 
		}
	}

	componentDidMount() {
		//Fetch products
		fetch("http://localhost:8080/products")
		 .then(response => response.json())
		 .then(productsData => {
			 this.setState({
				productsLoading: false,
				 products: productsData
				});
		 })
		 .catch(() => {
			 console.log("Failed to retrieve products for SearchSidebar");
			 this.setState({productsError: true});
		 });//end of fetch


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
			 this.setState({regionsError: true});
		 });//end of fetch

		 
	}

	handleChange(event) {
		
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value });
	}
	
	render() {
		const searchProducts = (this.state.productsError) ? "Failed to load. Please try again later." : 
			(this.state.productsLoading) ? "loading..." : this.state.products.map(product => {
				return <SearchItem key={product.prod_id} value={product.prod_id} className="products" name={product.name} handleChange={this.handleChange}/>
			});

		const searchRegions = (this.state.regionsError) ? "Failed to load. Please try again later." : 
			(this.state.regionsloading) ? "loading..." : this.state.regions.map(region => {
				return <SearchItem key={region} value={region} className="regions" name={region} handleChange={this.handleChange}/>
			});

		const searchSeasons = (this.state.seasonsloading) ? "loading..." : this.state.seasons.map((season,index) => {
			return <SearchItem key={season} value={season} attributeName="seasons" name={season} handleChange={this.handleChange}/>
		});

		const searchTypes =  (this.state.productTypesloading) ? "loading..." : this.state.productTypes.map((type,index) => {
			return <SearchItem key={type} value={type} attributeName="types" name={type} handleChange={this.handleChange}/>
		});
		return (
			<div>
				<h1>Products</h1>
				{searchProducts}
				
				<h1>Regions</h1>
				{searchRegions}

				<h1>Seasons</h1>
				{searchSeasons}

				<h1>Types</h1>
				{searchTypes}
			</div>
		);
	}

}



/****************************************************
 * PLEASE LEAVE ONLY (don't remove this section) yet. 
 ****************************************************/
// function SearchSidebar(props) {
// 	//Search input box
// 	let [searchText, setsearchText] = useState("");
	
// 	const inputText = useRef("");
	
// 	/*
// 		searchCategories = Fetch search options I.E Products, Season, Region. 
// 			This also include the array of items I.E Products item are [Barley, Leek, Sockeye Salmon], Season: [winter, summer]
		
// 		Create an array of search options by "mapping" the fetched categories (searchCategories) 
// 		using this component: <searchCategory categoryHeader=searchCategory.name itemList=searchCategory.items/>
		
// 		Note: 	categoryHeader - the search option category name/header.
// 				itemList - an array of the options that you can check mark to display on map 
// 					I.E ["Barley", "Wild Leek", "Sockeye Salmon"], ["Winter", "Summer", "Spring"]
// 	*/
// 	const searchCategories = null;
	
// 	const autoCompleteComponents = null;
// 	useEffect( () => {
// 		// autoCompleteComponents = update the autoComplete feature I.E searchText="B", list of anything that starts with 'b' and case-insensitive.
// 	}, [searchText]);
	
	
// 	const [selectedFilterProduct, setselectedFilterProduct] = useState(null);
	
// 	return (
// 		<div className="SearchSidebar">
// 			{/*
// 				display Search bar and pull tab button.
// 				<input ref={inputText} type="text" value={searchText}/>
// 				{autoCompleteComponents}
// 				{searchCategories}
// 				{display advanced filter window. <FilterProductWindow product={}/>}
// 			*/}
// 			<div id="test">
				
// 			</div>
			
// 		</div>
// 	);
	
// }


export default SearchSidebar