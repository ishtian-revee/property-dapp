import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import registry from "../ethereum/registry";
import property from "../ethereum/property";
import { Router } from "../routes";

class PropertyCard extends Component {
  state = {
    isLoading: false,
  };

  buyProperty = async () => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    if (parseInt(this.props.balance) < parseInt(this.props.price)) {
      this.setState({
        isLoading: false,
      });
      this.props.onError("You have insufficient AWT");
    } else {
      this.props.onError(null);
      try {
        await registry.methods.buyProperty(this.props.id).send({
          from: this.props.myAccount,
        });
        Router.pushRoute(`/`);
      } catch (err) {
        console.log("ERROR: " + err.message);
        this.props.onError(err.message);
      }
      this.setState({ isLoading: false });
    }
  };

  setAvailable = async () => {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    try {
      await registry.methods
        .setPropertyAvailability(this.props.id, !this.props.isAvailable)
        .send({
          from: this.props.myAccount,
        });
      Router.pushRoute(`/properties/owned`);
    } catch (err) {
      this.props.onError(err.message);
    }
    this.setState({ isLoading: false });
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
    if (isForOwner) {
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
              Status:{" "}
              <strong>{isAvailable ? "Available" : "Unavailable"}</strong>
              <br />
              <br />
              Owner: <strong>{owner}</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button
                basic
                loading={this.state.isLoading}
                color={isAvailable ? "teal" : "purple"}
                onClick={this.setAvailable}
              >
                Set as {isAvailable ? "Unavailable" : "Available"}
              </Button>
            </div>
          </Card.Content>
        </Card>
      );
    } else {
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
              <Button
                primary
                loading={this.state.isLoading}
                onClick={this.buyProperty}
              >
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
