import { Divider, List } from "semantic-ui-react";

const InfoList = () => (
  <List inverted relaxed>
    <List.Item>
      <List.Content>
        <List.Header>1. GET INDEX CARD, BADGE, AND PEN</List.Header>
        <p style={{ marginTop: "10px" }}>
          You will be provided these by an organizer
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <List.Header>2. FIND YOUR SESSION ON THIS APP</List.Header>
        <p style={{ marginTop: "10px" }}>
          You can find your session name in the "Ongoing Sessions" list on the
          home page. Click on your session name to go to your session page
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <List.Header>3. FIND YOUR NUMBER AND PARTNER</List.Header>
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
        <List.Header>4. CHAT IT UP</List.Header>
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
