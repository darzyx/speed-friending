type GameType = {
  [x: number]: { top: Array<number>; btm: Array<number> };
};

const getGame = (N: number) => {
  const game: GameType = {};
  const participants: Array<number> = Array.from(
    { length: N },
    (_, x) => x + 1
  );
  // If there is an odd number of participants, add a placeholder
  // participant '0'. When participants match with '0', they take
  // a break from participating for the round
  if (N % 2 !== 0) participants.unshift(0);
  const nTemp: number = participants.length;
  const nRounds = nTemp - 1;
  for (let x = 1; x <= nRounds; x++) {
    const top: Array<number> = participants.slice(0, nTemp / 2);
    const btm: Array<number> = participants.slice(nTemp / 2, nTemp).reverse();
    game[x] = { top, btm };
    participants.splice(1, 0, participants[nTemp - 1]);
    participants.pop();
  }

  return game;
};

export default getGame;
