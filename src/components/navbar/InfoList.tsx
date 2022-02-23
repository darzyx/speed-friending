import { Divider, List } from "semantic-ui-react";
import styled from "styled-components";

import { homeTextCTA } from "../../pages/home/Home";
import { ColorfulLink } from "../blocks/ColorfulText";

const StyledListHeader = styled(List.Header).attrs({ as: "h3" })`
  &&&& {
    color: #648fff !important;
    font-weight: bold;
  }
`;

type InfoListPropsType = { onCloseInfoModal: () => void };
const InfoList = ({ onCloseInfoModal }: InfoListPropsType) => (
  <List relaxed>
    <List.Item>
      <List.Content>
        <StyledListHeader>
          1. GET ASSIGNED GROUP NAME AND PARTICIPANT NUMBER
        </StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You will be provided this information by an organizer
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>
          2. GET INDEX CARD, PEN, AND BADGE (IF YOU NEED ONE)
        </StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          Write your participant number in very large print on the back
          (non-ruled) side of your card. Write your group name in small print
          below that
        </p>
        <p>
          Write your contact information in small print on the bottom front
          (ruled) side. Use the rest of the index card's front side to keep
          track of which participants you'd like to keep in touch with (e.g.
          "3:YES")
        </p>
        <p>
          If you do not have a badge, please ask for materials to make one from
          an organizer
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>3. FIND YOUR GROUP ON THIS APP</StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You can find your assigned group name in the "{homeTextCTA}" list on
          the{" "}
          <ColorfulLink
            to="/home"
            style={{ textDecoration: "underline" }}
            onClick={onCloseInfoModal}
          >
            Home
          </ColorfulLink>{" "}
          page. Click on your group name to go to your group page
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>
          4. FIND YOUR PARTICIPANT NUMBER AND ROUND PARTNER
        </StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You can find your participant number in your group page. It will have
          a specific background color during the whole game that corresponds to
          your index card. Your round partner is denoted by the number attached
          to your number (and color)
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>5. CHAT IT UP</StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You may use your partner's badge to help you with conversation
          prompts, but this is optional
        </p>
        <p>
          Please put your phone away while chatting to maximize your experience.
          We will let you know when you should come back to the app to find your
          next round partner
        </p>
      </List.Content>
    </List.Item>
  </List>
);

export default InfoList;
