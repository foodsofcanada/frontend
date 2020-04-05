import React from "react";
import "./css/popUp.css";

class CreatePantry extends React.Component {
  constructor(props) {
    super();
    this.state = {
      pantryName: "",
      pantryDesc: "",
      email: sessionStorage.getItem("currentUser"),
      errorMessage: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    // const {name, value, type, checked} = event.target
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    if (this.state.pantryDesc === "" || this.state.pantryName === "") {
      this.setState({ errorMessage: "All fields must be filled" });
      return;
    }

    if (this.state.pantryDesc !== "" && this.state.pantryName !== "") {
      let formData = JSON.stringify({
        email: this.state.email,
        description: this.state.pantryDesc,
        pantryName: this.state.pantryName
      });

      fetch("http://localhost:8080/createPantry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          fetch("http://localhost:8080/userPantries/" + this.state.email + "/")
            .then(response => response.json())
            .then(data => {
              this.props.setUserPantries(data);
              this.setState({ errorMessage: "Pantry has been created!" });
            });
        })
        .catch(() => {
          this.setState({ errorMessage: "Pantry could not be created." });
        });
    }
  };

  render() {
    return (
      <div
        id="createPantry"
        className="suggest"
        onClick={event => {
          if (event.target.id === "createPantry") {
            document.getElementById("createPantry").style.display = "none";
            this.setState({ pantryDesc: "", pantryName: "", errorMessage: "" });
          }
        }}
      >
        <div className="suggestBox">
          <div style={{ marginBottom: "47px" }}>
            <div
              style={{
                display: "inline-block",
                lineHeight: "40px",
                fontSize: "18px"
              }}
            >
              Create a Pantry
            </div>

            <div
              style={{ display: "inline-block", float: "right" }}
              className="cancelButton"
              onClick={() => {
                document.getElementById("createPantry").style.display = "none";
                this.setState({
                  pantryDesc: "",
                  pantryName: "",
                  errorMessage: ""
                });
              }}
            >
              Cancel
            </div>
            <div
              className="suggestButton"
              style={{ display: "inline-block", float: "right" }}
              onClick={this.handleSubmit}
            >
              Create Pantry
            </div>
          </div>
          <div>
            <label className="label">
              <span>Pantry Name</span> &nbsp;
              <br />
              <input
                value={this.state.pantryName}
                name="pantryName"
                type="text"
                style={{
                  borderStyle: "solid",
                  backgroundColor: "rgb(244,248,247)",
                  marginBottom: "20px",
                  marginRight: "50px"
                }}
                onChange={this.handleChange}
              />
            </label>
            {this.state.errorMessage !== "Pantry has been created!" ? (
              <span style={{ color: "red" }}>{this.state.errorMessage}</span>
            ) : (
              <span style={{ color: "rgb(105, 230, 105)" }}>
                {this.state.errorMessage}
              </span>
            )}
            <br />
            <label className="label">
              <span>Pantry description</span> &nbsp;
              <br />
              <textarea
                value={this.state.pantryDesc}
                name="pantryDesc"
                className="prodDesc"
                style={{
                  borderStyle: "solid",
                  backgroundColor: "rgb(244,248,247)",
                  padding: "10px 10px 10px 10px"
                }}
                onChange={this.handleChange}
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePantry;
