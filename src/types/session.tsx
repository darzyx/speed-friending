export type SessionType = {
  name: string;
  participant_count: number;
  current_round: number;
  total_rounds: number;
};

export type SessionWithIdType = SessionType & { id: string };
