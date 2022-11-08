import React, { Component } from "react";
import { Table } from "semantic-ui-react";

class PurchaseRow extends Component {
  render() {
    const { Row, Cell } = Table;
    const { id, owner, buyer, price, time } = this.props;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{owner}</Cell>
        <Cell>{buyer}</Cell>
        <Cell>{price} AWT</Cell>
        <Cell>{time}</Cell>
      </Row>
    );
  }
}

export default PurchaseRow;
