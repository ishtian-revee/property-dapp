import React, { Component } from "react";
import { Header, Button, Card, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import PropertyCard from "../../components/PropertyCard";
import web3 from "../../ethereum/web3";
import registry from "../../ethereum/registry";
import property from "../../ethereum/property";
import { Router } from "../../routes";

class PropertyOwned extends Component {
  state = {
    approvalLoading: false,
    rejectionLoading: false,
  };

  static async getInitialProps() {
    let properties;
    let myAccount;
    let isApproved;

    try {
      const accounts = await web3.eth.getAccounts();
      myAccount = accounts[0];
      properties = await registry.methods.getProperties().call();
      isApproved = await property.methods
        .isApprovedForAll(myAccount, registry.options.address)
        .call();
      console.log("Properties: " + properties);
      console.log("isApproved: " + isApproved);
    } catch (err) {
      console.log("ERROR: " + err.message);
    }
    return {
      myAccount,
      properties,
      isApproved,
    };
  }

  setApproval = async (approve) => {
    if (approve) {
      this.setState({ approvalLoading: true });
    } else {
      this.setState({ rejectionLoading: true });
    }

    try {
      await property.methods
        .setApprovalForAll(registry.options.address, approve)
        .send({
          from: this.props.myAccount,
        });
      Router.pushRoute(`/properties/owned`);
    } catch (err) {
      console.log("ERROR: " + err.message);
    }
    this.setState({ approvalLoading: false, rejectionLoading: false });
  };

  renderProperties() {
    return this.props.properties.map((item, index) => {
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
          isForOwner={true}
        />
      );
    });
  }

  render() {
    return (
      <Layout>
        <Header
          as="h2"
          content="My Owned Properties"
          subheader="Set your properties as unavailable when you are not willing to sell."
        />
        <br />
        <Card.Group itemsPerRow={3}>{this.renderProperties()}</Card.Group>
        <Header
          as="h2"
          content="Approval"
          subheader="Set approval for all on this contract so that anyone can buy your properties"
        />
        <h4>
          Current approval status: {this.props.isApproved ? "true" : "false"}
        </h4>
        <Button
          loading={this.state.approvalLoading}
          primary
          onClick={() => this.setApproval(true)}
        >
          Set Approval for All
        </Button>
        <Button
          loading={this.state.rejectionLoading}
          basic
          color="red"
          onClick={() => this.setApproval(false)}
        >
          Reject for All
        </Button>
      </Layout>
    );
  }
}

export default PropertyOwned;
