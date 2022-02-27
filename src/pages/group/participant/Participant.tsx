import { memo, useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";
import styled, { css } from "styled-components";

import { centerMiddleCSS } from "../../../components/blocks/CenterMiddle";
import { getIsRoundDropout, getParticipantColor } from "../utils";
import DropoutModal from "./DropoutModal";
import PlaceholderModal from "./PlaceholderModal";
import NoPartnerModal from "./NoPartnerModal";
import ParticipantModal from "./ParticipantModal";
import { dropoutsType } from "../../../types/group";

const participantDisplayCSS = css`
  ${centerMiddleCSS};
  height: 50px;
  font-weight: bold;
  font-size: 22px;
  box-sizing: border-box;
  user-select: none;
  cursor: pointer;
`;

type ParticipantDisplayPropsType = {
  top: boolean;
  dark: boolean;
  nParticipant: number;
};
const ParticipantDisplay = styled.div<ParticipantDisplayPropsType>`
  &&&& {
    ${participantDisplayCSS}
    border: 1px solid ${({ theme }) => theme.color.two};
    border-radius: ${({ top }) => {
      if (top) {
        return "5px 5px 0 0";
      } else {
        return "0 0 5px 5px";
      }
    }};
    color: ${({ dark }) => {
      if (dark) {
        return "rgb(255, 255, 255)";
      } else {
        return "rgb(9, 17, 24)";
      }
    }};
    background-color: ${({ dark, nParticipant }) => {
      if (dark) {
        return "rgb(44, 58, 73)";
      } else {
        return getParticipantColor(nParticipant);
      }
    }};
  }
`;

type ParticipantPropsType = {
  nParticipant: number;
  top?: boolean;
  nPartner: number;
  onToggleDropoutStatus?: (n: number) => void;
  dropouts: dropoutsType;
  roundNumber: number;
  inverted: boolean;
};
const Participant = ({
  nParticipant,
  top = false,
  nPartner,
  onToggleDropoutStatus,
  dropouts,
  roundNumber,
  inverted,
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
      <ParticipantDisplay
        onClick={handleClick}
        dark={isDropout || nParticipant === 0}
        nParticipant={nParticipant}
        top={top}
      >
        {nParticipant === 0 ? (
          <Icon
            inverted={inverted}
            name="ban"
            size="large"
            style={{ margin: "0" }}
          />
        ) : isDropout ? (
          <Icon
            inverted={inverted}
            name="remove user"
            size="large"
            style={{ margin: "0" }}
          />
        ) : (
          nParticipant
        )}
      </ParticipantDisplay>
      {openPlaceholderModal && (
        <PlaceholderModal
          nPartner={nPartner}
          openPlaceholderModal={openPlaceholderModal}
          setOpenPlaceholderModal={setOpenPlaceholderModal}
          inverted={inverted}
        />
      )}
      {openDropoutModal && (
        <DropoutModal
          nParticipant={nParticipant}
          nPartner={nPartner}
          openDropoutModal={openDropoutModal}
          setOpenDropoutModal={setOpenDropoutModal}
          dropouts={dropouts}
          inverted={inverted}
        />
      )}
      {openNoPartnerModal && (
        <NoPartnerModal
          nParticipant={nParticipant}
          nPartner={nPartner}
          openNoPartnerModal={openNoPartnerModal}
          setOpenNoPartnerModal={setOpenNoPartnerModal}
          dropouts={dropouts}
          inverted={inverted}
        />
      )}
      {openParticipantModal && (
        <ParticipantModal
          nParticipant={nParticipant}
          nPartner={nPartner}
          openParticipantModal={openParticipantModal}
          setOpenParticipantModal={setOpenParticipantModal}
          inverted={inverted}
        />
      )}
    </div>
  );
};

export default memo(Participant);
