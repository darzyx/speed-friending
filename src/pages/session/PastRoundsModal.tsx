import { Button } from "semantic-ui-react";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import StyledModal from "../../components/blocks/StyledModal";

type PastRoundsModalPropsType = {
  openPastRoundsModal: boolean;
  setOpenPastRoundsModal: (openPastRoundsModal: boolean) => void;
};
const PastRoundsModal = ({
  openPastRoundsModal,
  setOpenPastRoundsModal,
}: PastRoundsModalPropsType) => (
  <StyledModal
    header="Past Rounds"
    content={
      <div>
        <CenterMiddle>
          <Button onClick={() => setOpenPastRoundsModal(false)}>Close</Button>
        </CenterMiddle>
      </div>
    }
    openModal={openPastRoundsModal}
    setOpenModal={setOpenPastRoundsModal}
  />
);

export default PastRoundsModal;
