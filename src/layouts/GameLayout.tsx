import { useReducer } from "react";
import styled from "styled-components";
import WelcomeScreen from "../views/WelcomeScreen";
import { Actions } from "../shared/reducerActions";
import { ReducerAction } from "../shared/interfaces";
import { useQuery } from "react-query";
import { fetchCategories, fetchQuestions } from "../api/api";
import Categories from "../views/Categories";
import QuestionsLayout from "./QuestionsLayout";
import Loader from "../components/shared/Loader";

const CATEGORY_AMOUNT = 3;
const QUESTIONS_AMOUNT = 3;

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
        showCategorySelection: false,
        selectedCategories: [
          action.value?.selectedCategory,
          ...state.selectedCategories,
        ],
      };

    default:
      return { ...state };
  }
};

const GameLayout = () => {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    difficulty: "",
    showCategorySelection: false,
    selectedCategories: [],
  });
  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: questionsData, isLoading: isQuestionsLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: () =>
      fetchQuestions(
        QUESTIONS_AMOUNT,
        state.selectedCategories[0],
        state.difficulty
      ),
    enabled: !!(
      state.selectedCategories.length && !state.showCategorySelection
    ),
  });

  const gameStateMachine = () => {
    if (isQuestionsLoading) return <Loader />;

    if (!state.username || !state.difficulty)
      return <WelcomeScreen dispatch={dispatch} />;

    if (
      state.showCategorySelection &&
      state.showCategorySelection < CATEGORY_AMOUNT
    )
      return <Categories categories={categoryData} dispatch={dispatch} />;

    if (
      questionsData?.results?.length &&
      state.showCategorySelection < CATEGORY_AMOUNT
    )
      return <QuestionsLayout questions={questionsData.results} />;
  };

  return <DivElem>{gameStateMachine()}</DivElem>;
};

export default GameLayout;
