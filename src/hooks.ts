import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { Score } from "./types";

export const useScoreDispatch = () => {
  const [score, setScore] = useState<Score>({
    home: "",
    homeScore: 0,
    away: "",
    awayScore: 0,
  });

  useEffect(() => {
    ipcRenderer.send('save', score)
  }, [score]);

  return [score, setScore] as const;
};
