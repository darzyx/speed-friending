import { useState } from "react";
import { Menu } from "semantic-ui-react";

import NewModal from "./NewModal";

const Navbar = () => {
  const [openNewModal, setOpenNewModal] = useState(false);

  return (
    <Menu secondary inverted>
      <Menu.Item
        name="home"
        active={false}
        onClick={() => console.log("clicked")}
      />
      <Menu.Item
        name="my session"
        active={false}
        onClick={() => console.log("clicked")}
      />
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
