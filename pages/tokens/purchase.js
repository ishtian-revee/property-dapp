import React, { Component } from "react";
import { Header, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import vendor from "../../ethereum/vendor";
import token from "../../ethereum/token";
import { Router } from "../../routes";

class TokenPurchase extends Component {
  state = {
    buyAmount: "",
    sellAmount: "",
    buyErrorMessage: "",
    sellErrorMessage: "",
    purchaseLoading: false,
    sellLoading: false,
  };

  static async getInitialProps(props) {
    let vendorBalance;
    let myBalance;
    let vendorAccount;
    let myAccount;
    try {
      const accounts = await web3.eth.getAccounts();
      vendorAccount = vendor.options.address;
      myAccount = accounts[0];

      vendorBalance = await token.methods.balanceOf(vendorAccount).call();
      myBalance = await token.methods.balanceOf(myAccount).call();

      console.log("Vendor balance: " + vendorBalance);
      console.log("My balance: " + myBalance);
      console.log("Vendor account: " + vendorAccount);
      console.log("My account: " + myAccount);
    } catch (err) {
      console.log(err.message);
    }

    return { vendorAccount, vendorBalance, myAccount, myBalance };
  }

  onPurchase = async () => {
    event.preventDefault();
    this.setState({
      purchaseLoading: true,
      sellLoading: false,
      buyErrorMessage: "",
      sellErrorMessage: "",
    });

    if (this.state.buyAmount == 0) {
      this.setState({
        purchaseLoading: false,
        buyErrorMessage: "AWT amout is not inserted.",
      });
    } else {
      console.log("Amount: " + (this.state.buyAmount / 100).toString());
      try {
        await vendor.methods.buyToken().send({
          from: this.props.myAccount,
          value: web3.utils.toWei(
            (this.state.buyAmount / 100).toString(),
            "ether"
          ),
        });
        Router.pushRoute(`/tokens/purchase`);
      } catch (err) {
        this.setState({ buyErrorMessage: err.message });
      }
      this.setState({ purchaseLoading: false, buyAmount: "" });
    }
  };

  onSell = async () => {
    event.preventDefault();
    this.setState({
      sellLoading: true,
      purchaseLoading: false,
      sellErrorMessage: "",
      buyErrorMessage: "",
    });
    if (this.state.sellAmount == 0) {
      this.setState({
        sellLoading: false,
        sellErrorMessage: "AWT amout is not inserted.",
      });
    } else {
      try {
        await vendor.methods.sellToken(this.state.sellAmount).send({
          from: this.props.myAccount,
        });
        Router.pushRoute(`/tokens/purchase`);
      } catch (err) {
        this.setState({ sellErrorMessage: err.message });
      }
      this.setState({ sellLoading: false, sellAmount: "" });
    }
  };

  render() {
    return (
      <Layout>
        <Header
          as="h2"
          content="Purchase AWT"
          subheader="Connect your wallet and get your Awesome Token (AWT)"
        />
        <h4>Available tokens: {this.props.vendorBalance} AWT</h4>
        <h4>1 ETH equivalent: 100 AWT</h4>
        <Form onSubmit={this.onPurchase} error={!!this.state.buyErrorMessage}>
          <Form.Field>
            <label>Amount</label>
            <Input
              label="AWT"
              labelPosition="right"
              value={this.state.buyAmount}
              onChange={(event) =>
                this.setState({ buyAmount: event.target.value })
              }
            />
          </Form.Field>
          <Button loading={this.state.purchaseLoading} primary type="submit">
            Purchase
          </Button>
          <Message error header="Oops!" content={this.state.buyErrorMessage} />
        </Form>
        <br />
        <br />
        <hr />
        <Header
          as="h2"
          content="Sell Your AWT"
          subheader="Insert the amount of AWT you want to sell"
        />
        <h4>My available AWT: {this.props.myBalance} AWT</h4>
        <Form onSubmit={this.onSell} error={!!this.state.sellErrorMessage}>
          <Form.Field>
            <label>Amount</label>
            <Input
              label="AWT"
              labelPosition="right"
              value={this.state.sellAmount}
              onChange={(event) =>
                this.setState({ sellAmount: event.target.value })
              }
            />
          </Form.Field>
          <Button loading={this.state.sellLoading} primary type="submit">
            Sell
          </Button>
          <Message error header="Oops!" content={this.state.sellErrorMessage} />
        </Form>
      </Layout>
    );
  }
}

export default TokenPurchase;
