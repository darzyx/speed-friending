import { Button, Grid } from "semantic-ui-react";

import StyledIcon from "../blocks/StyledIcon";
import StyledModal from "../blocks/StyledModal";

type SettingsModalPropsType = {
  openSettingsModal: boolean;
  setOpenSettingsModal: (openSettingsModal: boolean) => void;
  setInverted: (inverted: boolean) => void;
  inverted: boolean;
  setMuted: (muted: boolean) => void;
  muted: boolean;
};
const SettingsModal = ({
  openSettingsModal,
  setOpenSettingsModal,
  setInverted,
  inverted,
  setMuted,
  muted,
}: SettingsModalPropsType) => {
  return (
    <StyledModal
      header="Settings"
      subheader={<StyledIcon name="setting" />}
      content={
        <div>
          <p style={{ textAlign: "center", marginBottom: "20px" }}>
            Click something to toggle it
          </p>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column textAlign="center">
                <StyledIcon
                  onClick={() => setMuted(!muted)}
                  name={muted ? "mute" : "unmute"}
                  style={{ cursor: "pointer" }}
                  size="huge"
                />
                <p
                  style={{ marginTop: "10px", cursor: "pointer" }}
                  onClick={() => setMuted(!muted)}
                >
                  {muted ? "Now Muted" : "Now Playing Sound"}
                  <br />
                  {"(Desktop Only)"}
                </p>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <StyledIcon
                  onClick={() => setInverted(!inverted)}
                  name={inverted ? "lightbulb outline" : "lightbulb"}
                  style={{ cursor: "pointer" }}
                  size="huge"
                />
                <p
                  style={{ marginTop: "10px", cursor: "pointer" }}
                  onClick={() => setInverted(!inverted)}
                >
                  {inverted ? "Using Dark Mode" : "Using Light Mode"}
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      }
      actions={
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Button secondary onClick={() => setOpenSettingsModal(false)}>
                Close
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
      openModal={openSettingsModal}
      setOpenModal={setOpenSettingsModal}
      inverted={inverted}
      size="tiny"
    />
  );
};

export default SettingsModal;
