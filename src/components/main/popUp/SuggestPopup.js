import React from "react";
import "./css/popUp.css";

class SuggestPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      productDesc: "",
      email: sessionStorage.getItem("currentUser"),
      errorMessage: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    // const {name, value, type, checked} = event.target
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    if (this.state.productDesc === "" || this.state.productName === "") {
      this.setState({ errorMessage: "All fields must be filled" });
      return;
    }

    if (this.state.productDesc !== "" && this.state.productName !== "") {
      fetch(
        "http://FoodsOfCanada-env-2.ca-central-1.elasticbeanstalk.com/suggest/" +
          this.state.productName +
          "/" +
          this.state.productDesc,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({ errorMessage: "Suggestion has been sent!" });
        })
        .catch(() => {
          this.setState({ errorMessage: "Suggestion could not be sent." });
        });
    }
  };

  render() {
    return (
      <div
        id="suggest"
        className="suggest"
        onClick={(event) => {
          if (event.target.id === "suggest") {
            document.getElementById("suggest").style.display = "none";
          }
        }}
      >
        <div className="suggestBox">
          <div style={{ marginBottom: "47px" }}>
            <div
              style={{
                display: "inline-block",
                lineHeight: "40px",
                fontSize: "18px",
              }}
            >
              Suggest a Product
            </div>

            <div
              style={{ display: "inline-block", float: "right" }}
              className="cancelButton"
              onClick={() => {
                document.getElementById("suggest").style.display = "none";
              }}
            >
              Cancel
            </div>
            <div
              className="suggestButton"
              style={{ display: "inline-block", float: "right" }}
              onClick={this.handleSubmit}
            >
              Send Suggestion
            </div>
          </div>
          <div>
            <label className="label">
              <span>Product Name</span> &nbsp;
              <br />
              <input
                type="text"
                style={{
                  borderStyle: "solid",
                  backgroundColor: "rgb(244,248,247)",
                  marginBottom: "20px",
                  marginRight: "50px ",
                }}
                value={this.state.productName}
                name="productName"
                onChange={this.handleChange}
              />
            </label>
            {this.state.errorMessage !== "Suggestion has been sent!" ? (
              <span style={{ color: "red" }}>{this.state.errorMessage}</span>
            ) : (
              <span style={{ color: "rgb(105, 230, 105)" }}>
                {this.state.errorMessage}
              </span>
            )}

            <br />
            <label className="label">
              <span>Product description and links</span> &nbsp;
              <br />
              <textarea
                className="prodDesc"
                style={{
                  borderStyle: "solid",
                  backgroundColor: "rgb(244,248,247)",
                }}
                value={this.state.productDesc}
                name="productDesc"
                onChange={this.handleChange}
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestPopup;
