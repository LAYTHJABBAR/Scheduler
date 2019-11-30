import { useState } from "react";
// import { background } from "@storybook/theming";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  function transition(mode, replace = false) {
    if (replace && history.length > 1) {
      setMode(mode);
      history.push(mode);

      setHistory(history.slice(0, -1));
    } else {
      setMode(mode);
    }
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
