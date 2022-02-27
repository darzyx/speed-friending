import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";

import InfoModal from "./InfoModal";
import NavButton from "../blocks/NavButton";
import StyledIcon from "../blocks/StyledIcon";

// @ts-ignore Cannot find module or its corresponding type declarations.ts(2307)
import muteSfx from "../../media/mute.mp3";
// @ts-ignore Cannot find module or its corresponding type declarations.ts(2307)
import unmuteSfx from "../../media/unmute.mp3";

const Navbar = ({
  inverted,
  handleToggleInverted,
  setMute,
  mute,
}: {
  inverted: boolean;
  handleToggleInverted: () => void;
  setMute: (muted: boolean) => void;
  mute: boolean;
}) => {
  const navigate = useNavigate();

  const [openInfoModal, setOpenInfoModal] = useState(false);

  const [playMuteSfx] = useSound(muteSfx);
  const [playUnmuteSfx] = useSound(unmuteSfx);
  const handleToggleMute = () => {
    if (mute) playUnmuteSfx();
    if (!mute) playMuteSfx();
    setMute(!mute);
  };

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
        <NavButton onClick={handleToggleMute} margin="0 10px 0 0">
          <StyledIcon name={mute ? "volume off" : "volume up"} />
        </NavButton>
        <NavButton onClick={handleToggleInverted}>
          <StyledIcon name={inverted ? "moon" : "sun"} />
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
