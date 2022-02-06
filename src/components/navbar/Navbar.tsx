import { Button, Icon, Menu } from "semantic-ui-react";
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
      <Button
        as={Link}
        to="/"
        icon
        labelPosition="left"
        active={location.pathname === "/"}
        color="grey"
      >
        <Icon name="home" /> Home
      </Button>
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
