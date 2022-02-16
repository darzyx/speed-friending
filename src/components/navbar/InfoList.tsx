import { Divider, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledListHeader = styled(List.Header)`
  &&&& {
    color: #6495ed !important;
  }
`;

type InfoListPropsType = { onCloseInfoModal: () => void };
const InfoList = ({ onCloseInfoModal }: InfoListPropsType) => (
  <List inverted relaxed>
    <List.Item>
      <List.Content>
        <StyledListHeader>
          1. GET GROUP NAME, PARTICIPANT NUMBER, INDEX CARD, BADGE, AND PEN
        </StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You will be provided these by an organizer before you start. The pen
          and index card help you keep track of your responses to whether you'd
          like to exchange contact info. The badge gives your partners a few
          topics to use to keep the conversation going
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>2. FIND YOUR GROUP ON THIS APP</StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You can find your group name in the "Ongoing Groups" list on the{" "}
          <Link
            to="/home"
            style={{ textDecoration: "underline" }}
            onClick={onCloseInfoModal}
          >
            Home
          </Link>{" "}
          page. Click on your group name to go to your group page
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>
          3. FIND YOUR PARTICIPANT NUMBER AND ROUND PARTNER
        </StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You can find your participant number in your group page. It will have
          a specific background color during the whole game that corresponds to
          your index card. Your round partner is denoted by the number attached
          to yours
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>4. HAVE FUN CHATTING</StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          Please put your phone away while chatting to maximize your experience.
          We will let you know when you should come back to the app to find your
          next round partner
        </p>
      </List.Content>
    </List.Item>
  </List>
);

export default InfoList;
