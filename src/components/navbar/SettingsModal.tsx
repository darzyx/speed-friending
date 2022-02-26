import { Button, Grid } from "semantic-ui-react";
import StyledIcon from "../blocks/StyledIcon";

import StyledModal from "../blocks/StyledModal";

type SettingsModalPropsType = {
  openSettingsModal: boolean;
  setOpenSettingsModal: (openSettingsModal: boolean) => void;
  darkMode: boolean;
};
const SettingsModal = ({
  openSettingsModal,
  setOpenSettingsModal,
  darkMode,
}: SettingsModalPropsType) => {
  const handleCloseSettingsModal = () => setOpenSettingsModal(false);
  return (
    <StyledModal
      header="Settings"
      subheader={<StyledIcon name="setting" />}
      content={<div>Hello, world</div>}
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
