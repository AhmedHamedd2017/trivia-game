import { useReducer } from "react";
import styled from "styled-components";
import WelcomeScreen from "../views/WelcomeScreen";
import { Actions } from "../shared/reducerActions";
import { ReducerAction } from "../shared/interfaces";
// import TFQuestion from "../views/TFQuestion";

const DivElem = styled.div`
  background: var(--brand-blue);
  height: 85%;
  width: 85%;
  border-radius: 45px;

  display: flex;
  flex-direction: column;
  justify-content: safe center;
  align-items: safe center;
  gap: 75px;

  overflow: auto;
  padding: 25px 50px;

  position: relative;

  ::placeholder {
    color: white;
    opacity: 0.8;
  }
`;

// TODO: FIX REPLACE ANY WITH GameReducerState AND SOLVE ERROR
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: any, action: ReducerAction) => {
  switch (action.type) {
    case Actions.UPDATE_USERNAME:
      return { ...state, username: action.value };
    case Actions.UPDATE_DIFFICULTY:
      return { ...state, difficulty: action.value };

    default:
      return { ...state };
  }
};

const GameLayout = () => {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    difficulty: "",
  });

  return (
    <DivElem>
      <WelcomeScreen
        state={state}
        dispatch={dispatch}
        // userValue={state.username}
        // onUserChange={(e) =>
        // dispatch({
        //   type: Actions.UPDATE_USERNAME,
        //   value: (e.target as HTMLInputElement).value,
        // })
        // }
      />
      {/* <Categories /> */}
      {/* <MCQuestion
    question="How many bytes are in a single Kibibyte?"
    correct_answer="1024"
    incorrect_answers={["2400", "1000", "1240"]}
  /> */}
      {/* <TFQuestion
        question="How many bytes are in a single Kibibyte?"
        correct_answer="True"
        incorrect_answers={["False"]}
      /> */}
    </DivElem>
  );
};

export default GameLayout;
