import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";

import InfoModal from "./InfoModal";
import NavButton from "../blocks/NavButton";
import StyledIcon from "../blocks/StyledIcon";
import SettingsModal from "./SettingsModal";

// @ts-ignore Cannot find module or its corresponding type declarations.ts(2307)
import alarmSfx from "../../media/alarm.ogg";

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

  const [play] = useSound(alarmSfx);

  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <NavButton onClick={() => navigate("/home")} margin="0 10px 0 0">
          <StyledIcon name="home" />
        </NavButton>
        <NavButton onClick={play}>
          <StyledIcon name="unmute" />
        </NavButton>
      </div>
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
      {openSettingsModal && (
        <SettingsModal
          openSettingsModal={openSettingsModal}
          setOpenSettingsModal={setOpenSettingsModal}
          setInverted={setInverted}
          inverted={inverted}
          setMuted={setMuted}
          muted={muted}
        />
      )}
      {openInfoModal && (
        <InfoModal
          openInfoModal={openInfoModal}
          setOpenInfoModal={setOpenInfoModal}
          inverted={inverted}
        />
      )}
    </div>
  );
};

export default Navbar;
