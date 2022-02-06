import { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

import { SessionWithIdType } from "../../types/session";
import NewModal from "./NewModal";

type NavbarPropsType = { userSession: SessionWithIdType };
const Navbar = ({ userSession }: NavbarPropsType) => {
  const location = useLocation();
  const [openNewModal, setOpenNewModal] = useState(false);

  const hasUserSession = userSession?.id?.length > 0;

  return (
    <Menu secondary inverted>
      <Menu.Item
        as={Link}
        name="home"
        to="/"
        active={location.pathname === "/"}
      />
      {hasUserSession && (
        <Menu.Item
          as={Link}
          name="my session"
          to="/"
          active={location.pathname === "/"}
        />
      )}
      <Menu.Menu position="right">
        <Menu.Item>
          <NewModal
            openNewModal={openNewModal}
            setOpenNewModal={setOpenNewModal}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
