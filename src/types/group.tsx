export type dropoutsType = {
  participant_number: number;
  round_dropped_out: number;
}[];

export type groupType = {
  name: string;
  participant_count: number;
  round_count: number;
  round_active: number;
  round_duration: number;
  round_end_time: number;
  round_is_paused: boolean;
  round_paused_time: number; // Time remaining when paused
  dropouts: dropoutsType;
};

export type groupWithIdType = groupType & { id: string };
