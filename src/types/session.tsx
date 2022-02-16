export type SessionType = {
  name: string;
  participant_count: number;
  round_count: number;
  round_active: number;
  round_duration: number;
  round_end_time: number;
  round_is_paused: boolean;
  round_paused_time: number; // Time remaining when paused
};

export type SessionWithIdType = SessionType & { id: string };
