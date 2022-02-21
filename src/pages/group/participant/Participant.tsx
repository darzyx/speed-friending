import { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";

import CenterMiddle from "../../../components/blocks/CenterMiddle";
import theme from "../../../styles/theme";
import { getParticipantColor } from "../utils";
import ZeroModal from "./ZeroModal";

type ParticipantPropsType = {
  n: number;
  top?: boolean;
  partner: number;
  dropouts: number[];
  onToggleDropoutStatus?: (n: number) => void;
};
const Participant = ({
  n,
  top,
  partner,
  dropouts,
  onToggleDropoutStatus,
}: ParticipantPropsType) => {
  const [openZeroModal, setOpenZeroModal] = useState(false);
  const [hide, setHide] = useState(dropouts.includes(n));
  const handleClick = () => {
    if (n === 0 && !openZeroModal) {
      setOpenZeroModal(true);
    } else {
      if (onToggleDropoutStatus) {
        onToggleDropoutStatus(n);
      } else if (hide) {
        setHide(false);
        setTimeout(() => setHide(true), 1000);
      }
    }
  };

  useEffect(() => {
    if (dropouts.includes(n)) {
      setHide(true);
    } else {
      setHide(false);
    }
  }, [dropouts, n]);

  return (
    <div>
      <CenterMiddle
        onClick={handleClick}
        style={{
          height: "50px",
          margin: "0",
          padding: "0",
          fontWeight: "bold",
          fontSize: "22px",
          borderRadius: "0 0 5px 5px",
          boxSizing: "border-box",
          userSelect: "none",
          cursor: "pointer",
          color: theme.color.one,
          backgroundColor: getParticipantColor(n),
          border: `1px solid ${theme.color.two}`,
          ...((hide || n === 0) && {
            color: theme.color.text,
            backgroundColor: theme.color.three,
          }),
          ...(top && { borderRadius: "5px 5px 0 0" }),
        }}
      >
        {n === 0 ? (
          <Icon name="ban" size="large" style={{ margin: "0" }} />
        ) : hide ? (
          <Icon name="remove user" size="large" style={{ margin: "0" }} />
        ) : (
          n
        )}
      </CenterMiddle>
      <ZeroModal
        partner={partner}
        openZeroModal={openZeroModal}
        setOpenZeroModal={setOpenZeroModal}
      />
    </div>
  );
};

export default Participant;
