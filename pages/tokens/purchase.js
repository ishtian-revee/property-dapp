import React, { Component } from "react";
import {
  Card,
  Grid,
  Header,
  Button,
  Form,
  Input,
  Message,
  Divider,
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
    mintAmount: "",
    buyErrorMessage: "",
    sellErrorMessage: "",
    mintErrorMessage: "",
    purchaseLoading: false,
    sellLoading: false,
    mintLoading: false,
    transferLoading: false,
  };

  static async getInitialProps(props) {
    let summary;
    let vendorAccount;
    let myAccount;
    let myBalance;

    try {
      const accounts = await web3.eth.getAccounts();
      vendorAccount = vendor.options.address;
      myAccount = accounts[0];
      summary = await vendor.methods.getSummary().call();
      myBalance = await token.methods.balanceOf(myAccount).call();

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
      console.log("My Balance: " + myBalance);
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
      myBalance: myBalance,
      vendorEthBalance: summary[7],
    };
  }

  purchaseToken = async () => {
    event.preventDefault();
    this.setState({
      purchaseLoading: true,
      buyErrorMessage: "",
      sellErrorMessage: "",
      mintErrorMessage: "",
    });

    if (this.state.buyAmount == 0) {
      this.setState({
        purchaseLoading: false,
        buyErrorMessage: "AWT amount is not inserted.",
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

  sellToken = async () => {
    event.preventDefault();
    this.setState({
      sellLoading: true,
      sellErrorMessage: "",
      buyErrorMessage: "",
      mintErrorMessage: "",
    });

    if (this.state.sellAmount == 0) {
      this.setState({
        sellLoading: false,
        sellErrorMessage: "AWT amount is not inserted.",
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

  mintToken = async () => {
    event.preventDefault();
    this.setState({
      mintLoading: true,
      mintErrorMessage: "",
      sellErrorMessage: "",
      buyErrorMessage: "",
    });

    if (this.state.mintAmount == 0) {
      this.setState({
        mintLoading: false,
        mintErrorMessage: "AWT amount is not inserted.",
      });
    } else {
      if (this.props.myAccount == this.props.minter) {
        try {
          await token.methods.mint(this.state.mintAmount).send({
            from: this.props.myAccount,
          });
          Router.pushRoute(`/tokens/purchase`);
        } catch (err) {
          this.setState({ mintErrorMessage: err.message });
        }
        this.setState({ mintLoading: false, mintAmount: "" });
      } else {
        this.setState({
          mintLoading: false,
          mintErrorMessage: "You are not minter of AWT.",
        });
      }
    }
  };

  transferToken = async () => {
    event.preventDefault();
    const { myAccount, vendorAccount, myBalance, minter } = this.props;
    this.setState({
      transferLoading: true,
      mintErrorMessage: "",
      sellErrorMessage: "",
      buyErrorMessage: "",
    });

    if (myAccount === minter) {
      if (myBalance > 0) {
        try {
          await token.methods
            .transferFrom(myAccount, vendorAccount, myBalance)
            .send({
              from: myAccount,
            });
          Router.pushRoute(`/tokens/purchase`);
        } catch (err) {
          this.setState({ mintErrorMessage: err.message });
        }
        this.setState({ transferLoading: false });
      } else {
        this.setState({
          transferLoading: false,
          mintErrorMessage: "You do not have any mined AWT to transfer.",
        });
      }
    } else {
      this.setState({
        transferLoading: false,
        mintErrorMessage: "You are not minter of AWT.",
      });
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
      {
        header: minter,
        meta: "",
        description: "Address of the minter account.",
        color: "green",
        style: { overflowWrap: "break-word" },
      },
    ];

    return <Card.Group itemsPerRow={3} items={items} />;
  }

  render() {
    return (
      <Layout>
        <Grid relaxed>
          <Grid.Row style={{ marginTop: "10px" }}>
            <Grid.Column>{this.renderCards()}</Grid.Column>
          </Grid.Row>

          <Divider />

          <Grid.Row>
            <Grid.Column width={8}>
              <Header
                as="h2"
                content="Purchase AWT"
                subheader="Connect your wallet and get your Awesome Token (AWT)"
              />
              <label>
                <strong>Amount</strong>
              </label>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={12}>
                    <Input
                      fluid
                      label="AWT"
                      labelPosition="right"
                      value={this.state.buyAmount}
                      onChange={(event) =>
                        this.setState({ buyAmount: event.target.value })
                      }
                    />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Button
                      fluid
                      loading={this.state.purchaseLoading}
                      primary
                      onClick={this.purchaseToken}
                    >
                      Purchase
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {this.state.buyErrorMessage ? (
                <Message
                  error
                  header="Oops!"
                  content={this.state.buyErrorMessage}
                />
              ) : null}
            </Grid.Column>

            <Grid.Column width={8}>
              <Header
                as="h2"
                content="Sell Your AWT"
                subheader="Insert the amount of AWT you want to sell"
              />
              <label>
                <strong>Amount</strong>
              </label>
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column width={12}>
                    <Input
                      fluid
                      label="AWT"
                      labelPosition="right"
                      value={this.state.sellAmount}
                      onChange={(event) =>
                        this.setState({ sellAmount: event.target.value })
                      }
                    />
                  </Grid.Column>

                  <Grid.Column width={4}>
                    <Button
                      fluid
                      loading={this.state.sellLoading}
                      primary
                      onClick={this.sellToken}
                    >
                      Sell
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {this.state.sellErrorMessage ? (
                <Message
                  error
                  header="Oops!"
                  content={this.state.sellErrorMessage}
                />
              ) : null}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={8}>
              <Header
                as="h2"
                content="Mint AWT"
                subheader="Only minter can mint new Awesome Token (AWT)"
              />
              <label>
                <strong>Amount</strong>
              </label>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={10}>
                    <Input
                      fluid
                      label="AWT"
                      labelPosition="right"
                      value={this.state.mintAmount}
                      onChange={(event) =>
                        this.setState({ mintAmount: event.target.value })
                      }
                    />
                  </Grid.Column>

                  <Grid.Column width={6}>
                    <Button
                      loading={this.state.mintLoading}
                      primary
                      onClick={this.mintToken}
                    >
                      Mint
                    </Button>

                    <Button
                      loading={this.state.transferLoading}
                      basic
                      color="teal"
                      onClick={this.transferToken}
                    >
                      Transfer
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              {this.state.mintErrorMessage ? (
                <Message
                  error
                  header="Oops!"
                  content={this.state.mintErrorMessage}
                />
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default TokenPurchase;
