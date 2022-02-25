import { onSnapshot, collection } from "firebase/firestore";

import { db } from "../firebase";
import { groupWithIdType } from "../types/group";

export const initGroup = {
  id: "",
  name: "",
  participant_count: 0,
  round_count: 0,
  round_active: 0,
  round_duration: 0,
  round_end_time: 0,
  round_is_paused: false,
  round_paused_time: 0,
  dropouts: [],
} as groupWithIdType; // Assumes init data is good!

type groupsQueryArgsType = {
  setGroups: (groups: groupWithIdType[]) => void;
  setIsGettingGroups: (isGettingGroups: boolean) => void;
  setAnyGroupsExist: (anyGroupsExist: boolean) => void;
};
export const groupsQuery = ({
  setGroups,
  setIsGettingGroups,
  setAnyGroupsExist,
}: groupsQueryArgsType) =>
  onSnapshot(collection(db, "groups"), (snapshot) => {
    let resultGroups = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as groupWithIdType[]; // Assumes fetched data is good!
    const resultHasAnyGroups =
      Array.isArray(resultGroups) && resultGroups[0]?.name?.length > 0;
    if (resultHasAnyGroups) {
      resultGroups.sort((a, b) => a.name.localeCompare(b.name));
    }
    setGroups(resultGroups);
    setIsGettingGroups(false);
    setAnyGroupsExist(resultHasAnyGroups);
  });
