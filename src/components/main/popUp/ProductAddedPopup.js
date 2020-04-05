import React from "react";
import "./css/popUp.css";

class AddedPopup extends React.Component {
  render() {
    return (
      <div
        id="addedPopup"
        className="suggest"
        onClick={event => {
          if (event.target.id === "addedPopup") {
            document.getElementById("addedPopup").style.display = "none";
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
              Product succesfully added to pantry
              <div>
                <div
                  style={{ display: "inline-block", marginTop: "20px" }}
                  className="cancelButton"
                  onClick={() => {
                    document.getElementById("addedPopup").style.display =
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

export default AddedPopup;
