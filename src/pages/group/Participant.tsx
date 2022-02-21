import { useEffect, useState } from "react";
import { Icon, Popup } from "semantic-ui-react";

import CenterMiddle from "../../components/blocks/CenterMiddle";
import theme from "../../styles/theme";
import { getParticipantColor } from "./utils";

type ParticipantPropsType = {
  n: number;
  top?: boolean;
  partner: number;
  dropouts: number[];
  onToggleDropoutStatus?: (n: number) => void;
  modalView?: boolean;
};
const Participant = ({
  n,
  top,
  partner,
  dropouts,
  onToggleDropoutStatus,
  modalView = false,
}: ParticipantPropsType) => {
  const [hide, setHide] = useState(dropouts.includes(n));
  const handleClick = () => {
    if (onToggleDropoutStatus) {
      onToggleDropoutStatus(n);
    } else if (hide && n !== 0) {
      setHide(false);
      setTimeout(() => setHide(true), 1000);
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
    <Popup
      inverted
      hideOnScroll
      size="small"
      disabled={Boolean(onToggleDropoutStatus) || modalView}
      trigger={
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
        </div>
      }
    >
      <Popup.Header>{n === 0 ? "Placeholder" : n}</Popup.Header>
      <Popup.Content style={{ maxWidth: "100px" }}>
        {n === 0
          ? "Placeholder"
          : partner === 0
          ? `No partner this round. ${n} takes a break`
          : dropouts.includes(n)
          ? "Dropped out"
          : dropouts.includes(partner)
          ? `Partner dropped out. ${n} takes a break this round`
          : `Partnered with number ${partner}`}
      </Popup.Content>
    </Popup>
  );
};

export default Participant;
