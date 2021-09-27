import React, { Component } from "react";
import Web3 from "web3";

import "./App.css";

import "./stars.scss";

import SpaceToken from "../abis/SpaceToken.json";
import SpaceTokenSale from "../abis/SpaceTokenSale.json";
import Navbar from "./Navbar";

// import Navbar from "./tempNavBar";
import Main from "./Main";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
    // this.state.SpaceTokenSale.events.Sell(
    //   {
    //     fromBlock: "latest",
    //   },
    //   function (error, event) {
    //     if (error) alert("error while subscribing to event");
    //     console.log("Found Events log:", event);
    //   }
    // );
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    console.log("Inside load Blockchain");
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] });

    // Code
    const networkId = await web3.eth.net.getId();
    const networkData = SpaceToken.networks[networkId];

    const saleNetworkdata = SpaceTokenSale.networks[networkId];

    if (networkData && saleNetworkdata) {
      const Spacetoken = await new web3.eth.Contract(
        SpaceToken.abi,
        networkData.address,
        {
          from: accounts[0],
          gasPrice: 1000,
          gas: 100000,
        }
      );
      const Spacetokensale = await new web3.eth.Contract(
        SpaceTokenSale.abi,
        saleNetworkdata.address
      );
      console.log("Network Data Address: ", networkData._address);
      console.log("SpaceToken contract address", Spacetoken._address);
      console.log("SpaceTokenSale contract address", Spacetokensale._address);
      const totalSale = await Spacetoken.methods
        .balanceOf(Spacetokensale._address)
        .call();
      console.log("Total In Sale Available: ", totalSale);
      this.setState({ loading: true });
      var price = await Spacetokensale.methods.tokenPrice().call();
      var balance = "";
      await Spacetoken.methods
        .balanceOf(accounts[0])
        .call()
        .then((result) => {
          balance = result;
          console.log("Call Result Received: ", result);
        });

      var symbol = "";
      await Spacetoken.methods
        .symbol()
        .call()
        .then((result) => {
          symbol = result;
          console.log("Symbol Call Result Received: ", result);
        });
      const totalSupply = await Spacetoken.methods.totalSupply().call();
      const tokensSold = await Spacetokensale.methods.tokensSold().call();
      const admin =
        accounts[0] === "0x03266d84e9de01857388293eCb261941ABd083F5";

      console.log(
        "SpaceToken, ",
        price / 1000000000000000000,
        balance,
        symbol,
        totalSupply,
        tokensSold,
        accounts
      );
      this.setState({
        price: price / 1000000000000000000,
        balance: balance,
        totalSupply: totalSupply,
        tokensSold: tokensSold,
        symbol: symbol,
        account: accounts[0],
        loading: false,
        SpaceToken: Spacetoken,
        SpaceTokenSale: Spacetokensale,
        totalSale: totalSale,
        isAdmin: admin,
      });
    } else {
      window.alert(
        "SpaceToken Contract is not available on the current network"
      );
    }
  }

  async buyTokens(tokenAmount) {
    this.setState({ loading: true });
    var tokenAmt = tokenAmount; //document.getElementById("tokenAmt").value;
    Web3.providers.HttpProvider.prototype.sendAsync =
      Web3.providers.HttpProvider.prototype.send;
    console.log("TokenAmt: ", tokenAmt);
    await this.state.SpaceTokenSale.methods
      .buyTokens(tokenAmt)
      .send({
        from: this.state.account,
        value: this.state.price * 1000000000000000000 * tokenAmt,
      })
      .once("transactionHash", (hash) => {
        console.log("Transaction Hash received: ", hash);
        // window.location.reload();
        this.setState({ loading: false });
      })
      .once("receipt", function (receipt) {
        console.log(
          "Transaction Receipt: ",

          receipt,
          receipt.events
        );
      })
      .once("confirmation", (confirmation, receipt) => {
        console.log(
          "Transaction confirmation: ",
          confirmation,
          receipt,
          receipt.events
        );
      });

    // this.state.Spacetokensale.events.sell({}, (error, data) => {
    //   if (error) console.log("Response Event Sell Error: ", error);
    //   else console.log("Response Event Sell data: ", data);
    // });
    // let MyEvent = this.state.SpaceTokenSale.events.sell({});

    // MyEvent.watch((error, result) => {
    //   if (error) {
    //     console.log("Response Event Sell Error: ", error);
    //   }

    //   console.log("Response Event Sell data: ", result);
    // });
    console.log(
      "Token Amt: ",
      tokenAmt,
      "Token Price: ",
      this.state.price * 1000000000000000000 * tokenAmt,

      1000000000000000 / 1000000000000000
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      price: null,
      symbol: null,
      balance: null,
      SpaceToken: null,
      SpaceTokenSale: null,
      totalSupply: null,
      tokensSold: null,
      loading: true,
      isAdmin: false,
      totalSale: null,
    };

    this.buyTokens = this.buyTokens.bind(this);
  }

  async componentDidMount() {
    console.log("Rendering .... ");
    await this.loadBlockchainData();
    console.log("States Set ....", this.state);
  }

  render() {
    return (
      <div id="stars-container" style={{ width: "100% " }}>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        {this.state.account !== "" ? (
          <>
            <Navbar account={this.state.account} />
          </>
        ) : (
          <div />
        )}
        {this.state.loading ? (
          <div
            id="loader"
            className="text-center mt-5"
            style={{ backgroundColor: "lightgray" }}
          >
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <Main
              symbol={this.state.symbol}
              buyTokens={this.buyTokens}
              tokensSold={this.state.tokensSold}
              totalSupply={this.state.totalSupply}
              account={this.state.account}
              isAdmin={this.state.isAdmin}
              tokenPrice={this.state.price}
              balance={this.state.balance}
            />
          </>
        )}

        <div
          classname="info-section"
          style={{
            display: "flex",
            flexDirection: "row",
            position: "fixed",
            left: "10",
            bottom: "0",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ flex: "1" }}>
            <h6 class="text-light">
              {" "}
              Version: <span>1</span>
            </h6>
          </div>
          <div style={{ flex: "1" }}>
            <h6 class="text-light">
              Total Sold: <span>{this.state.tokensSold}</span>
            </h6>
          </div>
          <div style={{ flex: "1" }}>
            <h6 class="text-light">
              {" "}
              Available For Sale: <span>{this.state.totalSale}</span>
            </h6>
          </div>
          <div style={{ flex: "1" }}>
            <h6 class="text-light">
              {" "}
              Total Supply: <span>{this.state.totalSupply}</span>
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
