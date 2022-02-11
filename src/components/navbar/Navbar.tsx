import { useState } from "react";
import { Button, Icon, Menu } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import InfoModal from "./InfoModal";

const Navbar = () => {
  const navigate = useNavigate();

  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <Menu inverted secondary>
      <Menu.Item>
        <Button onClick={() => navigate("/")} secondary>
          <Icon name="home" /> Home
        </Button>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Button onClick={() => setOpenInfoModal(true)} secondary>
            <Icon name="info circle" /> Info
          </Button>
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
