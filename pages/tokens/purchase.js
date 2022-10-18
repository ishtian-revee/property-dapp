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
    let summary;
    let vendorAccount;
    let myAccount;

    try {
      const accounts = await web3.eth.getAccounts();
      vendorAccount = vendor.options.address;
      myAccount = accounts[0];
      summary = await vendor.methods.getSummary().call();

      console.log("Token name: " + summary[0]);
      console.log("Token symbol: " + summary[1]);
      console.log("Decimals: " + summary[2]);
      console.log("Total supply: " + summary[3]);
      console.log("Minter: " + summary[4]);
      console.log("Vendor account: " + vendorAccount);
      console.log("Vendor balance: " + summary[5]);
      console.log("My account: " + myAccount);
      console.log("My balance: " + summary[6]);
      console.log("Vendor eth balance: " + summary[7]);
    } catch (err) {
      console.log(err.message);
    }

    return {
      name: summary[0],
      symbol: summary[1],
      decimals: summary[2],
      totalSupply: summary[3],
      minter: summary[4],
      vendorAccount: vendorAccount,
      vendorBalance: summary[5],
      myAccount: myAccount,
      myBalance: summary[6],
      vendorEthBalance: summary[7],
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
      name,
      symbol,
      decimals,
      totalSupply,
      minter,
      vendorAccount,
      vendorBalance,
      myAccount,
      myBalance,
      vendorEthBalance,
    } = this.props;

    const items = [
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
        header: totalSupply,
        meta: "",
        description: "Total supply of " + name + "s.",
        color: "blue",
        style: { overflowWrap: "break-word" },
      },
      {
        header: vendorAccount,
        meta: "",
        description: "Address of this vendor smart contract.",
        color: "orange",
        style: { overflowWrap: "break-word" },
      },
      {
        header: vendorBalance + " AWT",
        meta: "",
        description: "Total available tokens to buy.",
        color: "orange",
        style: { overflowWrap: "break-word" },
      },
      {
        header: vendorEthBalance + " ETH",
        meta: "",
        description: "Vendor ETH balance.",
        color: "orange",
        style: { overflowWrap: "break-word" },
      },
      {
        header: myBalance + " AWT",
        meta: "",
        description: "Number of AWT I have.",
        color: "green",
        style: { overflowWrap: "break-word" },
      },
      {
        header: "100 AWT",
        meta: "",
        description: "Number of AWT equivalent to 1 ETH.",
        color: "green",
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
          <Grid.Row style={{ marginTop: "20px" }}>
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
