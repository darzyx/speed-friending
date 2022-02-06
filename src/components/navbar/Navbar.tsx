import { Icon, Menu } from "semantic-ui-react";
import { Link, Location, useLocation } from "react-router-dom";

import NewModal from "./NewModal";

type NavbarPropsType = {
  openNewModal: boolean;
  setOpenNewModal: (arg: boolean) => void;
};
const Navbar = ({ openNewModal, setOpenNewModal }: NavbarPropsType) => {
  const location: Location = useLocation();

  return (
    <Menu inverted secondary>
      <Menu.Item
        as={Link}
        to="/"
        name="home"
        active={location.pathname === "/"}
      >
        <Icon name="home" /> Home
      </Menu.Item>

      <Menu.Menu position="right">
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
