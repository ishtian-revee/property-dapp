import React, { Component } from "react";
import { Header, Button, Card, Message, Loader, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import PropertyCard from "../../components/PropertyCard";
import web3 from "../../ethereum/web3";
import registry from "../../ethereum/registry";
import property from "../../ethereum/property";
import { Router } from "../../routes";

class PropertyOwned extends Component {
  state = {
    isLoading: false,
    loadingText: "",
    errorMessage: "",
    hasProperties: false,
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

  approveAll = async () => {
    event.preventDefault();
    if (this.props.isApproved) {
      this.setState({ errorMessage: "Already approved for all." });
    } else {
      this.setState({
        isLoading: true,
        loadingText: "Approving this contract...",
        errorMessage: "",
      });

      try {
        await property.methods
          .setApprovalForAll(registry.options.address, true)
          .send({
            from: this.props.myAccount,
          });
        Router.pushRoute(`/properties/owned`);
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ isLoading: false, errorMessage: "" });
    }
  };

  rejectAll = async () => {
    event.preventDefault();
    if (this.props.isApproved) {
      this.setState({
        isLoading: true,
        loadingText: "Rejecting this contract...",
        errorMessage: "",
      });

      try {
        await property.methods
          .setApprovalForAll(registry.options.address, false)
          .send({
            from: this.props.myAccount,
          });
        Router.pushRoute(`/properties/owned`);
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ isLoading: false, errorMessage: "" });
    } else {
      this.setState({ errorMessage: "Already rejected for all." });
    }
  };

  renderProperties() {
    return this.props.properties
      .filter((prop) => prop.owner == this.props.myAccount)
      .map((item, index) => {
        console.log("Owned item: " + item);
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
            isForOwner={true}
          />
        );
      });
  }

  render() {
    return (
      <Layout>
        <Grid relaxed>
          <Grid.Row style={{ marginTop: "10px" }}>
            <Grid.Column>
              <Header
                as="h2"
                content="My Owned Properties"
                subheader="Set your properties as unavailable when you are not willing to sell."
              />
              <Card.Group itemsPerRow={3}>{this.renderProperties()}</Card.Group>
              <Header
                as="h2"
                content="Approval"
                subheader="Set approval for all on this contract so that anyone can buy your properties"
              />
              <h4>
                Current approval status:
                <strong>
                  {this.props.isApproved ? " Approved" : " Not approved"}
                </strong>
              </h4>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={4}>
              <Button fluid primary onClick={this.approveAll}>
                Set Approval for All
              </Button>
            </Grid.Column>
            <Grid.Column width={4}>
              <Button fluid basic color="red" onClick={this.rejectAll}>
                Reject for All
              </Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              {this.state.isLoading ? (
                <Loader active inline="centered">
                  {this.state.loadingText}
                </Loader>
              ) : null}
              {this.state.errorMessage ? (
                <Message
                  error
                  header="Oops!"
                  content={this.state.errorMessage}
                />
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default PropertyOwned;
