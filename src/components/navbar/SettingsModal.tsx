import { Button, Grid } from "semantic-ui-react";

import CenterMiddle from "../blocks/CenterMiddle";
import StyledIcon from "../blocks/StyledIcon";
import StyledModal from "../blocks/StyledModal";

type SettingsModalPropsType = {
  openSettingsModal: boolean;
  setOpenSettingsModal: (openSettingsModal: boolean) => void;
  setDarkMode: (darkMode: boolean) => void;
  darkMode: boolean;
};
const SettingsModal = ({
  openSettingsModal,
  setOpenSettingsModal,
  setDarkMode,
  darkMode,
}: SettingsModalPropsType) => {
  const handleCloseSettingsModal = () => setOpenSettingsModal(false);
  return (
    <StyledModal
      header="Settings"
      subheader={<StyledIcon name="setting" />}
      content={
        <CenterMiddle>
          <CenterMiddle style={{ cursor: "pointer" }}>
            <StyledIcon
              onClick={() => setDarkMode(!darkMode)}
              name={darkMode ? "lightbulb" : "lightbulb outline"}
              size="huge"
            />
            <p style={{ marginTop: "10px" }}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </p>
          </CenterMiddle>
        </CenterMiddle>
      }
      actions={
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column textAlign="center">
              <Button onClick={handleCloseSettingsModal}>Close</Button>
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
