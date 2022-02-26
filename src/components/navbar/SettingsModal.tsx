import { Button, Grid } from "semantic-ui-react";

import StyledIcon from "../blocks/StyledIcon";
import StyledModal from "../blocks/StyledModal";

type SettingsModalPropsType = {
  openSettingsModal: boolean;
  setOpenSettingsModal: (openSettingsModal: boolean) => void;
  setDarkMode: (darkMode: boolean) => void;
  darkMode: boolean;
  playAlarmSound: () => void;
  setMuted: (muted: boolean) => void;
  muted: boolean;
};
const SettingsModal = ({
  openSettingsModal,
  setOpenSettingsModal,
  setDarkMode,
  darkMode,
  playAlarmSound,
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
                name={muted ? "unmute" : "mute"}
                style={{ cursor: "pointer" }}
                size="huge"
              />
              <p
                style={{ marginTop: "10px", cursor: "pointer" }}
                onClick={() => setMuted(!muted)}
              >
                {muted ? "Unmute" : "Mute"}
              </p>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <StyledIcon
                onClick={() => setDarkMode(!darkMode)}
                name={darkMode ? "lightbulb" : "lightbulb outline"}
                style={{ cursor: "pointer" }}
                size="huge"
              />
              <p
                style={{ marginTop: "10px", cursor: "pointer" }}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
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
      size="small"
    />
  );
};

export default SettingsModal;
