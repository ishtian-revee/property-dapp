import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";

class PropertyCard extends Component {
  render() {
    const { id, price, location, size, isAvailable } = this.props;
    return (
      <Card>
        <Card.Content>
          <Card.Header>Property #{this.id}</Card.Header>
          <Card.Meta>{this.location}</Card.Meta>
          <Card.Description>
            Size <strong>{this.size} Square Feet</strong>
            <br />
            Price: <strong>{this.price} AWT</strong>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button primary disabled={this.isAvailable} color="green">
              Buy Property
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}
