import { useEffect, useState } from "react";

import GroupLink from "./GroupLink";
import LoadingGroupsPlaceholder from "./LoadingGroupsPlaceholder";
import CreateGroupModalTrigger from "./CreateGroupModalTrigger";
import NoGroupsPlaceholder from "./NoGroupsPlaceholder";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import { GroupWithIdType } from "../../types/group";
import CreateGroupModal from "./CreateGroupModal";
import { Divider, Header, Segment } from "semantic-ui-react";
import { ColorfulHeader } from "../../components/blocks/ColorfulText";
import theme from "../../styles/theme";

export const homeTextCTA = "Select Group Below";

type HomePropsType = {
  userIsAdmin: boolean;
  isGettingGroups: boolean;
  hasAnyGroups: boolean;
  groups: GroupWithIdType[];
  currentTimeInSeconds: number;
};
const Home = ({
  userIsAdmin,
  isGettingGroups,
  hasAnyGroups,
  groups,
  currentTimeInSeconds,
}: HomePropsType) => {
  // Reset scroll on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);

  return (
    <CenterMiddle style={{ margin: "0", padding: "0" }}>
      <Header
        inverted
        as="h1"
        textAlign="center"
        style={{ fontSize: "2.25rem" }}
      >
        <Header.Subheader style={{ margin: "7px" }}>Home</Header.Subheader>
        Speed Friending
      </Header>
      <ColorfulHeader as="h2">{homeTextCTA}</ColorfulHeader>
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
      {hasAnyGroups && !isGettingGroups && userIsAdmin && (
        <p>
          {(() => {
            let totalParticipants = 0;
            let totalDropouts = 0;
            for (let i = 0; i < groups.length; i++) {
              if (groups[i]?.participant_count) {
                totalParticipants += groups[i].participant_count;
              }
              if (Array.isArray(groups[i]?.dropouts)) {
                totalDropouts += groups[i]?.dropouts.length;
              }
            }
            return (
              `${totalParticipants - totalDropouts}` +
              `/${totalParticipants} total participants`
            );
          })()}
        </p>
      )}
      <Divider hidden />
      <CreateGroupModal
        openCreateGroupModal={openCreateGroupModal}
        setOpenCreateGroupModal={setOpenCreateGroupModal}
      />
    </CenterMiddle>
  );
};

export default Home;
