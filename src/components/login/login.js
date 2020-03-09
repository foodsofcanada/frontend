import React from "react";
import "./css/login.css";

class LoginPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            height: "100vh",
            width: "70%",
            backgroundColor: "red",
            display: "inline"
          }}
          className="d-flex justify-content-center"
        >
          <div className="loginBox d-flex justify-content-center">
            <div style={{ display: "inline-block" }}>
              <div>
                <label>
                  <h5>Email</h5> &nbsp;
                  <input
                    type="text"
                    style={{
                      borderStyle: "solid",
                      backgroundColor: "rgb(244,248,247)",
                      marginBottom: "20px"
                    }}
                  />
                  <h5>Password</h5>
                  <input
                    type="password"
                    style={{
                      borderStyle: "solid",
                      backgroundColor: "rgb(244,248,247)",
                      marginBottom: "20px"
                    }}
                  />
                </label>
              </div>
              <div><button>Login</button> <button>Sign up</button></div>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "100vh",
            width: "30%",
            backgroundColor: "purple",
            display: "inline"
          }}
          className="d-flex justify-content-center"
        ></div>
      </div>
    );
  }
}

export default LoginPage;
