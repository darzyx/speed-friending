import { GroupWithIdType } from "../../types/group";

export const getMaxRounds = (participant_count: number) => {
  if (participant_count === 0 || participant_count === 1) {
    return 0;
  } else if (participant_count % 2 === 0) {
    return participant_count - 1;
  } else {
    return participant_count;
  }
};

export type RoundType = { top: Array<number>; btm: Array<number> };
export type GameType = { [x: number]: RoundType };
export const getGame = (nParticipants: number, maxRounds: number = 0) => {
  const game: GameType = {};
  const participants: Array<number> = Array.from(
    { length: nParticipants },
    (_, x) => x + 1
  );
  // If there is an odd number of participants, add a placeholder
  // participant '0'. When participants match with '0', they take
  // a break from participating for the round
  if (nParticipants % 2 !== 0) participants.unshift(0);
  const N: number = participants.length;
  const nRounds = maxRounds > N - 1 ? N - 1 : maxRounds;
  for (let round = 0; round < nRounds; round++) {
    const top: Array<number> = participants.slice(0, N / 2);
    const btm: Array<number> = participants.slice(N / 2, N).reverse();
    game[round] = { top, btm };
    participants.splice(1, 0, participants[N - 1]);
    participants.pop();
  }
  return game;
};

export const getParticipantColor = (n: number) => {
  if (n === 0) {
    return "#181a1b"; // Black
  } else if (n % 5 === 0) {
    return "#648FFF"; // Blue
  } else if (n % 5 === 4) {
    return "#785EF0"; // Purple
  } else if (n % 5 === 3) {
    return "#DC267F"; // Pink
  } else if (n % 5 === 2) {
    return "#FE6100"; // Orange
  } else if (n % 5 === 1) {
    return "#FFB000"; // Yellow
  } else {
    return "#181a1b"; // Black
  }
};

type TimeColorsType = "blue" | "green" | "yellow" | "pink" | "red";
export type TimeValuesType = {
  color: TimeColorsType;
  remainingMinutesDisplay: string;
  remainingSecondsDisplay: string;
  remainingTime: number;
};
export const getTimeValues = ({
  group,
  currentTimeInSeconds,
}: {
  group: GroupWithIdType;
  currentTimeInSeconds: number;
}) => {
  let remainingTime = group.round_is_paused
    ? group.round_paused_time
    : group.round_end_time - currentTimeInSeconds;

  if (remainingTime > group.round_duration) {
    // Sometimes round_end_time is a second too large at start
    remainingTime = group.round_duration;
  }

  let color: TimeColorsType = "blue";
  if (remainingTime >= group.round_duration) {
    color = "green";
  } else if (remainingTime <= 0) {
    color = "red";
    remainingTime = 0;
  } else if (group.round_is_paused) {
    color = "yellow";
  } else if (remainingTime <= 30) {
    color = "pink";
  } else {
    color = "blue";
  }

  const remainingSeconds = remainingTime % 60;
  const remainingMinutes = (remainingTime - remainingSeconds) / 60;
  const timeValues: TimeValuesType = {
    color,
    remainingTime,
    remainingMinutesDisplay:
      remainingMinutes < 10
        ? "0" + remainingMinutes.toString()
        : remainingMinutes.toString(),
    remainingSecondsDisplay:
      remainingSeconds < 10
        ? "0" + remainingSeconds.toString()
        : remainingSeconds.toString(),
  };
  return timeValues;
};

export const getIsRoundDropout = ({
  nParticipant,
  roundNumber,
  group,
}: {
  nParticipant: number;
  roundNumber: number;
  group: GroupWithIdType;
}) => {
  if (nParticipant === 0) return false;
  const dropout = group.dropouts.find(
    (d) => d?.participant_number === nParticipant
  );
  if (dropout?.participant_number && dropout.round_dropped_out <= roundNumber) {
    return true;
  } else {
    return false;
  }
};
