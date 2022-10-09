import React, { Component } from "react";
import {
  Card,
  Grid,
  Header,
  Button,
  Form,
  Input,
  Message,
} from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import vendor from "../../ethereum/vendor";
import token from "../../ethereum/token";
import { Link, Router } from "../../routes";

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
    let name;
    let symbol;
    // let totalSupply;
    let minterAccount;

    try {
      const accounts = await web3.eth.getAccounts();
      vendorAccount = vendor.options.address;
      myAccount = accounts[0];

      name = await token.methods._name().call();
      symbol = await token.methods._symbol().call();
      // totalSupply = await token.methods._totalSupply().call();
      vendorBalance = await token.methods.balanceOf(vendorAccount).call();
      myBalance = await token.methods.balanceOf(myAccount).call();
      minterAccount = await token.methods._minter().call();

      console.log("Token name: " + name);
      console.log("Token symbol: " + symbol);
      // console.log("Total suppy: " + totalSupply);
      console.log("Vendor account: " + vendorAccount);
      console.log("Vendor balance: " + vendorBalance);
      console.log("My account: " + myAccount);
      console.log("My balance: " + myBalance);
      console.log("Minter: " + minterAccount);
    } catch (err) {
      console.log(err.message);
    }

    return {
      vendorAccount,
      vendorBalance,
      myAccount,
      myBalance,
      name,
      symbol,
      minterAccount,
    };
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

  renderCards() {
    const {
      vendorAccount,
      name,
      symbol,
      vendorBalance,
      myBalance,
    } = this.props;

    const items = [
      {
        header: vendorAccount,
        meta: "",
        description: "Address of this vendor smart contract.",
        color: "blue",
        style: { overflowWrap: "break-word" },
      },
      {
        header: name,
        meta: "",
        description: "Name of the custom ERC20 token.",
        color: "blue",
        style: { overflowWrap: "break-word" },
      },
      {
        header: symbol,
        meta: "",
        description: "Symbol of the custom ERC20 token.",
        color: "blue",
        style: { overflowWrap: "break-word" },
      },
      {
        header: vendorBalance + " AWT",
        meta: "",
        description: "Total available tokens.",
        color: "orange",
        style: { overflowWrap: "break-word" },
      },
      {
        header: myBalance + " AWT",
        meta: "",
        description: "Number of AWT I have.",
        color: "orange",
        style: { overflowWrap: "break-word" },
      },
      {
        header: "100 AWT",
        meta: "",
        description: "Number of AWT equivalent to 1 ETH.",
        color: "orange",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group itemsPerRow={3} items={items} />;
  }

  render() {
    return (
      <Layout>
        <Grid>
          <Grid.Row style={{ marginTop: "10px" }}>
            <Grid.Column>{this.renderCards()}</Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ marginTop: "40px" }}>
            <Grid.Column width={8}>
              <Header
                as="h2"
                content="Purchase AWT"
                subheader="Connect your wallet and get your Awesome Token (AWT)"
              />
              <Form
                onSubmit={this.onPurchase}
                error={!!this.state.buyErrorMessage}
              >
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
                <Button
                  loading={this.state.purchaseLoading}
                  primary
                  type="submit"
                >
                  Purchase
                </Button>
                <Message
                  error
                  header="Oops!"
                  content={this.state.buyErrorMessage}
                />
              </Form>
            </Grid.Column>

            <Grid.Column width={1}></Grid.Column>

            <Grid.Column width={7}>
              <Header
                as="h2"
                content="Sell Your AWT"
                subheader="Insert the amount of AWT you want to sell"
              />
              <Form
                onSubmit={this.onSell}
                error={!!this.state.sellErrorMessage}
              >
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
                <Message
                  error
                  header="Oops!"
                  content={this.state.sellErrorMessage}
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default TokenPurchase;
