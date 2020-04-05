import React from "react";
import "./css/popUp.css";

class NotAddedPopup extends React.Component {
  render() {
    return (
      <div
        id="notAddedPopup"
        className="suggest"
        onClick={event => {
          if (event.target.id === "notAddedPopup") {
            document.getElementById("notAddedPopup").style.display = "none";
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
              Product could not be added to this pantry!
              <div>
                <div
                  style={{ display: "inline-block", marginTop: "20px" }}
                  className="cancelButton"
                  onClick={() => {
                    document.getElementById("notAddedPopup").style.display =
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

export default NotAddedPopup;
