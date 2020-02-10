import React from "react";
//import { Link } from "react-router-dom";
import InfoBar from "./InfoBar";
import GoogleMap from "./GoogleMap"

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
           
            display: "inline-flex",
            width: "75%",
            position: "relative"
          }}
        >
         <GoogleMap/>
        </div>
      </div>
    );
  }
}

export default Main;
