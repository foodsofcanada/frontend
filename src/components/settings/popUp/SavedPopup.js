import React from "react";
import "./css/popUp.css";

class SavedPopup extends React.Component {
  render() {
    return (
      <div
        id="savedPopup"
        className="suggest"
        onClick={event => {
          if (event.target.id === "savedPopup") {
            document.getElementById("savedPopup").style.display = "none";
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
              Your changes have been saved!
              <div>
                <div
                  style={{ display: "inline-block", marginTop: "20px" }}
                  className="cancelButton"
                  onClick={() => {
                    document.getElementById("savedPopup").style.display =
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

export default SavedPopup;
