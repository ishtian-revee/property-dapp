import React, { Component } from "react";
import { Table } from "semantic-ui-react";

class AWTPurchaseRow extends Component {
  render() {
    const { Row, Cell } = Table;
    const { type, buyer, amount, time } = this.props;

    return (
      <Row positive={type === 'BUY'} negative={type === 'SELL'}>
        <Cell>{type}</Cell>
        <Cell>{buyer}</Cell>
        <Cell>{amount} AWT</Cell>
        <Cell>{time}</Cell>
      </Row>
    );
  }
}

export default AWTPurchaseRow;
