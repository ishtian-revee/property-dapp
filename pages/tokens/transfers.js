import React, { Component } from "react";
import { Header, Message, Loader, Grid, Table } from "semantic-ui-react";
import Layout from "../../components/Layout";
import vendor from "../../ethereum/vendor";

class TokenTransfers extends Component {
  static async getInitialProps() {
    let purchases;
    try {
      purchases = await vendor.methods.getPurchases().call();
      console.log("awt purchases: " + purchases);
    } catch (err) {
      console.log("ERROR: " + err.message);
    }
    return {
      purchases,
    };
  }

  render() {
    const { Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <Header
          as="h2"
          content="AWT Transfers"
          subheader="List of all buying/selling AWT transfers"
        />

        <Table celled striped>
          <Table.Header>
            <Row>
              <HeaderCell>Purchase Type</HeaderCell>
              <HeaderCell>Buyer/Seller Account</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Date-Time</HeaderCell>
            </Row>
          </Table.Header>
        </Table>
      </Layout>
    );
  }
}

export default TokenTransfers;