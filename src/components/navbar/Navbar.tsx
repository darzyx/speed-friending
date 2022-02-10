import { useState } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Link, Location, useLocation } from "react-router-dom";

import NewModal from "./NewModal";
import InfoModal from "./InfoModal";

type NavbarPropsType = {
  openNewModal: boolean;
  setOpenNewModal: (arg: boolean) => void;
};
const Navbar = ({ openNewModal, setOpenNewModal }: NavbarPropsType) => {
  const location: Location = useLocation();

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
        <NewModal
          openNewModal={openNewModal}
          setOpenNewModal={setOpenNewModal}
          location={location}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
