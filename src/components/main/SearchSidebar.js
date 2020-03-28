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
import top10Products from "../../data/topTenProducts.json";
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
      search: "", //Search Input text box
      products: [],
      regions: [],
      seasons: [
        { checked: false, name: "Fall" },
        { checked: false, name: "Spring" },
        { checked: false, name: "Summer" },
        { checked: false, name: "Winter" }
      ],
      searchQuery: {
        productsSearched: [],
        seasonSearched: [],
        regionSearched: []
      },
      isSearchBox: false
      // searchQuery: {
      //   productsSearched: [1,2,3],
      //   seasonSearched: ["spring","summer"],
      //   regionSearched: [1,2]
      // },
      // productTypes: ["Seed","Grain","Plant","Herb","Fruit","Vegetable","Animal","By-product","Freshwater product","Saltwater product",
      // "Farmed product","Green house product","Aquaponic product","Sustainable","Endangered","Artisanal product"]
    };
  }

  componentDidMount() {
    //Fetch products
    fetch("http://localhost:8080/products")
      .then(response => response.json())
      .then(productsData => {
        const products = productsData.map(product => {
          return {
            productId: product.productId,
            name: product.name,
            checked: false
          };
        });
        // productsData.forEach(element => {
        //   console.log(element.checked)
        // });
        this.setState({
          productsLoading: false,
          products: products
        });
      })
      .catch(error => {
        // console.log(error);
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
        const regions = regionsData.map(region => {
          return {
            regionId: region.regionId,
            name: region.name,
            checked: false
          };
        });
        this.setState({
          regionsloading: false,
          regions: regions
        });
      })
      .catch(() => {
        console.log("Failed to retrieve products for SearchSidebar");
        this.setState({ regionsError: true });
      }); //end of fetch
  }

  handleChange = event => {
    let { name, value, type, checked } = event.target;
    let updatedSearchQuery;

    if (type === "checkbox") {
      this.setState(
        prevState => {
          if (this.state.isSearchBox) {
            updatedSearchQuery = {
              productsSearched: [],
              seasonSearched: [],
              regionSearched: []
            };
          } else {
            updatedSearchQuery = {
              productsSearched: [...prevState.searchQuery.productsSearched],
              seasonSearched: [...prevState.searchQuery.seasonSearched],
              regionSearched: [...prevState.searchQuery.regionSearched]
            };
          }
          if (name === "products") {
            let updatedProducts = [...this.state.products];
            updatedProducts.forEach(product => {
              const intValue = parseInt(value);
              if (product.productId === intValue) {
                if (checked) {
                  updatedSearchQuery.productsSearched.push(intValue);
                } else {
                  updatedSearchQuery.productsSearched.splice(
                    updatedSearchQuery.productsSearched.indexOf(intValue),
                    1
                  );
                }
                product.checked = checked;
              }
            });

            return {
              searchQuery: updatedSearchQuery,
              products: updatedProducts,
              isSearchBox: false
            };
          } else if (name === "regions") {
            /**********
             * Regions
             *********/
            let updatedRegions = [...this.state.regions];
            updatedRegions.forEach(region => {
              const intValue = parseInt(value);
              if (region.regionId === intValue) {
                if (checked) {
                  updatedSearchQuery.regionSearched.push(intValue);
                } else {
                  updatedSearchQuery.regionSearched.splice(
                    updatedSearchQuery.regionSearched.indexOf(intValue),
                    1
                  );
                }
                region.checked = checked;
              }
            });

            return {
              regions: updatedRegions,
              searchQuery: updatedSearchQuery,
              isSearchBox: false
            };
          } else if (name === "seasons") {
            /*************************************************************************
             * Seasons
             **************************************************************************/
            let updatedSeasons = [...this.state.seasons];
            updatedSeasons.forEach(season => {
              if (season.name === value) {
                if (checked) {
                  updatedSearchQuery.seasonSearched.push(value);
                } else {
                  updatedSearchQuery.seasonSearched.splice(
                    updatedSearchQuery.seasonSearched.indexOf(value),
                    1
                  );
                }
                season.checked = checked;
              }
            });

            return {
              seasons: updatedSeasons,
              searchQuery: updatedSearchQuery,
              isSearchBox: false
            };
          }
        },
        () => {
          this.fetchProducts();
        }
      );
    }
  }; //end of HandleChange

  fetchProducts = () => {
    // console.log("fetching: ");
    // console.log(this.state.searchQuery);
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.searchQuery)
    };

    fetch("http://localhost:8080/search", requestOption)
      .then(response => response.json())
      .then(data => {
        //  console.log(data);
        if (data.length === 0) {
          /********************************************************************************************
           * Implement Zero Search Result
           ********************************************************************************************/
          console.log("Zero search result");
          this.props.setCurrentMarkers([]);
        } else {
          // console.log(this.state.searchQuery.productsSearched.length)
          if (this.state.searchQuery.productsSearched.length === 0) {
            this.props.setHeader("Top 10 searched products");
          } else {
            this.props.setHeader("Showing search results");
          }
          this.props.setCurrentMarkers(data);
        }
      })
      .catch(error => {
        console.log("Failed to fetch search query.");
        //  console.log("error:" + error)
      });
  };

  /*This is what changes the sidebar when a checkbox is clicked */

  handleCheckBoxClick = () => {
    this.props.setCurrentPage("");
  };


  handleSearchbox = event => {
    const { value } = event.target;
    // this.props.setCurrentPage("");
    this.setState({ search: value });
  };

  handleKeyPress = (event) => {
    const {value} = event.target;
    if (event.key === "Enter") {
      this.props.setCurrentPage("");
      this.setState( () => {
        
        let updatedSearchQuery = {
          productsSearched: [],
          seasonSearched: [],
          regionSearched: [] 
        };

        this.state.products.forEach(product => {
          if (product.name.toLowerCase() === value.toLowerCase()) {
            updatedSearchQuery.productsSearched.push(product.productId);
          }
        });

        this.state.regions.forEach(region => {
          if (region.name.toLowerCase() === value.toLowerCase()) {
            updatedSearchQuery.regionSearched.push(region.regionId);
          }
        });

        this.state.seasons.forEach(season => {
          if (season.name.toLowerCase() === value.toLowerCase()) {
            updatedSearchQuery.seasonSearched.push(season.name);
          }
        });

        return {
          searchQuery: updatedSearchQuery,
          isSearchBox : true,
          ...this.uncheckAllCategory()
        }
      }, () => {
        this.fetchProducts();
      });
      }
  }

  toggleCategory = (category, checked) => {
    return category.map(element => {
      return {
        ...element,
        checked: checked
      };
    });
  }

  uncheckAllCategory = () => {
      const updatedProducts = this.toggleCategory(this.state.products, false);
      const updatedRegions = this.toggleCategory(this.state.regions, false);
      const updatedSeasons = this.toggleCategory(this.state.seasons, false);
      return (
        {products: updatedProducts,
        regions: updatedRegions,
        seasons: updatedSeasons}
      );
  }


  render() {
    const searchProducts = this.state.productsError
      ? "Failed to load. Please try again later."
      : this.state.productsLoading
      ? "loading..."
      : this.state.products.map(product => {
          return (
            <div onClick={this.handleCheckBoxClick}>
              <SearchItem
                key={product.name}
                value={product.productId}
                name={"products"}
                labelName={product.name}
                checked={product.checked}
                handleChange={this.handleChange}
              />
            </div>
          );
        });

    const searchRegions = this.state.regionsError
      ? "Failed to load. Please try again later."
      : this.state.regionsloading
      ? "loading..."
      : this.state.regions.map(region => {
          return (
            <div onClick={this.handleCheckBoxClick}>
              <SearchItem
                key={region.name}
                value={region.regionId}
                name={"regions"}
                labelName={region.name}
                checked={region.checked}
                handleChange={this.handleChange}
              />
            </div>
          );
        });

    const searchSeasons = this.state.seasonsloading
      ? "loading..."
      : this.state.seasons.map(season => {
          return (
            <div onClick={this.handleCheckBoxClick}>
              <SearchItem
                key={season.name}
                value={season.name}
                name={"seasons"}
                labelName={season.name}
                checked={season.checked}
                handleChange={this.handleChange}
              />
            </div>
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
              left: "-341px",
              marginTop: "10px",
              position: "relative",
              zIndex: "4"
            }}
          >
            <input
              id="search"
              type="text"
              placeholder="Search Here..."
              onChange={this.handleSearchbox}
              onKeyPress={this.handleKeyPress}
              value={this.state.search}
              autoFocus
            />
          </div>
          <div className="SearchSidebar" id="searchbar">
            <div id="test" style={{ marginTop: "55px" }}>
              <div className="head">Products</div>
              {searchProducts}

              <div className="head">Regions</div>
              {searchRegions}

              <div className="head">Seasons</div>
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
