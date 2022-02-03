import { Menu, Button, Icon } from "semantic-ui-react";

const Navbar = () => (
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
        <Button onClick={() => console.log("clicked")}>
          New <Icon name="plus" style={{ marginLeft: "5px" }} />
        </Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default Navbar;
