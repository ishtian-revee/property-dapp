import React, { Component } from "react";
import { Header, Message, Loader, Grid, Table } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import registry from "../../ethereum/registry";
import PurchaseRow from "../../components/PurchaseRow";

class PurchaseHistory extends Component {
  static async getInitialProps() {
    let purchases;

    try {
      purchases = await registry.methods.getPurchases().call();
      console.log("purchases: " + purchases);
    } catch (err) {
      console.log("ERROR: " + err.message);
    }
    return {
      purchases,
    };
  }

  renderRows() {
    return this.props.purchases.map((purchase, index) => {
      return (
        <PurchaseRow
          key={index}
          id={purchase.pid}
          owner={purchase.owner}
          buyer={purchase.buyer}
          price={purchase.price}
          time={purchase.time}
        />
      );
    });
  }

  render() {
    const { Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <Header
          as="h2"
          content="Purchase History"
          subheader="List of all the property NFT transactions"
        />

        <Table>
          <Table.Header>
            <Row>
              <HeaderCell>Property ID</HeaderCell>
              <HeaderCell>Owner</HeaderCell>
              <HeaderCell>Buyer</HeaderCell>
              <HeaderCell>Price</HeaderCell>
              <HeaderCell>Time</HeaderCell>
            </Row>
          </Table.Header>
          <Body>{this.renderRows()}</Body>
        </Table>
      </Layout>
    );
  }
}

export default PurchaseHistory;
