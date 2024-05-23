import { useReducer, useEffect } from "react";
import styled from "styled-components";
import WelcomeScreen from "../views/WelcomeScreen";
import { Actions } from "../shared/enums";
import { ReducerAction } from "../shared/interfaces";
import { useQuery } from "react-query";
import { fetchCategories, fetchQuestions } from "../api/api";
import Categories from "../views/Categories";
import QuestionsLayout from "./QuestionsLayout";
import Loader from "../components/shared/Loader";
import { CATEGORY_AMOUNT, QUESTIONS_AMOUNT } from "../shared/constants";

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

    case Actions.ADD_ANSWER:
      return {
        ...state,
        showCategorySelection:
          (state.answers.length + 1) % QUESTIONS_AMOUNT === 0 &&
          state.answers.length + 1 < QUESTIONS_AMOUNT * CATEGORY_AMOUNT,
        answers: [...state.answers, action.value?.answer],
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
    answers: [],
  });

  const { data: categoryData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: questionsData,
    isLoading: isQuestionsLoading,
    isFetching: isQuestionsFetching,
    refetch: refetchQuestions,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: () =>
      fetchQuestions(
        QUESTIONS_AMOUNT,
        state.selectedCategories[0],
        state.difficulty
      ),
    enabled: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (
      state.selectedCategories.length &&
      state.selectedCategories.length < CATEGORY_AMOUNT + 1
    )
      refetchQuestions();
  }, [state.selectedCategories, refetchQuestions]);

  const gameStateMachine = () => {
    if (
      isQuestionsLoading ||
      isQuestionsFetching ||
      (isCategoriesLoading && state.showCategorySelection)
    )
      return <Loader />;

    if (!state.username || !state.difficulty)
      return <WelcomeScreen dispatch={dispatch} />;

    if (
      state.showCategorySelection &&
      state.selectedCategories.length < CATEGORY_AMOUNT
    )
      return (
        <Categories
          categories={categoryData}
          dispatch={dispatch}
          previouslySelectedCategories={state.selectedCategories}
        />
      );

    if (
      questionsData?.results?.length &&
      state.answers.length < QUESTIONS_AMOUNT * CATEGORY_AMOUNT
    )
      return (
        <QuestionsLayout
          questions={questionsData.results}
          dispatch={dispatch}
        />
      );

    return <h1>Score Page</h1>;
  };

  return <DivElem>{gameStateMachine()}</DivElem>;
};

export default GameLayout;
