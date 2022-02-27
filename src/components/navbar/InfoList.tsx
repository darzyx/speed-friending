import { Divider, List } from "semantic-ui-react";
import styled from "styled-components";

import { homeTextCTA } from "../../pages/home/Home";
import { ColorfulLink } from "../blocks/ColorfulText";

const StyledListHeader = styled(List.Header).attrs({ as: "h3" })`
  &&&& {
    color: ${({ theme }) => theme.color.blue} !important;
    font-weight: bold;
  }
`;

const StyledListItem = styled.span`
  color: ${({ theme }) => theme.color.purple};
  font-weight: bold;
`;

type InfoListPropsType = { onCloseInfoModal: () => void };
const InfoList = ({ onCloseInfoModal }: InfoListPropsType) => (
  <List relaxed>
    <List.Item>
      <List.Content>
        <StyledListHeader>
          1. OPTIONAL: BRING BADGE (OR MAKE ONE)
        </StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You can use your badge for conversation. If you don't have it, an
          organizer can provide you with materials to quickly make one, if you
          wish.
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>
          2. GET GROUP NAME AND PARTICIPANT NUMBER
        </StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You will be provided these by an organizer.
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>3. GET INDEX CARD AND PEN</StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          <StyledListItem>a.)</StyledListItem> Write your participant number in
          very large print in the middle of the back (non-ruled) side of your
          card. Write your group name in small print on the bottom left corner
          of the same side.
        </p>
        <p>
          <StyledListItem>b.)</StyledListItem> Optional: On the front (ruled)
          side, write your name/alias/etc at the top left corner. Use the two
          lines below this to enter contact info. Nothing too personal - just
          Twitter handle and/or email address are perfect
        </p>
        <p>
          <StyledListItem>c.)</StyledListItem> Optional: You will use the rest
          of the front (ruled) side of the card to keep track of each
          participant number for each person you pair with and whether you'd
          like to keep in touch. (Example: "8:YES, 0:NO, 13:YES")
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>4. FIND YOUR GROUP ON THIS APP</StyledListHeader>
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
          page. Click on your group name to go to your group's page.
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>
          5. FIND YOUR PARTICIPANT NUMBER AND ROUND PARTNER
        </StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          You can find your participant number in your group page. It should
          have the same color as your index card. Your round partner's number
          and index card color are attached to yours.
        </p>
      </List.Content>
    </List.Item>
    <Divider />
    <List.Item>
      <List.Content>
        <StyledListHeader>6. CHAT IT UP AND HAVE FUN</StyledListHeader>
        <p style={{ marginTop: "10px" }}>
          <StyledListItem>a.)</StyledListItem> Please put your phone away while
          chatting to maximize your experience. An organizer will let you know
          when it's time to switch and find your next partner on this app.
        </p>
        <p>
          <StyledListItem>b.)</StyledListItem> Optional: use your partner's
          badge to help you keep the conversation going.
        </p>
      </List.Content>
    </List.Item>
  </List>
);

export default InfoList;
