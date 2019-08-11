import React from "react";
import ReactDOM from "react-dom";
import Sequencer from "./sequencer";
import PlayerProvider from "./player-provider";

import "./styles.css";
//playing audio, passing the player to the sequencer component and playing the sound in the nextstep function
function App() {
  return (
    <PlayerProvider>
      {({ player }) => {
        if (!player) {
          return <p>loading....</p>;
        }
        return <Sequencer player={player} />;
      }}
    </PlayerProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
