import React, { Component } from "react";
import { Header, Button, Card, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import PropertyCard from "../components/PropertyCard";
import web3 from "../ethereum/web3";
import registry from "../ethereum/registry";
import property from "../ethereum/property";

class PropertyIndex extends Component {
  static async getInitialProps() {
    let propList;
    let myAccount;

    try {
      const properties = await registry.methods.getProperties().call();
      const accounts = await web3.eth.getAccounts();
      myAccount = accounts[0];
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
        <Card.Group>{this.renderProperties()}</Card.Group>
      </Layout>
    );
  }
}

export default PropertyIndex;
