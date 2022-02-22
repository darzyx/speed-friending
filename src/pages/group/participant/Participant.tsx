import { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";

import CenterMiddle from "../../../components/blocks/CenterMiddle";
import theme from "../../../styles/theme";
import { getParticipantColor } from "../utils";
import DropoutModal from "./DropoutModal";
import PlaceholderModal from "./PlaceholderModal";
import NoPartnerModal from "./NoPartnerModal";

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
  const [openPlaceholderModal, setOpenPlaceholderModal] = useState(false);
  const [openDropoutModal, setOpenDropoutModal] = useState(false);
  const [openNoPartnerModal, setOpenNoPartnerModal] = useState(false);
  const [isDropout, setIsDropout] = useState(dropouts.includes(n));
  const [partnerIsDropout, setPartnerIsDropout] = useState(
    dropouts.includes(partner)
  );
  const hasAction =
    (n === 0 && !openPlaceholderModal) ||
    onToggleDropoutStatus ||
    (isDropout && !openDropoutModal) ||
    ((partnerIsDropout || partner === 0) && !openNoPartnerModal);
  const handleClick = () => {
    if (n === 0 && !openPlaceholderModal) {
      setOpenPlaceholderModal(true);
    } else if (onToggleDropoutStatus) {
      onToggleDropoutStatus(n);
    } else if (isDropout && !openDropoutModal) {
      setOpenDropoutModal(true);
    } else if ((partnerIsDropout || partner === 0) && !openNoPartnerModal) {
      setOpenNoPartnerModal(true);
    }
  };

  // Keep up to date when admin changes dropout status:
  useEffect(() => {
    if (dropouts.includes(n)) {
      setIsDropout(true);
    } else {
      setIsDropout(false);
    }
  }, [dropouts, n]);

  useEffect(() => {
    if (dropouts.includes(partner)) {
      setPartnerIsDropout(true);
    } else {
      setPartnerIsDropout(false);
    }
  }, [dropouts, partner]);

  return (
    <div>
      <CenterMiddle
        style={{
          height: "50px",
          margin: "0",
          padding: "0",
          fontWeight: "bold",
          fontSize: "22px",
          borderRadius: "0 0 5px 5px",
          boxSizing: "border-box",
          userSelect: "none",
          cursor: hasAction ? "pointer" : "auto",
          color: theme.color.one,
          backgroundColor: getParticipantColor(n),
          border: `1px solid ${theme.color.two}`,
          ...((isDropout || n === 0) && {
            color: theme.color.text,
            backgroundColor: theme.color.three,
          }),
          ...(top && { borderRadius: "5px 5px 0 0" }),
        }}
        {...(hasAction && { onClick: handleClick })}
      >
        {n === 0 ? (
          <Icon name="ban" size="large" style={{ margin: "0" }} />
        ) : isDropout ? (
          <Icon name="remove user" size="large" style={{ margin: "0" }} />
        ) : (
          n
        )}
      </CenterMiddle>
      <PlaceholderModal
        partner={partner}
        openPlaceholderModal={openPlaceholderModal}
        setOpenPlaceholderModal={setOpenPlaceholderModal}
      />
      <DropoutModal
        n={n}
        partner={partner}
        openDropoutModal={openDropoutModal}
        setOpenDropoutModal={setOpenDropoutModal}
      />
      <NoPartnerModal
        n={n}
        partner={partner}
        openNoPartnerModal={openNoPartnerModal}
        setOpenNoPartnerModal={setOpenNoPartnerModal}
      />
    </div>
  );
};

export default Participant;
