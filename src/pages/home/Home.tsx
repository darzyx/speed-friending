import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GroupLink from "./GroupLink";
import LoadingGroupsPlaceholder from "./LoadingGroupsPlaceholder";
import CreateGroupModalTrigger from "./CreateGroupModalTrigger";
import NoGroupsPlaceholder from "./NoGroupsPlaceholder";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import { GroupWithIdType } from "../../types/group";
import CreateGroupModal from "./CreateGroupModal";
import { Divider, Header, Icon, Segment } from "semantic-ui-react";
import { ColorfulHeader } from "../../components/blocks/ColorfulText";
import theme from "../../styles/theme";
import NavButton from "../../components/blocks/NavButton";

export const homeTextCTA = "Select Group Below";

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
  // Reset scroll on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);

  return (
    <CenterMiddle style={{ margin: "0", padding: "0" }}>
      <Header inverted as="h1" textAlign="center">
        <Header.Subheader style={{ margin: "7px" }}>Home</Header.Subheader>
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
      <CenterMiddle>
        <NavButton onClick={() => navigate("/admin")}>
          <Icon name="star" /> Admin
        </NavButton>
      </CenterMiddle>
      <CreateGroupModal
        openCreateGroupModal={openCreateGroupModal}
        setOpenCreateGroupModal={setOpenCreateGroupModal}
      />
    </CenterMiddle>
  );
};

export default Home;
