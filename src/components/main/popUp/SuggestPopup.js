import React from "react";
import "./css/popUp.css";

class SuggestPopup extends React.Component {
  render() {
    return (
      <div
        id="suggest"
        className="suggest"
        onClick={event => {
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
                fontSize: "18px"
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
                  marginBottom: "20px"
                }}
              />
            </label>

            <br />
            <label className="label">
              <span>Product description and links</span> &nbsp;
              <br />
              <textarea
                className="prodDesc"
                style={{
                  borderStyle: "solid",
                  backgroundColor: "rgb(244,248,247)"
                }}
              />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestPopup;
