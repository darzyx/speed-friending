import { useState } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import InfoModal from "./InfoModal";

const Navbar = () => {
  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <Menu inverted secondary>
      <Menu.Item as={Link} to="/" name="home" active>
        <Icon name="home" /> Home
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="info" onClick={() => setOpenInfoModal(true)} active>
          <Icon name="info circle" /> Info
          <InfoModal
            openInfoModal={openInfoModal}
            setOpenInfoModal={setOpenInfoModal}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
