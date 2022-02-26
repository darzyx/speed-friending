import { useState } from "react";
import { Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

import InfoModal from "./InfoModal";
import NavButton from "../blocks/NavButton";

const Navbar = ({ darkMode }: { darkMode: boolean }) => {
  const navigate = useNavigate();

  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <NavButton onClick={() => navigate("/home")}>
        <Icon name="home" /> Home
      </NavButton>
      <NavButton onClick={() => setOpenInfoModal(true)}>
        <Icon name="info circle" /> Info
      </NavButton>
      <InfoModal
        openInfoModal={openInfoModal}
        setOpenInfoModal={setOpenInfoModal}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Navbar;
