import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";

class PropertyCard extends Component {
  render() {
    const {
      id,
      price,
      location,
      size,
      isAvailable,
      myAccount,
      owner,
    } = this.props;
    console.log("My account: " + myAccount);
    console.log("Owner: " + owner);
    if (owner !== myAccount) {
      return (
        <Card>
          <Card.Content>
            <Card.Header>Property #{id}</Card.Header>
            <Card.Meta>{location}</Card.Meta>
            <Card.Description>
              Size <strong>{size} Square Feet</strong>
              <br />
              Price: <strong>{price} AWT</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button primary disabled={!isAvailable} color="green">
                Buy Property
              </Button>
            </div>
          </Card.Content>
        </Card>
      );
    }
  }
}

export default PropertyCard;
