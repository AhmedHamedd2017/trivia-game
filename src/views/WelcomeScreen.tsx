import { FC, useState, useEffect } from "react";
import { ReducerAction } from "../shared/interfaces";
import GridContainer from "../components/containers/GridContainer";
import styled from "styled-components";
import BaseButton from "../components/buttons/BaseButton";
import { Actions } from "../shared/enums";
import { getLocalStorageItem } from "../utils/helpers";
import { SESSION_STORAGE_KEY } from "../shared/constants";
import { useQueryClient } from "react-query";

interface Props {
  dispatch: React.Dispatch<ReducerAction>;
  refetchSession: () => void;
}

const InputElem = styled.input`
  background: transparent;
  border: none;
  border-radius: 10px;
  outline: none;
  color: #fff;
  width: 250px;
  height: 50px;
  font-size: 24px;
  text-align: center;
  transition: all 0.2s;

  &:focus {
    border: 0.5px solid var(--brand-green-light);
  }
`;

const NotificationElem = styled.div`
  background-color: var(--brand-yellow);
  border-radius: 25px;
  color: var(--brand-blue);
  padding: 10px 25px;
  cursor: pointer;
`;

const options = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

const WelcomeScreen: FC<Props> = ({ dispatch, refetchSession }) => {
  const [username, setUsername] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [previousSessionExist, setPreviousSessionExist] =
    useState<boolean>(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    handleSession();
  }, []);

  const handleSession = () => {
    const savedSession = JSON.parse(
      getLocalStorageItem(SESSION_STORAGE_KEY) || "null"
    );
    const SIX_HOURS = 1000 * 60 * 60 * 6;
    const isSessionExpired = Date.now() - savedSession?.timestamp > SIX_HOURS;

    if (!savedSession || isSessionExpired) {
      refetchSession();
    } else if (!queryClient.getQueryData("session")) {
      setPreviousSessionExist(true);
    }
  };

  const handleSessionRetrieval = () => {
    const savedSession = JSON.parse(
      getLocalStorageItem(SESSION_STORAGE_KEY) || ""
    );
    queryClient.setQueryData("session", () => savedSession.token);
    setPreviousSessionExist(false);
  };

  const renderDifficultyBtns = (): JSX.Element[] => {
    return options.map(({ label, value }, index) => {
      return (
        <BaseButton
          key={`${value}_${index}`}
          text={label}
          keyboardKey={label.charAt(0)}
          isSelected={difficulty === value}
          onClick={() => setDifficulty(value)}
        />
      );
    });
  };

  const handlePlayButtonClicked = () => {
    if (previousSessionExist) refetchSession();
    dispatch({
      type: Actions.UPDATE_USER_PREFERENCE,
      value: {
        difficulty,
        username,
      },
    });
  };

  return (
    <>
      {previousSessionExist && (
        <NotificationElem onClick={handleSessionRetrieval}>
          Click me if you would like to restore your previous session!
        </NotificationElem>
      )}
      <InputElem
        placeholder="type your name here..."
        value={username}
        onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
      />
      <GridContainer repeat={3} isColumn>
        {renderDifficultyBtns()}
      </GridContainer>
      <BaseButton
        text="Play"
        keyboardKey="P"
        disabled={!username || !difficulty}
        onClick={handlePlayButtonClicked}
      />
    </>
  );
};

export default WelcomeScreen;
