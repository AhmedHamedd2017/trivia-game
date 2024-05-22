import { useReducer } from "react";
import styled from "styled-components";
import WelcomeScreen from "../views/WelcomeScreen";
import { Actions } from "../shared/reducerActions";
import { ReducerAction } from "../shared/interfaces";
import { useQuery } from "react-query";
import { fetchCategories } from "../api/api";
import Categories from "../views/Categories";
// import Categories from "../views/Categories";
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

// TODO: FIX REPLACE ANY WITH GameReducerState + SOLVE ERROR
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: any, action: ReducerAction) => {
  switch (action.type) {
    case Actions.UPDATE_USER_PREFERENCE:
      return {
        ...state,
        difficulty: action.value?.difficulty,
        username: action.value?.username,
        showCategorySelection: true,
      };

    case Actions.UPDATE_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategories: state.selectedCategories.push(
          action.value?.selectedCategory
        ),
        showCategorySelection: false,
      };

    default:
      return { ...state };
  }
};

const GameLayout = () => {
  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const [state, dispatch] = useReducer(reducer, {
    username: "",
    difficulty: "",
    showCategorySelection: false,
    selectedCategories: [],
  });

  const gameStateMachine = () => {
    if (!state.username || !state.difficulty)
      return <WelcomeScreen dispatch={dispatch} />;

    if (state.showCategorySelection)
      return <Categories categories={categoryData} dispatch={dispatch} />;
  };

  return (
    <DivElem>
      {gameStateMachine()}

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
