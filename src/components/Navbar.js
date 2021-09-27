import React, { Component } from "react";
import Identicon from "identicon.js";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
    };
  }

  componentDidMount() {
    console.log("Props Received: ", this.props.account);
  }
  render() {
    return (
      <nav
        className="navbar navbar-dark fixed-top  flex-md-nowrap p-0 shadow"
        style={{
          width: "100%",
          object_fit: "contain",
          justifyContent: "space-between",
        }}
      >
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={
              "https://www.technocrazed.com/wp-content/uploads/2015/12/HD-Space-Wallpaper-For-Background-22.jpg"
            }
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          Grab Your Space
        </a>

        <a
          className="navbar-brand col-sm-3 col-md-1 mr-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={
              "https://cdn3.iconfinder.com/data/icons/inficons/512/github.png"
            }
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          Github
        </a>

        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap ">
            <small className="text-white">
              <small id="accountId">{this.props.account}</small>
            </small>

            {this.props.account ? (
              <img
                className="ml-2"
                width="30"
                height="30"
                src={`data:image/png;base64,${new Identicon(
                  this.props.account,
                  30
                ).toString()}`}
              />
            ) : (
              <span></span>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
