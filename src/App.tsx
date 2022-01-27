import React from "react";

import getGame from "./getGame";

const App = () => {
  const game = getGame(9);

  return (
    <div>
      {Object.values(game).map((round, index) => {
        console.log(`round ${index}`);
        console.log(round.top);
        console.log(round.btm);

        return (
          <div>
            <h3>{`Round ${index}`}</h3>
            {round.top.map((n) => (
              <span>{`[${n}]`}</span>
            ))}
            <br />
            {round.btm.map((n) => (
              <span>{`[${n}]`}</span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default App;
