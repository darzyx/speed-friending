import { useState } from "react";
import { Icon, Label } from "semantic-ui-react";

import StyledSegment from "../../../components/blocks/StyledSegment";

const CopyURLButton = ({ inverted }: { inverted: boolean }) => {
  const url = window.location.href;

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);

    const el = document.createElement("textarea");
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <StyledSegment
      inverted={inverted}
      style={{ maxWidth: "250px", paddingTop: "6px" }}
    >
      <Label
        onClick={handleClick}
        color="teal"
        attached="bottom"
        size="large"
        style={{ textAlign: "center", cursor: "pointer" }}
      >
        {clicked ? (
          <>
            Copied to Clipboard <Icon name="check" />
          </>
        ) : (
          <>
            Click to Share Link <Icon name="share square" />
          </>
        )}
      </Label>
      <div
        style={{
          maxHeight: "30px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          verticalAlign: "middle",
          textAlign: "left",
        }}
      >
        {url}
      </div>
    </StyledSegment>
  );
};

export default CopyURLButton;
