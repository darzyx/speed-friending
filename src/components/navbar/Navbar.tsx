import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InfoModal from "./InfoModal";
import NavButton from "../blocks/NavButton";
import StyledIcon from "../blocks/StyledIcon";

const Navbar = ({
  inverted,
  setInverted,
  playAlarmSfx,
  setMute,
  mute,
}: {
  inverted: boolean;
  setInverted: (inverted: boolean) => void;
  playAlarmSfx: () => void;
  setMute: (muted: boolean) => void;
  mute: boolean;
}) => {
  const navigate = useNavigate();

  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <NavButton onClick={() => navigate("/home")} margin="0 10px 0 0">
          <StyledIcon name="home" />
        </NavButton>
        <NavButton onClick={() => setOpenInfoModal(true)}>
          <StyledIcon name="question circle" />
        </NavButton>
      </div>
      <div>
        <NavButton
          onClick={() => {
            if (mute) playAlarmSfx();
            setMute(!mute);
          }}
          margin="0 10px 0 0"
        >
          <StyledIcon name={mute ? "mute" : "unmute"} />
        </NavButton>
        <NavButton onClick={() => setInverted(!inverted)}>
          <StyledIcon name={inverted ? "lightbulb outline" : "lightbulb"} />
        </NavButton>
      </div>
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
