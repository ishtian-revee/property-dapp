import React, { Component } from "react";
import { Header, Message, Loader, Grid, Table } from "semantic-ui-react";
import Layout from "../../components/Layout";
import vendor from "../../ethereum/vendor";
import AWTPurchaseRow from "../../components/AWTPurchaseRow";

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

  renderRows() {
    return this.props.purchases
      .map((purchase, index) => {
        var t = new Date(purchase.time * 1000);
        var hours = t.getHours();
        var minutes = t.getMinutes();
        var newformat = t.getHours() >= 12 ? "PM" : "AM";

        // Find current hour in AM-PM Format
        hours = hours % 12;
        // To display "0" as "12"
        hours = hours ? hours : 12;
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        var formatted =
          t.toString().split(" ")[0] +
          ", " +
          ("0" + t.getDate()).slice(-2) +
          "/" +
          ("0" + (t.getMonth() + 1)).slice(-2) +
          "/" +
          t.getFullYear() +
          " - " +
          hours +
          ":" +
          minutes +
          " " +
          newformat;

        return (
          <AWTPurchaseRow
            key={index}
            type={purchase.purchaseType}
            buyer={purchase.buyer}
            amount={purchase.amount}
            time={formatted}
          />
        );
      })
      .reverse();
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

        <Table celled>
          <Table.Header>
            <Row>
              <HeaderCell>Purchase Type</HeaderCell>
              <HeaderCell>Buyer/Seller Account</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Date-Time</HeaderCell>
            </Row>
          </Table.Header>
          <Body>{this.renderRows()}</Body>
        </Table>
      </Layout>
    );
  }
}

export default TokenTransfers;
