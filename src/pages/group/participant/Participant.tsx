import { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";

import CenterMiddle from "../../../components/blocks/CenterMiddle";
import theme from "../../../styles/theme";
import { getParticipantColor } from "../utils";
import DropoutModal from "./DropoutModal";
import PlaceholderModal from "./PlaceholderModal";
import NoPartnerModal from "./NoPartnerModal";
import ParticipantModal from "./ParticipantModal";

type ParticipantPropsType = {
  nParticipant: number;
  top?: boolean;
  nPartner: number;
  dropouts: { participant_number: number; round_dropped_out: number }[];
  onToggleDropoutStatus?: (n: number) => void;
};
const Participant = ({
  nParticipant,
  top,
  nPartner,
  dropouts,
  onToggleDropoutStatus,
}: ParticipantPropsType) => {
  const dropoutNumbers = dropouts.map((d) => d.participant_number);

  const [openPlaceholderModal, setOpenPlaceholderModal] = useState(false);
  const [openDropoutModal, setOpenDropoutModal] = useState(false);
  const [openNoPartnerModal, setOpenNoPartnerModal] = useState(false);
  const [openParticipantModal, setOpenParticipantModal] = useState(false);
  const [isDropout, setIsDropout] = useState(
    dropoutNumbers.includes(nParticipant)
  );
  const [partnerIsDropout, setPartnerIsDropout] = useState(
    dropoutNumbers.includes(nPartner)
  );
  const handleClick = () => {
    if (nParticipant === 0 && !openPlaceholderModal) {
      setOpenPlaceholderModal(true);
    } else if (onToggleDropoutStatus) {
      onToggleDropoutStatus(nParticipant);
    } else if (isDropout && !openDropoutModal) {
      setOpenDropoutModal(true);
    } else if ((partnerIsDropout || nPartner === 0) && !openNoPartnerModal) {
      setOpenNoPartnerModal(true);
    } else {
      setOpenParticipantModal(true);
    }
  };

  // Keep up to date when admin changes dropout status:
  useEffect(() => {
    if (dropoutNumbers.includes(nParticipant)) {
      setIsDropout(true);
    } else {
      setIsDropout(false);
    }
  }, [dropoutNumbers, nParticipant]);

  useEffect(() => {
    if (dropouts.map((d) => d.participant_number).includes(nPartner)) {
      setPartnerIsDropout(true);
    } else {
      setPartnerIsDropout(false);
    }
  }, [dropouts, nPartner]);

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
          backgroundColor: getParticipantColor(nParticipant),
          border: `1px solid ${theme.color.two}`,
          ...((isDropout || nParticipant === 0) && {
            color: theme.color.text,
            backgroundColor: theme.color.three,
          }),
          ...(top && { borderRadius: "5px 5px 0 0" }),
        }}
      >
        {nParticipant === 0 ? (
          <Icon name="ban" size="large" style={{ margin: "0" }} />
        ) : isDropout ? (
          <Icon name="remove user" size="large" style={{ margin: "0" }} />
        ) : (
          nParticipant
        )}
      </CenterMiddle>
      <PlaceholderModal
        nPartner={nPartner}
        openPlaceholderModal={openPlaceholderModal}
        setOpenPlaceholderModal={setOpenPlaceholderModal}
      />
      <DropoutModal
        nParticipant={nParticipant}
        nPartner={nPartner}
        openDropoutModal={openDropoutModal}
        setOpenDropoutModal={setOpenDropoutModal}
      />
      <NoPartnerModal
        nParticipant={nParticipant}
        nPartner={nPartner}
        openNoPartnerModal={openNoPartnerModal}
        setOpenNoPartnerModal={setOpenNoPartnerModal}
      />
      <ParticipantModal
        nParticipant={nParticipant}
        nPartner={nPartner}
        openParticipantModal={openParticipantModal}
        setOpenParticipantModal={setOpenParticipantModal}
      />
    </div>
  );
};

export default Participant;
