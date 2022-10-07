import React, { Component } from "react";
import { Header, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import vendor from "../../ethereum/vendor";
import CompiledVendor from "../../ethereum/build/Vendor.json";
import token from "../../ethereum/token";
import { Router } from "../../routes";

class TokenPurchase extends Component {
  static async getInitialProps(props) {
    const accounts = await web3.eth.getAccounts();
    const vendorBalance = await token.methods
      .balanceOf(CompiledVendor.address)
      .call();
    const myBalance = await token.methods.balanceOf(accounts[0]).call();
    console.log("Vendor balance: " + vendorBalance);
    console.log("My balance: " + myBalance);
    return vendorBalance, myBalance;
  }

  renderVendorBalance() {
    return <h4>Available tokens: {this.props.vendorBalance} AWT</h4>;
  }

  renderMyBalance() {
    return <h4>My available AWT: {this.props.myBalance} AWT</h4>;
  }

  state = {
    amountToSell: "",
    errorMessage: "",
    purchaseLoading: false,
    sellLoading: false,
  };

  onPurchase = async () => {};

  onSell = async () => {
    event.preventDefault();
    this.setState({ sellLoading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await vendor.methods.sellToken(this.state.amountToSell).send({
        from: accounts[0],
      });
      Router.pushRoute(`/tokens/purchase`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ sellLoading: false });
  };

  render() {
    return (
      <Layout>
        <Header
          as="h2"
          content="Purchase AWT"
          subheader="Connect your wallet and get your Awesome Token (AWT)"
        />
        {this.renderVendorBalance()}
        <h4>1 ETH equivalent: 100 AWT</h4>
        <Button purchaseLoading primary type="submit">
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
        {this.renderMyBalance()}
        <Form onSubmit={this.onSell} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Amount</label>
            <Input
              label="AWT"
              labelPosition="right"
              value={this.state.amountToSell}
              onChange={(event) =>
                this.setState({ amountToSell: event.target.value })
              }
            />
          </Form.Field>
          <Button sellLoading={this.state.sellLoading} primary type="submit">
            Sell
          </Button>
          <Message error header="Oops!" content={this.state.errorMessage} />
        </Form>
      </Layout>
    );
  }
}

export default TokenPurchase;
