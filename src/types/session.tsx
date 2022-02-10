export type SessionType = {
  name: string;
  participant_count: number;
  active_round: number;
  total_rounds: number;
  end_time: number;
  paused_seconds: number;
};

export type SessionWithIdType = SessionType & { id: string };
