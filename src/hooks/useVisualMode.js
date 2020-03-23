import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  const transition = function(mode, replace = false) {

    setMode(mode); 
    if (replace ===false) {
    history.push(mode);
    setHistory(history);
    }
  };

  const back = function() {
    if (history.length === 1) {
      return;
    }
    history.pop();
    const prevItem = history[history.length - 1];
    setMode(prevItem);
  };

  return { mode, transition, back };
}
