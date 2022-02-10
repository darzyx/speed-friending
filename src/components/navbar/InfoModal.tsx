import { List, Modal } from "semantic-ui-react";

const InfoList = () => (
  <List divided inverted relaxed>
    <List.Item>
      <List.Content>
        <List.Header>1. FIND YOUR SESSION NAME</List.Header>
        <p>
          You can find your session name in the "Ongoing Sessions" list on the
          home page. Click on your session name to go to your session page
        </p>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header>2. FIND YOUR ACTIVE ROUND</List.Header>
        <p>
          Your active round will be highlighted in color on your session page.
          If you don't see the colorful numbers, find the "Go to Active Round"
          button and click it
        </p>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header>3. FIND YOUR PARTICIPANT NUMBER</List.Header>
        <p>
          You will be assigned a number by an event organizer. You can find it
          in the session round. It will have a specific background color during
          the whole game.
        </p>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header>4. CHAT IT UP</List.Header>
        <p>
          Please put your phone away while chatting! We will let you know when
          you should come back to the app to find your next round partner
        </p>
      </List.Content>
    </List.Item>
  </List>
);

type InfoModalPropsType = {
  openInfoModal: boolean;
  setOpenInfoModal: (openInfoModal: boolean) => void;
};
const InfoModal = ({ openInfoModal, setOpenInfoModal }: InfoModalPropsType) => (
  <Modal
    onClose={() => setOpenInfoModal(false)}
    onOpen={() => setOpenInfoModal(true)}
    open={openInfoModal}
    style={{
      backgroundColor: "#27292a",
      color: "rgba(255, 255, 255, 0.9)",
    }}
  >
    <Modal.Header
      style={{
        backgroundColor: "#27292a",
        color: "rgba(255, 255, 255, 0.9)",
        textAlign: "center",
      }}
    >
      How It Works
    </Modal.Header>
    <Modal.Content
      style={{
        backgroundColor: "#27292a",
        color: "rgba(255, 255, 255, 0.9)",
      }}
    >
      <InfoList />
    </Modal.Content>
  </Modal>
);

export default InfoModal;
