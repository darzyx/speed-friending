import { Timestamp } from "firebase/firestore";

export type SessionType = {
  name: string;
  participant_count: number;
  active_round: number;
  total_rounds: number;
  start_time: Timestamp;
};

export type SessionWithIdType = SessionType & { id: string };
