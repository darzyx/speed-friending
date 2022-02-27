import { useEffect, useState } from "react";

import GroupLink from "./GroupLink";
import LoadingGroupsPlaceholder from "./LoadingGroupsPlaceholder";
import CreateGroupModalTrigger from "./CreateGroupModalTrigger";
import NoGroupsPlaceholder from "./NoGroupsPlaceholder";
import CenterMiddle from "../../components/blocks/CenterMiddle";
import { groupWithIdType } from "../../types/group";
import CreateGroupModal from "./CreateGroupModal";
import { Divider, Header } from "semantic-ui-react";
import { ColorfulHeader } from "../../components/blocks/ColorfulText";
import HomeGroupLinksContainer from "./HomeGroupLinksContainer";

export const homeTextCTA = "Select Group Below";

type HomePropsType = {
  userIsAdmin: boolean;
  isGettingGroups: boolean;
  anyGroupsExist: boolean;
  groups: groupWithIdType[];
  anyPrivateGroupsExist: boolean;
  privateGroups: groupWithIdType[];
  currentTimeInSeconds: number;
  playStartSfxIfUnmute: () => void;
  playAlmostSfxIfUnmute: () => void;
  playFinishSfxIfUnmute: () => void;
  inverted: boolean;
};
const Home = ({
  userIsAdmin,
  isGettingGroups,
  anyGroupsExist,
  groups,
  anyPrivateGroupsExist,
  privateGroups,
  currentTimeInSeconds,
  playStartSfxIfUnmute,
  playAlmostSfxIfUnmute,
  playFinishSfxIfUnmute,
  inverted,
}: HomePropsType) => {
  // Reset scroll on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);

  return (
    <CenterMiddle>
      <Header
        as="h1"
        textAlign="center"
        inverted={inverted}
        style={{ fontSize: "2.25rem" }}
      >
        <Header.Subheader style={{ margin: "7px" }}>Home</Header.Subheader>
        Speed Friending
      </Header>
      <ColorfulHeader as="h2">{homeTextCTA}</ColorfulHeader>
      <HomeGroupLinksContainer>
        {anyGroupsExist &&
          groups.map((group, index) => (
            <GroupLink
              userIsAdmin={userIsAdmin}
              currentTimeInSeconds={currentTimeInSeconds}
              playStartSfxIfUnmute={playStartSfxIfUnmute}
              playAlmostSfxIfUnmute={playAlmostSfxIfUnmute}
              playFinishSfxIfUnmute={playFinishSfxIfUnmute}
              inverted={inverted}
              group={group}
              key={group.id}
              index={index}
            />
          ))}
        {!anyGroupsExist && isGettingGroups && (
          <LoadingGroupsPlaceholder inverted={inverted} />
        )}
        {!anyGroupsExist && !isGettingGroups && <NoGroupsPlaceholder />}
        {userIsAdmin && !isGettingGroups && (
          <CreateGroupModalTrigger
            groups={groups}
            anyGroupsExist={anyGroupsExist}
            setOpenCreateGroupModal={setOpenCreateGroupModal}
          />
        )}
      </HomeGroupLinksContainer>
      {anyGroupsExist && !isGettingGroups && userIsAdmin && (
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
      {userIsAdmin && anyPrivateGroupsExist && (
        <>
          <Header inverted={inverted} as="h2">
            Private Groups
          </Header>
          <HomeGroupLinksContainer>
            {privateGroups.map((group, index) => (
              <GroupLink
                userIsAdmin={userIsAdmin}
                currentTimeInSeconds={currentTimeInSeconds}
                playStartSfxIfUnmute={playStartSfxIfUnmute}
                playAlmostSfxIfUnmute={playAlmostSfxIfUnmute}
                playFinishSfxIfUnmute={playFinishSfxIfUnmute}
                inverted={inverted}
                group={group}
                key={group.id}
                index={index}
              />
            ))}
          </HomeGroupLinksContainer>
          <Divider hidden />
        </>
      )}
      {openCreateGroupModal && (
        <CreateGroupModal
          openCreateGroupModal={openCreateGroupModal}
          setOpenCreateGroupModal={setOpenCreateGroupModal}
          inverted={inverted}
        />
      )}
    </CenterMiddle>
  );
};

export default Home;
