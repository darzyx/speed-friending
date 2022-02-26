import { onSnapshot, collection, Timestamp } from "firebase/firestore";

import { db } from "../firebase";
import { groupType, groupWithIdType } from "../types/group";

export const initGroup = {
  name: "New Group",
  participant_count: 10,
  active_round_num: 1,
  round_count: 5,
  round_duration: 60,
  round_end_time: Timestamp.now().seconds + 60,
  round_is_paused: true,
  round_paused_time: 60,
  dropouts: [],
  private: false,
  private_is_ready: false,
} as groupType; // Assumes init data is good!

export const initGroupWithId = {
  ...initGroup,
  id: "",
} as groupWithIdType; // Assumes init data is good!

type groupsQueryArgsType = {
  setGroups: (groups: groupWithIdType[]) => void;
  setPrivateGroups: (privateGroups: groupWithIdType[]) => void;
  setIsGettingGroups: (isGettingGroups: boolean) => void;
  setAnyGroupsExist: (anyGroupsExist: boolean) => void;
  setAnyPrivateGroupsExist: (anyPrivateGroupsExist: boolean) => void;
};
export const groupsQuery = ({
  setGroups,
  setPrivateGroups,
  setIsGettingGroups,
  setAnyGroupsExist,
  setAnyPrivateGroupsExist,
}: groupsQueryArgsType) =>
  onSnapshot(collection(db, "groups"), (snapshot) => {
    let result = snapshot.docs.map((doc) => ({
      ...(doc.data() as groupType),
      id: doc.id,
    })) as groupWithIdType[]; // Assumes fetched data is good!

    let groups = result.filter((rg) => rg.private === false);
    let privateGroups = result.filter((rg) => rg.private === true);

    const didReturnPublicGroups =
      Array.isArray(groups) && groups[0]?.name?.length > 0;
    if (didReturnPublicGroups) {
      groups.sort((a, b) => a.name.localeCompare(b.name));
    }

    const didReturnPrivateGroups =
      Array.isArray(privateGroups) && privateGroups[0]?.name?.length > 0;
    if (didReturnPrivateGroups) {
      privateGroups.sort((a, b) => a.name.localeCompare(b.name));
    }

    setGroups(groups);
    setPrivateGroups(privateGroups);
    setIsGettingGroups(false);
    setAnyGroupsExist(didReturnPublicGroups);
    setAnyPrivateGroupsExist(didReturnPrivateGroups);
  });
