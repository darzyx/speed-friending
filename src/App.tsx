import React from "react";

import getGame from "./getGame";

const getColor = (n: number) => {
  if (n === 0) {
    return "#a9a9a9"; // Grey
  } else if (n % 10 === 0) {
    return "#ffffff"; // White
  } else if (n % 10 === 9) {
    return "#f032e6"; // Magenta
  } else if (n % 10 === 8) {
    return "#911eb4"; // Purple
  } else if (n % 10 === 7) {
    return "#4363d8"; // Blue
  } else if (n % 10 === 6) {
    return "#42d4f4"; // Cyan
  } else if (n % 10 === 5) {
    return "#3cb44b"; // Green
  } else if (n % 10 === 4) {
    return "#bfef45"; // Lime
  } else if (n % 10 === 3) {
    return "#ffe119"; // Yellow
  } else if (n % 10 === 2) {
    return "#f58231"; // Orange
  } else if (n % 10 === 1) {
    return "#e6194B"; // Red
  } else {
    return "#a9a9a9"; // Grey
  }
};

type ItemType = { n: number; top?: boolean };
const Item = ({ n, top }: ItemType) => (
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
      borderRadius: top ? "8px 8px 0 0" : "0 0 8px 8px",
      boxSizing: "border-box",
    }}
  >
    {n}
  </div>
);

const App = () => {
  const nParticipants = 17;
  const maxRounds = 10;
  const game = getGame(nParticipants, maxRounds);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginBottom: "0" }}>Session A</h1>
        <h3 style={{ marginTop: "0", color: "#a9a9a9" }}>
          {`${nParticipants} participants`}
        </h3>
      </div>
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
