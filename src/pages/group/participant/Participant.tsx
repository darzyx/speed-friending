import { memo, useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";

import CenterMiddle from "../../../components/blocks/CenterMiddle";
import theme from "../../../styles/theme";
import { getIsRoundDropout, getParticipantColor } from "../utils";
import DropoutModal from "./DropoutModal";
import PlaceholderModal from "./PlaceholderModal";
import NoPartnerModal from "./NoPartnerModal";
import ParticipantModal from "./ParticipantModal";
import { dropoutsType } from "../../../types/group";

type ParticipantPropsType = {
  nParticipant: number;
  top?: boolean;
  nPartner: number;
  onToggleDropoutStatus?: (n: number) => void;
  dropouts: dropoutsType;
  roundNumber: number;
  darkMode: boolean;
};
const Participant = ({
  nParticipant,
  top,
  nPartner,
  onToggleDropoutStatus,
  dropouts,
  roundNumber,
  darkMode,
}: ParticipantPropsType) => {
  const [openPlaceholderModal, setOpenPlaceholderModal] = useState(false);
  const [openDropoutModal, setOpenDropoutModal] = useState(false);
  const [openNoPartnerModal, setOpenNoPartnerModal] = useState(false);
  const [openParticipantModal, setOpenParticipantModal] = useState(false);
  const [isDropout, setIsDropout] = useState(
    getIsRoundDropout({ nParticipant, roundNumber, dropouts })
  );
  const [partnerIsDropout, setPartnerIsDropout] = useState(
    getIsRoundDropout({ nParticipant: nPartner, roundNumber, dropouts })
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
    if (getIsRoundDropout({ nParticipant, roundNumber, dropouts })) {
      setIsDropout(true);
    } else {
      setIsDropout(false);
    }
  }, [nParticipant, roundNumber, dropouts]);

  useEffect(() => {
    if (getIsRoundDropout({ nParticipant: nPartner, roundNumber, dropouts })) {
      setPartnerIsDropout(true);
    } else {
      setPartnerIsDropout(false);
    }
  }, [nPartner, roundNumber, dropouts]);

  return (
    <div>
      <CenterMiddle
        onClick={handleClick}
        style={{
          height: "50px",
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
        darkMode={darkMode}
      />
      <DropoutModal
        nParticipant={nParticipant}
        nPartner={nPartner}
        openDropoutModal={openDropoutModal}
        setOpenDropoutModal={setOpenDropoutModal}
        dropouts={dropouts}
        darkMode={darkMode}
      />
      <NoPartnerModal
        nParticipant={nParticipant}
        nPartner={nPartner}
        openNoPartnerModal={openNoPartnerModal}
        setOpenNoPartnerModal={setOpenNoPartnerModal}
        dropouts={dropouts}
        darkMode={darkMode}
      />
      <ParticipantModal
        nParticipant={nParticipant}
        nPartner={nPartner}
        openParticipantModal={openParticipantModal}
        setOpenParticipantModal={setOpenParticipantModal}
        darkMode={darkMode}
      />
    </div>
  );
};

export default memo(Participant);
