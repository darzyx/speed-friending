import { Popup } from "semantic-ui-react";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import theme from "../../styles/theme";
import { getParticipantColor } from "./utils";

type ParticipantPropsType = {
  n: number;
  top?: boolean;
  partner: number;
  dropouts: number[];
  currentTimeInSeconds: number;
  onToggleDropoutStatus?: (n: number) => void;
  modalView?: boolean;
};
const Participant = ({
  n,
  top,
  partner,
  dropouts,
  currentTimeInSeconds,
  onToggleDropoutStatus,
  modalView = false,
}: ParticipantPropsType) => {
  const oddTime = currentTimeInSeconds % 2 === 0;
  const hiddenMode = n === 0 || (dropouts.includes(n) && oddTime);

  return (
    <Popup
      inverted
      hideOnScroll
      size="small"
      disabled={Boolean(onToggleDropoutStatus) || modalView}
      trigger={
        <div>
          <CenterMiddle
            style={{
              height: "50px",
              margin: "0",
              fontWeight: "bold",
              fontSize: "22px",
              borderRadius: "0 0 5px 5px",
              boxSizing: "border-box",
              userSelect: "none",
              cursor: "pointer",
              color: theme.color.one,
              backgroundColor: getParticipantColor(n),
              border: `1px solid ${theme.color.two}`,
              ...(hiddenMode && {
                color: theme.color.text,
                backgroundColor: theme.color.three,
              }),
              ...(top && { borderRadius: "5px 5px 0 0" }),
            }}
            {...(onToggleDropoutStatus && {
              onClick: () => onToggleDropoutStatus(n),
            })}
          >
            {hiddenMode ? "X" : n}
          </CenterMiddle>
        </div>
      }
    >
      <Popup.Header>{n}</Popup.Header>
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
