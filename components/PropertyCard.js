import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import registry from "../ethereum/registry";
import property from "../ethereum/property";
import { Router } from "../routes";

class PropertyCard extends Component {
  state = {
    isLoading: false,
    errorMessage: "",
  };

  buyProperty = async () => {
    event.preventDefault();
    this.setState({
      isLoading: true,
      errorMessage: "",
    });
    try {
      await registry.methods.buyProperty(this.props.id).send({
        from: this.props.myAccount,
      });
      Router.pushRoute(`/`);
    } catch (err) {
      console.log("ERROR: " + err.message);
      this.setState({ errorMessage: err.message });
    }
    this.setState({ isLoading: false, errorMessage: "" });
  };

  setAvailable = async () => {
    event.preventDefault();
    this.setState({
      isLoading: true,
      errorMessage: "",
    });
    try {
      await registry.methods
        .setPropertyAvailability(this.props.id, !this.props.isAvailable)
        .send({
          from: this.props.myAccount,
        });
      Router.pushRoute(`/properties/owned`);
    } catch (err) {
      console.log("ERROR: " + err.message);
      this.setState({ errorMessage: err.message });
    }
    this.setState({ isLoading: false, errorMessage: "" });
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
        this.props.onGetProperties(true);
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
      }
    } else {
      if (owner !== myAccount && isAvailable) {
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
}

export default PropertyCard;
