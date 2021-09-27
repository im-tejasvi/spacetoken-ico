import React, { Component } from "react";
import Identicon from "identicon.js";
import "./CustomListItemComponent.css";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Main extends Component {
  async componentWillMount() {
    console.log("props: ", this.props);
  }

  render() {
    return (
      <div style={{ marginTop: "15%" }}>
        <div class="container" id="" style={{ width: "950px" }}>
          <div class="row">
            <div id="content" class="text-center">
              <div class="col-lg-12" id="title">
                <span class="text-center">
                  {this.props.symbol} Token ICO SALE
                </span>
                <hr />
                <br />
              </div>
              <div>
                <p id="title1">
                  <span>
                    Introducing "{this.props.symbol} Token" !{" "}
                    <span>Token price is {this.props.tokenPrice} Ether.</span>
                  </span>
                </p>
              </div>

              <br />

              <div class="form-group">
                <div class="input-group">
                  <input
                    class="form-control input-lg"
                    type="number"
                    id="tokenAmt"
                  ></input>
                  <span class="input-group-btn">
                    <button
                      onClick={() => {
                        this.props.buyTokens(
                          document.getElementById("tokenAmt").value
                        );
                      }}
                      class="btn btn-primary btn-lg"
                    >
                      Buy Tokens
                    </button>
                  </span>
                </div>
              </div>
              <h5 class="text-light " id="title2">
                <span>Your Account: {this.props.account}</span>
              </h5>
              <h5 class="text-light " id="title2">
                <span>You currently have</span>
                <span class="dapp-balance">{this.props.balance}</span>
                &nbsp;{this.props.symbol}.
              </h5>

              <br />

              <br />
            </div>
          </div>

          <div class="adminButton">
            {this.props.isAdmin ? (
              <button
                onClick={() => {
                  this.buyTokens();
                }}
                class="btn btn-info btn-lg"
              >
                End Sale
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
