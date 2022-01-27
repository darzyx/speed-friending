import React from "react";

import getGame from "./getGame";

const getColor = (n: number) => {
  if (n === 0) {
    return "#a9a9a9"; // Grey
  } else if (n % 10 === 0) {
    return "#ffffff"; // Black
  } else if (n % 9 === 0) {
    return "#f032e6"; // Magenta
  } else if (n % 8 === 0) {
    return "#911eb4"; // Purple
  } else if (n % 7 === 0) {
    return "#4363d8"; // Blue
  } else if (n % 6 === 0) {
    return "#42d4f4"; // Cyan
  } else if (n % 5 === 0) {
    return "#3cb44b"; // Green
  } else if (n % 4 === 0) {
    return "#bfef45"; // Lime
  } else if (n % 3 === 0) {
    return "#ffe119"; // Yellow
  } else if (n % 2 === 0) {
    return "#f58231"; // Orange
  } else if (n % 1 === 0) {
    return "#e6194B"; // Red
  } else {
    return "#a9a9a9"; // Grey
  }
};

const App = () => {
  const game = getGame(11, 10);

  return (
    <div>
      {Object.values(game).map((round, index) => {
        return (
          <div style={{ margin: "20px" }} key={index}>
            <h3>{`Round ${index + 1}`}</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${round.top.length}, 1fr)`,
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              {round.top.map((n, topIdx) => (
                <div
                  key={topIdx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60px",
                    width: "60px",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "24px",
                    backgroundColor: getColor(n),
                    border: "2px solid black",
                    boxSizing: "border-box",
                  }}
                >
                  {n}
                </div>
              ))}
              {round.btm.map((n, btmIdx) => (
                <div
                  key={btmIdx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60px",
                    width: "60px",
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "24px",
                    backgroundColor: getColor(n),
                    border: "2px solid black",
                    boxSizing: "border-box",
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
