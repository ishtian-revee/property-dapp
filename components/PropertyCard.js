import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import registry from "../ethereum/registry";
import property from "../ethereum/property";

class PropertyCard extends Component {
  buyProperty = async () => {
    try {
      await registry.methods.buyProperty(this.props.id).send({
        from: this.props.myAccount,
      });
    } catch (err) {
      console.log("ERROR: " + err.message);
    }
  };

  render() {
    const {
      id,
      price,
      location,
      size,
      isAvailable,
      myAccount,
      owner,
      isForOwner,
    } = this.props;
    console.log("My account: " + myAccount);
    console.log("Owner: " + owner);
    if (isForOwner) {
      if (owner === myAccount) {
        return (
          <Card>
            <Card.Content style={{ overflowWrap: "break-word" }}>
              <Card.Header>Property #{id}</Card.Header>
              <Card.Meta>{location}</Card.Meta>
              <Card.Description>
                Size <strong>{size} Square Feet</strong>
                <br />
                Price: <strong>{price} AWT</strong>
                <br />
                <br />
                Owner: <strong>{owner}</strong>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button basic color="teal">
                  Set as Unavailable
                </Button>
              </div>
            </Card.Content>
          </Card>
        );
      }
    } else {
      if (owner !== myAccount) {
        return (
          <Card>
            <Card.Content style={{ overflowWrap: "break-word" }}>
              <Card.Header>Property #{id}</Card.Header>
              <Card.Meta>{location}</Card.Meta>
              <Card.Description>
                Size <strong>{size} Square Feet</strong>
                <br />
                Price: <strong>{price} AWT</strong>
                <br />
                <br />
                Owner: <strong>{owner}</strong>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button primary onClick={this.buyProperty}>
                  Buy Property
                </Button>
              </div>
            </Card.Content>
          </Card>
        );
      }
    }
  }
}

export default PropertyCard;
