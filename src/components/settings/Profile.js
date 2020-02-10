import React from "react";

import "./css/Profile.css";
import trash from "../../icons/trash-2.svg";
import { ReactSVG } from "react-svg";

//import "bootstrap/dist/css/bootstrap-theme.css";
import { Form } from "react-bootstrap";

function Profile() {
  return (
    <div className="settingsContent ">
      <div className="headerProfile">Profile</div>
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        <ReactSVG src={trash} style={{ height: "30px", float: "right" }} />
        <div
          style={{
            width: "145px",
            height: "145px",
            background: "red",
            float: "right",
            overflow: "none",
            borderRadius: "50%"
          }}
        ></div>
      </div>

      <div
        style={{ width: "100%", marginTop: "90px" }}
        className="d-flex justify-content-center"
      >
        <div style={{ display: "inline-block" }}>
          <label>
            First name <br />
            <input type="text" />
          </label>
        </div>
        <div style={{ display: "inline-block", marginLeft: "50px" }}>
          Last name <br />
          <input type="text" />
        </div>
      </div>

      <div style={{ width: "100%", marginTop: "50px", marginLeft: "20px" }}>
        <span style={{ color: "#7764E4" }}>Change password?</span>
      </div>

      <div style={{ width: "100%", marginTop: "25px" }}>
        <div style={{ display: "inline-block", marginLeft: "20px" }}>
          <label>
            Language <br />
            <Form.Group controlId="formGridState">
              <Form.Control as="select">
                <option>English</option>
                <option>French</option>
              </Form.Control>
            </Form.Group>
          </label>
        </div>
      </div>

      <div>
        <span style={{ color: "#FF3D3D", marginLeft: "20px" }}>
          Delete account?
        </span>

        <input
          type="submit"
          value="Save changes"
          style={{ float: "right" }}
          className="saveProfile"
        ></input>
      </div>
    </div>
  );
}

export default Profile;
