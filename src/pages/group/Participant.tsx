import { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";

import CenterMiddle from "../../components/blocks/CenterMiddle";
import theme from "../../styles/theme";
import { getParticipantColor } from "./utils";

type ParticipantPropsType = {
  n: number;
  top?: boolean;
  dropouts: number[];
  onToggleDropoutStatus?: (n: number) => void;
};
const Participant = ({
  n,
  top,
  dropouts,
  onToggleDropoutStatus,
}: ParticipantPropsType) => {
  const [hide, setHide] = useState(dropouts.includes(n));
  const needsClickHandler = onToggleDropoutStatus || (hide && n !== 0);
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
      {...(needsClickHandler && { onClick: handleClick })}
    >
      {n === 0 ? (
        <Icon name="ban" size="large" style={{ margin: "0" }} />
      ) : hide ? (
        <Icon name="remove user" size="large" style={{ margin: "0" }} />
      ) : (
        n
      )}
    </CenterMiddle>
  );
};

export default Participant;
