import React, { Component } from "react";
import { Header, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import registry from "../../ethereum/registry";
import { Router } from "../../routes";

class PropertyAdd extends Component {
  state = {
    price: "",
    location: "",
    size: "",
    loading: false,
    errorMessage: "",
  };

  addProperty = async () => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    const { price, location, size } = this.state;

    if (!price) {
      this.setState({ loading: false, errorMessage: "Please insert price." });
      return false;
    }
    if (!location) {
      this.setState({
        loading: false,
        errorMessage: "Please insert location.",
      });
      return false;
    }
    if (!size) {
      this.setState({ loading: false, errorMessage: "Please insert size." });
      return false;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      console.log("My account: " + accounts[0]);
      await registry.methods
        .addProperty(this.state.price, this.state.location, this.state.size)
        .send({
          from: accounts[0],
        });
        Router.pushRoute(`/properties/owned`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Header
          as="h2"
          content="Add New Property"
          subheader="Insert your property price (in AWT), location and size (in square feet) and add it as a NFT"
        />
        <br />
        <Form onSubmit={this.addProperty} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Price (in AWT)</label>
            <Input
              label="AWT"
              labelPosition="right"
              value={this.state.price}
              onChange={(event) => this.setState({ price: event.target.value })}
            />
            <br />
            <br />
            <label>Location</label>
            <Input
              value={this.state.location}
              onChange={(event) =>
                this.setState({ location: event.target.value })
              }
            />
            <br />
            <br />
            <label>Size (in sq.)</label>
            <Input
              value={this.state.size}
              onChange={(event) => this.setState({ size: event.target.value })}
            />
          </Form.Field>
          <Button loading={this.state.loading} primary type="submit">
            Add Property
          </Button>
          <Message error header="Oops!" content={this.state.errorMessage} />
        </Form>
      </Layout>
    );
  }
}

export default PropertyAdd;
