import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";
import { useScoreDispatch } from "./hooks";

export const Wrapper = styled.div`
  position: relative;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.87);
  text-rendering: optimizeLegibility;
`;

export const ScoreboardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;
`;

export const Score = styled.div`
  flex: 1;
  font-size: 5vmin;
`;

export const PlayerWrapper = styled.div`
  flex: 1;
  margin: 1em;
`;

export const Player = styled.input`
border: none;
border-bottom: 2px solid;
font-weight: 500;
font-size: 1em;
border-radius: 0;
line-height: 22px;
display: block;
padding: 5px;
width: 100%;
box-sizing: border-box;
`;

export const Button = styled.button``;

const STKeeper = () => {
  const [score, setScore] = useScoreDispatch();

  const handleReset = () => {
    setScore({
      home: "",
      homeScore: 0,
      away: "",
      awayScore: 0,
    });
  };

  return (
    <Wrapper>
      <ScoreboardWrapper>
        <ScoreWrapper>
          <Score
            onClick={() =>
              setScore({ ...score, homeScore: score.homeScore + 1 })
            }
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </Score>
          <Score>{score.homeScore}</Score>
          <Score
            onClick={() =>
              setScore({ ...score, homeScore: score.homeScore - 1 })
            }
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </Score>
        </ScoreWrapper>
        <PlayerWrapper>
          <Player
            value={score.home}
            onChange={(e) => setScore({ ...score, home: e.target.value })}
          />
        </PlayerWrapper>
        <Button onClick={handleReset}>Reset</Button>
        <PlayerWrapper>
          <Player
            value={score.away}
            onChange={(e) => setScore({ ...score, away: e.target.value })}
          />
        </PlayerWrapper>
        <ScoreWrapper>
          <Score
            onClick={() =>
              setScore({ ...score, awayScore: score.awayScore + 1 })
            }
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </Score>
          <Score>{score.awayScore}</Score>
          <Score
            onClick={() =>
              setScore({ ...score, awayScore: score.awayScore - 1 })
            }
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </Score>
        </ScoreWrapper>
      </ScoreboardWrapper>
    </Wrapper>
  );
};

export default STKeeper;
