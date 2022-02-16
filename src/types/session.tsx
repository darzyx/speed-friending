export type SessionType = {
  name: string;
  participant_count: number;
  active_round: number;
  round_count: number;
  end_time: number;
  is_paused: boolean;
  paused_remaining_time: number;
};

export type SessionWithIdType = SessionType & { id: string };
