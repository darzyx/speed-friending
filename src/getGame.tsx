type GameType = {
  [x: number]: { top: Array<number>; btm: Array<number> };
};

const getGame = (nParticipants: number, maxRounds: number = 0) => {
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

export default getGame;
