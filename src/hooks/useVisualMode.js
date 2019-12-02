import { useState } from "react";
export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history] = useState([initialMode]);
  function transition(mode, replace = false) {
    if (replace) {
      history.splice(1, 2);
    }
    setMode(mode);
    history.push(mode);
  }
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      history.pop();
    }
  }
  return { mode, transition, back };
}
