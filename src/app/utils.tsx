import { onSnapshot, collection } from "firebase/firestore";

import { db } from "../firebase";
import { groupType, groupWithIdType } from "../types/group";

export const initGroup = {
  name: "New Group",
  participant_count: 0,
  active_round_num: 0,
  round_count: 0,
  round_duration: 0,
  round_end_time: 0,
  round_is_paused: false,
  round_paused_time: 0,
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
};
export const groupsQuery = ({
  setGroups,
  setPrivateGroups,
  setIsGettingGroups,
  setAnyGroupsExist,
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
  });
