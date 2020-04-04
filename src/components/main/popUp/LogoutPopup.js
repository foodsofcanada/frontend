import React from "react";
import "./css/popUp.css";

class LogoutAccountPopup extends React.Component {
  render() {
    return (
      <div
        id="logoutPopup"
        className="suggest"
        onClick={event => {
          if (event.target.id === "logoutPopup") {
            document.getElementById("logoutPopup").style.display = "none";
            window.location.reload();
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
              Notice
            </div>

            <div
              style={{
                fontSize: "16px",
                textAlign: "center"
              }}
            >
              You have been Logged out
              <div>
                <div
                  style={{ display: "inline-block", marginTop: "20px" }}
                  className="cancelButton"
                  onClick={() => {
                    document.getElementById("logoutPopup").style.display =
                      "none";
                    window.location.reload();
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

export default LogoutAccountPopup;
