import React, { ReactChildren } from "react";

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

const Item = ({ n, top }: { n: number; top?: boolean }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      minHeight: "50px",
      width: "100%",
      color: "black",
      fontWeight: "bold",
      fontSize: "24px",
      backgroundColor: getColor(n),
      border: "2px solid black",
      borderRadius: top ? "6px 6px 0 0" : "0 0 6px 6px",
      boxSizing: "border-box",
    }}
  >
    {n}
  </div>
);

const App = () => {
  const game = getGame(13, 10);

  return (
    <div>
      {Object.values(game).map((round, index) => {
        return (
          <div style={{ margin: "20px" }} key={index}>
            <h2 style={{ marginBottom: "5px" }}>{`Round ${index + 1}`}</h2>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {round.top.map((n, topIdx) => (
                <Item key={topIdx} n={n} top />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {round.btm.map((n, btmIdx) => (
                <Item key={btmIdx} n={n} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
