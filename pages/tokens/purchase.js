import React, { Component } from "react";
import { Header, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import vendor from "../../ethereum/vendor";
import token from "../../ethereum/token";
import { Router } from "../../routes";

class TokenPurchase extends Component {

  static async getInitialProps(props) {
    const accounts = await web3.eth.getAccounts();
    const minter = await token.methods._minter().call();
    const vendorBalance = await token.methods.balanceOf(vendor.options.address).call();
    const myBalance = await token.methods.balanceOf(accounts[0]).call();

    console.log("Vendor balance: " + vendorBalance);
    console.log("My balance: " + myBalance);
    return {vendorBalance, myBalance};
  }

  state = {
    amount: "",
    errorMessage: "",
  };

  onPurchase = async () => {};

  onSell = async () => {
    event.preventDefault();
    this.setState({ errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await vendor.methods.sellToken(this.state.amount).send({
        from: accounts[0],
      });
      Router.pushRoute(`/tokens/purchase`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
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
        <Button primary type="submit">
          Purchase
        </Button>
        <br />
        <br />
        <hr />
        <Header
          as="h2"
          content="Sell Your AWT"
          subheader="Insert the amount of AWT you want to sell"
        />
        <h4>My available AWT: {this.props.myBalance} AWT</h4>
        <Form onSubmit={this.onSell} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Amount</label>
            <Input
              label="AWT"
              labelPosition="right"
              value={this.state.amount}
              onChange={(event) =>
                this.setState({ amount: event.target.value })
              }
            />
          </Form.Field>
          <Button primary type="submit">
            Sell
          </Button>
          <Message error header="Oops!" content={this.state.errorMessage} />
        </Form>
      </Layout>
    );
  }
}

export default TokenPurchase;
