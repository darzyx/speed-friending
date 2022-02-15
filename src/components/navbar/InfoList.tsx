import { Divider, List } from "semantic-ui-react";
import styled from "styled-components";

const StyledListHeader = styled(List.Header)`
  &&&& {
    color: #6495ed !important;
  }
`;

const InfoList = () => (
  <List inverted relaxed>
    <List.Item>
      <List.Content>
        <StyledListHeader>1. GET INDEX CARD, BADGE, AND PEN</StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You will be provided these by an organizer
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>2. FIND YOUR SESSION ON THIS APP</StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You can find your session name in the "Ongoing Sessions" list on the
          home page. Click on your session name to go to your session page
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>3. FIND YOUR NUMBER AND PARTNER</StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You will be assigned a number by an event organizer. You can find it
          in the session round. It will have a specific background color during
          the whole game.
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>4. CHAT IT UP</StyledListHeader>
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
