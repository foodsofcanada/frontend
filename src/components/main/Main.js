import React from "react";
//import { Link } from "react-router-dom";
import InfoBar from "./InfoBar";

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      showState: {
        showTop10: true,
        showPantries: false,
        showFav: false,
        showRegion: false,
        showProductInformation: false
      }
    };
  }

  render() {
    // const p = "hello";
    return (
      //   <Link to="/settings">{p === "Hell" ? <h1>Hello</h1> : <h1>Ho</h1>}</Link>
      <div>
        <InfoBar />
        <div
          style={{
            backgroundColor: "red",
            display: "inline-flex",
            width: "75%",
            position: "relative"
          }}
        >
          Use justify-content utilities on flexbox containers to change the
          alignment of flex items on the main axis (the x-axis to start, y-axis
          if flex-direction: column). Choose from start (browser default), end,
          center, between, or around.
        </div>
      </div>
    );
  }
}

export default Main;
