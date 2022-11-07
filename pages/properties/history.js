import React, { Component } from "react";
import { Header, Message, Loader, Grid } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import registry from "../../ethereum/registry";

class PurchaseHistory extends Component {

  render() {
    return (
      <Layout>
        <Grid relaxed>
          <Grid.Row style={{ marginTop: "10px" }}>
            <Grid.Column>
              <Header
                as="h2"
                content="Purchase History"
                subheader="List of all the property NFT transactions"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default PurchaseHistory;
