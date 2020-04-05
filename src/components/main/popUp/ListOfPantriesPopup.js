import React from "react";
import "./css/popUp.css";

class PantryPopup extends React.Component {
  constructor(props) {
    super();
    this.state = { email: sessionStorage.getItem("currentUser") };
  }

  newPantryButton() {
    return (
      <div
        className="profileOptions"
        onClick={() => {
          document.getElementById("pantryList").style.display = "none";
          document.getElementById("createPantry").style.display =
            "inline-block";
        }}
      >
        <div
          style={{
            position: "relative",
            top: "15px",
            display: "inline-flex"
          }}
        >
          <div style={{ color: "#0CC8AC" }} className="plus">
            +
          </div>
          Add a Pantry
        </div>
      </div>
    );
  }

  fetchPantry = () => {
    const email = this.state.email;

    if (email !== null && email !== "") {
      fetch("http://localhost:8080/userPantries/" + email + "/")
        .then(response => response.json())
        .then(data => {
          this.props.setUserPantries(data);
        });
    } //end of fetch
  };

  loadPantryList() {
    if (this.props.userPantries.length !== 0) {
      return this.props.userPantries.map(pantry => (
        <div
          className="profileOptions"
          id={pantry.pantryId}
          onClick={this.handlePantryAdd}
        >
          <div
            id={pantry.pantryId}
            style={{
              position: "relative",
              top: "15px",
              display: "inline-flex"
            }}
          >
            <span
              id={this.props.id}
              style={{
                backgroundColor: "#0CC8AC",
                width: "43px",
                height: "40px",
                borderRadius: "5px",
                marginLeft: "20px",
                marginRight: "38px",

                top: "-7px",
                position: "relative"
              }}
            ></span>
            <div
              id={this.props.id}
              style={{
                width: "100px",
                height: "40px",
                marginLeft: "20px",
                display: "inline-block"
              }}
            >
              {pantry.pantryName}
            </div>
          </div>
        </div>
      ));
    }
  }

  componentDidMount() {
    this.fetchPantry();
  }

  handlePantryAdd = event => {
    let url =
      "http://localhost:8080/pantryproduct/" +
      event.currentTarget.id +
      "/" +
      this.props.product.prodId +
      "/" +
      this.props.product.regId +
      "/''";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          document.getElementById("addedPopup").style.display = "inline-block";
        } else {
          document.getElementById("notAddedPopup").style.display =
            "inline-block";
        }
      })
      .catch(() => {
        document.getElementById("notAddedPopup").style.display = "inline-block";
      });
  };

  render() {
    let newPantry = this.newPantryButton();
    let pantryList = this.loadPantryList();
    return (
      <div
        id="pantryList"
        className="suggest"
        onClick={event => {
          if (event.target.id === "pantryList") {
            document.getElementById("pantryList").style.display = "none";
          }
        }}
      >
        <div className="pantryBox">
          <div style={{ marginBottom: "47px" }}>
            <div
              style={{
                display: "inline-block",
                lineHeight: "40px",
                fontSize: "18px"
              }}
            >
              Add to a Pantry
            </div>

            <div
              style={{ display: "inline-block", float: "right" }}
              className="cancelButton"
              onClick={() => {
                document.getElementById("pantryList").style.display = "none";
              }}
            >
              Cancel
            </div>
          </div>
          <div>{newPantry}</div>
          <div>{pantryList}</div>
        </div>
      </div>
    );
  }
}

export default PantryPopup;
