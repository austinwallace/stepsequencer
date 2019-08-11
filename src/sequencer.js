import React, { useState, useEffect } from "react";
import Grid from "./grid";
import Bar from "./nav-bar";
import PlayButton from "./play-button";
//defining the initial state activated = enabled for playback, triggered = played back by sequencer
const steps = 16;
const initialCellState = { triggered: false, activated: false };
const lineMap = ["BD", "CP", "CH", "OH"];
const initialState = [
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState),
  new Array(16).fill(initialCellState)
];

const Sequencer = ({ player }) => {
  const [sequence, setSequence] = useState(initialState);
  const [playing, setPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  //marking cell as activated in sequence state
  const toggleStep = (line, step) => {
    const sequenceCopy = [...sequence];
    const { triggered, activated } = sequenceCopy[line][step];
    sequenceCopy[line][step] = { triggered, activated: !activated };
    console.log("toggled");
    setSequence(sequenceCopy);
  };
  //calculating next step state of the sequence, step counter is increased, when step counter matches the step index the cell is triggered
  const nextStep = time => {
    for (let i = 0; i < sequence.length; i++) {
      for (let j = 0; j < sequence[i].length; j++) {
        const { triggered, activated } = sequence[i][j];
        sequence[i][j] = { activated, triggered: j === time };
        if (triggered && activated) {
          player.get(lineMap[i]).start();
        }
      }
    }
    setSequence(sequence);
  };
  //increasing the step periodically
  useEffect(() => {
    const timer = setTimeout(() => {
      if (playing) {
        setCurrentStep((currentStep + 1) % steps);
        nextStep(currentStep);
      }
    }, 100 + Math.random() * 20);
    return () => {
      clearTimeout(timer);
    };
  }, [currentStep, playing]);

  return (
    <>
      <Bar>
        <PlayButton playing={playing} onClick={() => setPlaying(!playing)} />
      </Bar>
      <Grid sequence={sequence} toggleStep={toggleStep} />
    </>
  );
};

export default Sequencer;
