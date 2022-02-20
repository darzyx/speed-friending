import { useState } from "react";
import styled from "styled-components";

import GroupLink from "./GroupLink";
import LoadingGroupsPlaceholder from "./LoadingGroupsPlaceholder";
import CreateGroupModalTrigger from "./CreateGroupModalTrigger";
import NoGroupsPlaceholder from "./NoGroupsPlaceholder";
import { centerMiddleCSS } from "../../components/blocks/CenterMiddle";
import { GroupWithIdType } from "../../types/group";
import CreateGroupModal from "./CreateGroupModal";
import { Divider, Header, Image, Segment } from "semantic-ui-react";
import { ColorfulHeader } from "../../components/blocks/ColorfulText";
import theme from "../../styles/theme";
import imageSVG from "../../media/lotus.svg";

export const homeTextCTA = "Select Your Group Below";

const HomeContainer = styled.div`
  ${centerMiddleCSS}
  margin: 0;
  padding: 0;
`;

type HomePropsType = {
  userIsAdmin: boolean;
  setUserIsAdmin: (userIsAdmin: boolean) => void;
  isGettingGroups: boolean;
  hasAnyGroups: boolean;
  groups: GroupWithIdType[];
  currentTimeInSeconds: number;
};
const Home = ({
  userIsAdmin,
  setUserIsAdmin,
  isGettingGroups,
  hasAnyGroups,
  groups,
  currentTimeInSeconds,
}: HomePropsType) => {
  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);

  return (
    <HomeContainer>
      <Header inverted as="h1" textAlign="center">
        <Header.Subheader
          onClick={() => setUserIsAdmin(!userIsAdmin)}
          style={{ margin: "7px" }}
        >
          Home
        </Header.Subheader>
        Speed Friending
      </Header>
      <ColorfulHeader as="h3">{homeTextCTA}</ColorfulHeader>
      <Segment
        inverted
        style={{ backgroundColor: theme.color.two, width: "100%" }}
      >
        {hasAnyGroups &&
          groups.map((group, index) => (
            <GroupLink
              userIsAdmin={userIsAdmin}
              currentTimeInSeconds={currentTimeInSeconds}
              group={group}
              key={group.id}
              index={index}
            />
          ))}
        {!hasAnyGroups && isGettingGroups && <LoadingGroupsPlaceholder />}
        {!hasAnyGroups && !isGettingGroups && <NoGroupsPlaceholder />}
        {userIsAdmin && !isGettingGroups && (
          <CreateGroupModalTrigger
            groups={groups}
            hasAnyGroups={hasAnyGroups}
            setOpenCreateGroupModal={setOpenCreateGroupModal}
          />
        )}
      </Segment>
      <Divider hidden />
      <Divider hidden />
      <Image src={imageSVG} size="tiny" centered />
      <Divider hidden />
      <CreateGroupModal
        openCreateGroupModal={openCreateGroupModal}
        setOpenCreateGroupModal={setOpenCreateGroupModal}
      />
    </HomeContainer>
  );
};

export default Home;
