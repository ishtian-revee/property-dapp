import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

const Header = () => {
  return (
    <Menu style={{ marginTop: "20px" }}>
      <Link route="/">
        <a className="item"><h3>Property DApp</h3></a>
      </Link>

      <Link route="/properties/owned">
        <a className="item">Owned Properties</a>
      </Link>

      <Link route="/properties/add">
        <a className="item">Add Property</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/tokens/purchase">
          <a className="item">Buy AWT!</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
