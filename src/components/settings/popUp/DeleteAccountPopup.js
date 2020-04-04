import React from "react";
import "./css/popUp.css";
import { Redirect } from "react-router-dom";

class DeleteAccountPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      isAccountDeleted: false
    };
  }

  handleDelete = () => {
    fetch(
      "http://localhost:8080/members/" + sessionStorage.getItem("currentUser"),
      {
        method: "DELETE"
      }
    )
      .then(response => response.json())
      .then(data => {})
      .catch(() => {
        console.log("profile could not be deleted");
      });
    this.setState(prevstate => ({
      isAccountDeleted: !prevstate.isAccountDeleted
    }));
    sessionStorage.removeItem("currentUser");
  };

  render() {
    if (this.state.isAccountDeleted) {
      return <Redirect to="/login" />;
    }
    return (
      <div
        id="deletePopup"
        className="delete"
        onClick={event => {
          if (event.target.id === "deletePopup") {
            document.getElementById("deletePopup").style.display = "none";
          }
        }}
      >
        <div className="deleteBox">
          <div style={{ marginBottom: "47px" }}>
            <div
              style={{
                fontSize: "18px",
                textAlign: "center",
                marginBottom: "20px",
                fontWeight: "600"
              }}
            >
              Delete Account?
            </div>

            <div
              style={{
                fontSize: "16px",
                textAlign: "center"
              }}
            >
              You really want to break our hearts?
              <div>
                <div
                  style={{ display: "inline-block", marginTop: "20px" }}
                  className="cancelButton"
                  onClick={() => {
                    document.getElementById("deletePopup").style.display =
                      "none";
                  }}
                >
                  Nevermind
                </div>
                <div
                  className="deleteButton"
                  style={{ display: "inline-block" }}
                  onClick={this.handleDelete}
                >
                  Delete Account
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteAccountPopup;
