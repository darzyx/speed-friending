import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import InfoModal from "./InfoModal";

const Navbar = () => {
  const navigate = useNavigate();

  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button onClick={() => navigate("/")} secondary>
        <Icon name="home" /> Home
      </Button>
      <Button onClick={() => setOpenInfoModal(true)} secondary>
        <Icon name="info circle" /> Info
      </Button>
      <InfoModal
        openInfoModal={openInfoModal}
        setOpenInfoModal={setOpenInfoModal}
      />
    </div>
  );
};

export default Navbar;
