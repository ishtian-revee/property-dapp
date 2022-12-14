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
        <a className="item"><h5>Owned Properties</h5></a>
      </Link>

      <Link route="/properties/history">
        <a className="item"><h5>Purchase History</h5></a>
      </Link>

      <Link route="/properties/add">
        <a className="item"><h5>Add Property</h5></a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/tokens/purchase">
          <a className="item"><h5>Get AWT</h5></a>
        </Link>
        <Link route="/tokens/transfers">
          <a className="item"><h5>AWT Transfers</h5></a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
