import { useReducer, useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

import WelcomeScreen from "../views/WelcomeScreen";
import { fetchCategories, fetchQuestions, fetchSession } from "../api/api";
import Categories from "../views/Categories";
import QuestionsLayout from "./QuestionsLayout";
import Loader from "../components/shared/Loader";
import {
  CATEGORY_AMOUNT,
  QUESTIONS_AMOUNT,
  SESSION_STORAGE_KEY,
} from "../shared/constants";
import ScoreView from "../views/ScoreView";
import ErrorView from "../views/ErrorView";
import { saveLocalStorageItem } from "../utils/helpers";
import { gameReducer } from "../reducers/gameReducer";

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

  @media screen and (max-width: 720px) {
    padding: 25px;
  }

  position: relative;

  ::placeholder {
    color: white;
    opacity: 0.8;
  }
`;

const GameLayout = () => {
  const [state, dispatch] = useReducer(gameReducer, {
    username: "",
    difficulty: "",
    showCategorySelection: false,
    selectedCategories: [],
    answers: [],
  });

  const {
    data: sessionData,
    isLoading: isSessionLoading,
    refetch: refetchSession,
  } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await fetchSession();
      saveLocalStorageItem(SESSION_STORAGE_KEY, {
        token: response,
        timestamp: Date.now(),
      });
      return response;
    },
    enabled: false,
    // 6 hours
    staleTime: 1000 * 60 * 60 * 6,
  });

  const {
    data: categoryData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    // 5 minutes
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: questionsData,
    isLoading: isQuestionsLoading,
    isFetching: isQuestionsFetching,
    refetch: refetchQuestions,
    error: questionsError,
  } = useQuery({
    queryKey: ["questions", sessionData],
    queryFn: () =>
      fetchQuestions(
        QUESTIONS_AMOUNT,
        state.selectedCategories[0],
        state.difficulty,
        sessionData
      ),
    enabled: false,
    // 5 minutes
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
    if (questionsError || categoriesError)
      return (
        <ErrorView
          queryKey={questionsError ? "questions" : "categories"}
          errorMessage={(questionsError || categoriesError) as string}
          dispatch={dispatch}
        />
      );

    if (
      isQuestionsLoading ||
      isQuestionsFetching ||
      (isCategoriesLoading && state.showCategorySelection) ||
      (isSessionLoading && state.showCategorySelection)
    )
      return <Loader />;

    if (!state.username || !state.difficulty)
      return (
        <WelcomeScreen dispatch={dispatch} refetchSession={refetchSession} />
      );

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

    if (state.answers.length === QUESTIONS_AMOUNT * CATEGORY_AMOUNT)
      return (
        <ScoreView
          username={state.username}
          answers={state.answers}
          dispatch={dispatch}
        />
      );
  };

  return <DivElem>{gameStateMachine()}</DivElem>;
};

export default GameLayout;
