import React from "react";
import Frame from "./frame";
import Cell from "./cell";
//initial state passed into the component via props
const Grid = ({ sequence, toggleStep }) => (
  <Frame rows={4} columns={16}>
    {sequence.map((line, i) =>
      line.map((time, j) => (
        <Cell
          key={i + j}
          column={j + 1}
          row={i + 1}
          activated={sequence[i][j]["activated"]}
          triggered={sequence[i][j]["triggered"]}
          onClick={() => toggleStep(i, j)}
        />
      ))
    )}
  </Frame>
);

export default Grid;
