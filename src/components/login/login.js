import React from "react";
import "./css/login.css";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    // const {name, value, type, checked} = event.target
    this.setState({ [name]: [value] });
  }

  errorMessage = "";

  handleSubmit(event) {
    event.preventDefault();
    // if(this.state.email==""||)?
  }
  render() {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            height: "100vh",
            width: "70%",
            backgroundColor: "white",
            display: "inline"
          }}
          className="d-flex justify-content-center"
        >
          <div className="loginBox d-flex justify-content-center">
            <div style={{ display: "inline-block" }}>
              <form onSubmit={this.handleSubmit}>
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
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </label>
                  <br />
                  <label>
                    <h5>Password</h5>
                    <input
                      type="password"
                      style={{
                        borderStyle: "solid",
                        backgroundColor: "rgb(244,248,247)",
                        marginBottom: "20px"
                      }}
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </label>
                </div>
                <div>
                  <input type="submit" value="Login" /> <button>Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "100vh",
            width: "30%",
            backgroundColor: "#8574e7",
            display: "inline"
          }}
          className="d-flex justify-content-center"
        ></div>
      </div>
    );
  }
}

export default LoginPage;
