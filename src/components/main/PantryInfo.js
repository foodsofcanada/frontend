import React from "react";
import "./css/InfoBar.css";
import icon from "../../icons/chevron-down.svg";
import { ReactSVG } from "react-svg";
import Item from "./Item";
import EditPantry from "./popUp/EditPantryPopup";
import { Spinner } from "react-bootstrap";
import Pantry from "./Pantry";

class PantryInfo extends React.Component {
  constructor(props) {
    super();
    let str = props.currentPage;
    let id = str.substring(str.lastIndexOf("/") + 1, str.length);
    this.state = {
      name: "",
      description: "",
      email: sessionStorage.getItem("currentUser"),
      currentUserInfo: { isExist: true },
      pantryProducts: [],
      pantryId: id,
    };
    this.handleBackClick = this.handleBackClick.bind(this);
  }

  handleDeleteFromPantry = (product) => {
    console.log(product);

    fetch(
      "http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/deleteproduct/" +
        this.state.pantryId +
        "/" +
        product.actualProduct +
        "/" +
        product.regionId +
        "/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.fetchProductsInPantry();
      });
  };

  fetchProductsInPantry = () => {
    fetch(
      "http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/productsInPantry/" +
        this.state.email +
        "/" +
        this.state.pantryId,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((pantryProducts) => {
        this.props.setCurrentMarkers(pantryProducts);
      })
      .catch(() => {
        console.log("Failed to retrieve profile");
      });
  };

  componentDidMount() {
    this.fetchProductsInPantry();

    let endPoint = this.props.currentPage;
    fetch(
      "http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/" + endPoint
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ name: data.pantryName, description: data.description });
      });

    let url =
      "http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/members/" +
      this.state.email;

    if (
      this.state.email === null ||
      this.state.email === "" ||
      this.state.email === "null"
    ) {
      url = 'http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/""';
    }

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((profileInfo) => {
        this.setState({ currentUserInfo: profileInfo });
      })
      .catch(() => {
        console.log("Failed to retrieve profile");
      });
  }

  handleBackClick() {
    this.props.setCurrentPage("pantry/");
  }

  handlePantryClick = (value) => {
    this.props.setproductToAddToPantry(value);
  };

  handleButtonClick = (event) => {
    if (!isNaN(event.target.id) && event.target.id !== "") {
      this.props.setPrevPage(this.props.currentPage);
      this.props.setCurrentPage("products/" + event.target.id);
    }
  };

  setPantryInfo = (newName, newDescription) => {
    this.setState({ name: newName, description: newDescription });
  };

  render() {
    let productItems = null;
    let number = 0;
    if (this.props.currentMarkers.length === 0) {
      productItems = (
        <div
          style={{
            marginLeft: "20px",
            marginTop: "2.5%",
            fontWeight: "bold",
          }}
        >
          This pantry is empty...For now
          <br />
        </div>
      );
    } else {
      productItems = this.props.currentMarkers.map((product) => {
        number = number + 1;
        return (
          <div
            onClick={this.handleButtonClick}
            key={number}
            id={product.productId}
          >
            <Item
              number={number}
              key={number}
              name={product.name}
              region={product.regionName}
              regionId={product.regionId}
              coordinates={product.coordinates}
              actualProduct={product.productId}
              currPage={this.props.setCurrentPage}
              currentPage={this.props.currentPage}
              isFavourite={product.isFavourite}
              handleHeartClick={this.handleHeartClick}
              handlePantryClick={this.handlePantryClick}
              handleDeleteFromPantry={this.handleDeleteFromPantry}
            />
          </div>
        );
      });
    }

    // let productItems = this.props.currentMarkers.map(product => <Item key={product.id} name={product.item}/>)
    return (
      <div>
        {this.state.name !== "" && this.state.description !== "" ? (
          <EditPantry
            id={this.state.pantryId}
            name={this.state.name}
            description={this.state.description}
            setPantryInfo={this.setPantryInfo}
          />
        ) : (
          ""
        )}
        <div className="sidebar" id="bar">
          <div>
            <div
              className="backLink"
              style={{ display: "inline", marginTop: "90px" }}
              onClick={this.handleBackClick}
            >
              <div className="backStuff ">
                <ReactSVG
                  src={icon}
                  style={{
                    height: "30px",
                    transform: "rotate(90deg)",
                    marginTop: "10px",
                  }}
                />
              </div>
              Back
            </div>
            <div
              className="editPantryButton"
              onClick={() => {
                document.getElementById("editPantry").style.display =
                  "inline-block";
              }}
            >
              Edit Pantry
            </div>
          </div>

          <div
            style={{
              marginTop: "50px",
              marginLeft: "15px",
              marginRight: "15px",
              height: "110px",
              display: "flex",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                width: "30%",
                height: "96px",
                display: "inline-block",
                backgroundColor: "#0CC8AC",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
              &nbsp;
            </div>
            <div
              className="titlePlate"
              style={{
                marginBottom: "10px",
                width: "60%",
                display: "inline-block",
                padding: "0px 0px 0px 0px",
                overflowX: "hidden",
              }}
            >
              <div className="head2" style={{}}>
                {this.state.name}
              </div>
              <div style={{}}>
                {this.state.currentUserInfo.firstName}{" "}
                {this.state.currentUserInfo.lastName}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "15px",
              marginBottom: "15px",
              marginLeft: "20px",
              marginRight: "13px",
              fontSize: "14.5px",
              overflowX: "hidden",
            }}
          >
            {this.state.description}
          </div>

          <div style={{ marginBottom: "15px" }}>{productItems}</div>
        </div>
      </div>
    );
  }
}

export default PantryInfo;
