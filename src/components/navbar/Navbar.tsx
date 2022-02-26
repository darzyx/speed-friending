import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InfoModal from "./InfoModal";
import NavButton from "../blocks/NavButton";
import StyledIcon from "../blocks/StyledIcon";
import SettingsModal from "./SettingsModal";

const Navbar = ({
  inverted,
  setInverted,
  setMuted,
  muted,
}: {
  inverted: boolean;
  setInverted: (inverted: boolean) => void;
  setMuted: (muted: boolean) => void;
  muted: boolean;
}) => {
  const navigate = useNavigate();

  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <NavButton onClick={() => navigate("/home")}>
        <StyledIcon name="home" />
      </NavButton>
      <div>
        <NavButton
          margin="0 10px 0 0"
          onClick={() => setOpenSettingsModal(true)}
        >
          <StyledIcon name="setting" />
        </NavButton>
        <NavButton onClick={() => setOpenInfoModal(true)}>
          <StyledIcon name="question circle" />
        </NavButton>
      </div>
      <SettingsModal
        openSettingsModal={openSettingsModal}
        setOpenSettingsModal={setOpenSettingsModal}
        setInverted={setInverted}
        inverted={inverted}
        setMuted={setMuted}
        muted={muted}
      />
      <InfoModal
        openInfoModal={openInfoModal}
        setOpenInfoModal={setOpenInfoModal}
        inverted={inverted}
      />
    </div>
  );
};

export default Navbar;
