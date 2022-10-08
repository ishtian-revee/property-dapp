import React, { Component } from "react";
import { Header, Button, Card } from "semantic-ui-react";
import Layout from "../components/Layout";

class PropertyIndex extends Component {
  render() {
    return (
      <Layout>
        <Header
          as="h2"
          content="Property Maketplace"
          subheader="Check for property location, size, price, and buy your property"
        />
        <Card.Group></Card.Group>
      </Layout>
    );
  }
}

export default PropertyIndex;
