import React, { Component } from "react";
import { Header, Segment, Button, Card, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import PropertyCard from "../components/PropertyCard";
import web3 from "../ethereum/web3";
import registry from "../ethereum/registry";
import property from "../ethereum/property";
import token from "../ethereum/token";

class PropertyIndex extends Component {

  state = { errorMessage: "" };

  static async getInitialProps() {
    let properties;
    let myAccount;
    let balance;

    try {
      const accounts = await web3.eth.getAccounts();
      myAccount = accounts[0];
      balance = await token.methods.balanceOf(myAccount).call();
      properties = await registry.methods.getProperties().call();
    } catch (err) {
      console.log("ERROR: " + err.message);
    }
    return {
      myAccount,
      balance,
      properties,
    };
  }

  handleError = (err) => {
    this.setState({ errorMessage: err });
  };

  renderProperties() {
    if (this.props.properties != null) {
      return this.props.properties
        .filter(
          (prop) => prop.owner !== this.props.myAccount && prop.isAvailable
        )
        .map((item, index) => {
          console.log("Property item: " + item);
          return (
            <PropertyCard
              key={index}
              id={item.pid}
              price={item.price}
              location={item.location}
              size={item.size}
              isAvailable={item.isAvailable}
              myAccount={this.props.myAccount}
              owner={item.owner}
              isForOwner={false}
              balance={this.props.balance}
              onError={this.handleError}
            />
          );
        }).reverse();
    }
  }

  render() {
    return (
      <Layout>
        <Header
          as="h2"
          content="Property Maketplace"
          subheader="Check for property location, size, price, and buy your property"
        />
        {this.state.errorMessage ? (
          <Message error header="Oops!" content={this.state.errorMessage} />
        ) : null}
        <br />
        <Card.Group itemsPerRow={3}>{this.renderProperties()}</Card.Group>
        <br />
        <br />
        <Segment clearing>
          <Header as="h4" floated="left">
            Account: {this.props.myAccount}
          </Header>
          <Header as="h4" floated="right">
            Balance: {this.props.balance} AWT
          </Header>
        </Segment>
      </Layout>
    );
  }
}

export default PropertyIndex;
