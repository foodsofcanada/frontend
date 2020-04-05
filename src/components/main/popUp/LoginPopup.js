import React from "react";
import "./css/popUp.css";

class LoginPopup extends React.Component {
  render() {
    return (
      <div
        id="loginPopup"
        className="suggest"
        onClick={event => {
          if (event.target.id === "loginPopup") {
            document.getElementById("loginPopup").style.display = "none";
          }
        }}
      >
        <div className="logoutBox">
          <div style={{ marginBottom: "47px" }}>
            <div
              style={{
                fontSize: "18px",
                textAlign: "center",
                marginBottom: "20px",
                fontWeight: "600"
              }}
            >
              Notice!
            </div>

            <div
              style={{
                fontSize: "16px",
                textAlign: "center"
              }}
            >
              You have to be logged in to access this feature.
              <div>
                <div
                  style={{ display: "inline-block", marginTop: "20px" }}
                  className="cancelButton"
                  onClick={() => {
                    document.getElementById("loginPopup").style.display =
                      "none";
                  }}
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPopup;
