import { Button, Grid } from "semantic-ui-react";

import StyledIcon from "../blocks/StyledIcon";
import StyledModal from "../blocks/StyledModal";

type SettingsModalPropsType = {
  openSettingsModal: boolean;
  setOpenSettingsModal: (openSettingsModal: boolean) => void;
  setDarkMode: (darkMode: boolean) => void;
  darkMode: boolean;
  setMuted: (muted: boolean) => void;
  muted: boolean;
};
const SettingsModal = ({
  openSettingsModal,
  setOpenSettingsModal,
  setDarkMode,
  darkMode,
  setMuted,
  muted,
}: SettingsModalPropsType) => {
  return (
    <StyledModal
      header="Settings"
      subheader={<StyledIcon name="setting" />}
      content={
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
                {muted ? "Muted" : "Playing Sound"}
              </p>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <StyledIcon
                onClick={() => setDarkMode(!darkMode)}
                name={darkMode ? "lightbulb outline" : "lightbulb"}
                style={{ cursor: "pointer" }}
                size="huge"
              />
              <p
                style={{ marginTop: "10px", cursor: "pointer" }}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "Dark Mode" : "Light Mode"}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
      actions={
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Button onClick={() => setOpenSettingsModal(false)}>Close</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
      openModal={openSettingsModal}
      setOpenModal={setOpenSettingsModal}
      darkMode={darkMode}
      size="tiny"
    />
  );
};

export default SettingsModal;
