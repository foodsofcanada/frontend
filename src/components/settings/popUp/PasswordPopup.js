import React from "react";
import "./css/popUp.css";

class PasswordPopup extends React.Component {
  render() {
    return (
      <div
        id="passwordPopup"
        className="password"
        onClick={event => {
          if (event.target.id === "passwordPopup") {
            document.getElementById("passwordPopup").style.display = "none";
          }
        }}
      >
        <div className="passwordBox">
          <div style={{ marginBottom: "47px" }}>
            <div
              style={{
                display: "inline-block",
                lineHeight: "40px",
                fontSize: "18px"
              }}
            >
              Change Password
            </div>

            <div
              style={{ display: "inline-block", float: "right" }}
              className="cancelButton"
              onClick={() => {
                document.getElementById("passwordPopup").style.display = "none";
              }}
            >
              Cancel
            </div>
            <div
              className="passwordButton"
              style={{ display: "inline-block", float: "right" }}
            >
              Save changes
            </div>
          </div>
          <div>
            <label className="label">
              <span>Current Password</span> &nbsp;
              <br />
              <input
                type="text"
                className="textBoxes"
                style={{
                  borderStyle: "solid",
                  backgroundColor: "rgb(244,248,247)",
                  marginBottom: "20px",
                  marginRight: "50px"
                }}
              />
            </label>
            <span style={{ color: "red" }}>Error has occured</span>
            <br />
            <label className="label">
              <span>New Password</span> &nbsp;
              <br />
              <input
                type="text"
                className="textBoxes"
                style={{
                  borderStyle: "solid",
                  backgroundColor: "rgb(244,248,247)",
                  marginBottom: "20px",
                  marginRight: "50px"
                }}
              />
            </label>
            <label className="label">
              <span>Confirm new Password</span> &nbsp;
              <br />
              <input
                type="text"
                className="textBoxes"
                style={{
                  borderStyle: "solid",
                  backgroundColor: "rgb(244,248,247)",
                  marginBottom: "20px"
                }}
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordPopup;
