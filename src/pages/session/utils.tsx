import { SemanticCOLORS } from "semantic-ui-react";
import { SessionWithIdType } from "../../types/session";

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
    return "#a9a9a9"; // Grey
  } else if (n % 10 === 0) {
    return "#ffffff"; // White
  } else if (n % 10 === 9) {
    return "#f032e6"; // Magenta
  } else if (n % 10 === 8) {
    return "#911eb4"; // Purple
  } else if (n % 10 === 7) {
    return "#bfef45"; // Lime
  } else if (n % 10 === 6) {
    return "#42d4f4"; // Cyan
  } else if (n % 10 === 5) {
    return "#e6194B"; // Red
  } else if (n % 10 === 4) {
    return "#ffe119"; // Yellow
  } else if (n % 10 === 3) {
    return "#4363d8"; // Blue
  } else if (n % 10 === 2) {
    return "#f58231"; // Orange
  } else if (n % 10 === 1) {
    return "#3cb44b"; // Green
  } else {
    return "#a9a9a9"; // Grey
  }
};

export type TimeValuesType = {
  color: SemanticCOLORS;
  remainingMinutesDisplay: string;
  remainingSecondsDisplay: string;
  remainingTime: number;
};
export const getTimeValues = ({
  session,
  currentTimeInSeconds,
}: {
  session: SessionWithIdType;
  currentTimeInSeconds: number;
}) => {
  let color: SemanticCOLORS = "green";
  let remainingTime = session.round_is_paused
    ? session.round_paused_time
    : session.round_end_time - currentTimeInSeconds;
  if (remainingTime > session.round_duration) {
    // Sometimes round_end_time is a second too large at start
    remainingTime = session.round_duration;
  } else if (remainingTime <= 0) {
    color = "red";
    remainingTime = 0;
  } else if (remainingTime <= 60) {
    color = "yellow";
  }
  const remainingSeconds = remainingTime % 60;
  const remainingMinutes = (remainingTime - remainingSeconds) / 60;
  const timeValues: TimeValuesType = {
    color,
    remainingTime,
    remainingMinutesDisplay: remainingMinutes.toString(),
    remainingSecondsDisplay:
      remainingSeconds < 10
        ? "0" + remainingSeconds.toString()
        : remainingSeconds.toString(),
  };
  return timeValues;
};
