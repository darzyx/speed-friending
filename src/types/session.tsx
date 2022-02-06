export type SessionType = {
  name: string;
  total_participants: number;
  current_round: number;
  total_rounds: number;
};

export type SessionWithIdType = SessionType & { id: string };
