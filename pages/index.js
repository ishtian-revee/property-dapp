import React, { Component } from "react";
import { Header, Segment, Button, Card, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import PropertyCard from "../components/PropertyCard";
import web3 from "../ethereum/web3";
import registry from "../ethereum/registry";
import property from "../ethereum/property";
import token from "../ethereum/token";

class PropertyIndex extends Component {
  static async getInitialProps() {
    let propList;
    let myAccount;
    let balance;

    try {
      const accounts = await web3.eth.getAccounts();
      myAccount = accounts[0];
      balance = await token.methods.balanceOf(myAccount).call();
      const properties = await registry.methods.getProperties().call();
      console.log("Properties: " + properties);

      propList = await Promise.all(
        properties.map(async (item, index) => ({
          ...item,
          id: index,
          owner: await property.methods.ownerOf(index).call(),
        }))
      );
    } catch (err) {
      console.log("ERROR: " + err.message);
    }
    return {
      myAccount,
      balance,
      propList,
    };
  }

  renderProperties() {
    return this.props.propList.map((item, index) => {
      return (
        <PropertyCard
          key={index}
          id={index}
          price={item.price}
          location={item.location}
          size={item.size}
          isAvailable={item.isAvailable}
          myAccount={this.props.myAccount}
          owner={item.owner}
          isForOwner={false}
        />
      );
    });
  }

  render() {
    return (
      <Layout>
        <Header
          as="h2"
          content="Property Maketplace"
          subheader="Check for property location, size, price, and buy your property"
        />
        <br />
        <Card.Group itemsPerRow={3}>{this.renderProperties()}</Card.Group>
        <br /><br />
        <Segment clearing>
          <Header as='h4' floated='left'>Account: {this.props.myAccount}</Header>
          <Header as='h4' floated='right'>Balance: {this.props.balance} AWT</Header>
        </Segment>
      </Layout>
    );
  }
}

export default PropertyIndex;
