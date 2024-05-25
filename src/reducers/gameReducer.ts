import { CATEGORY_AMOUNT, QUESTIONS_AMOUNT } from "../shared/constants";
import { Actions } from "../shared/enums";
import { ReducerAction } from "../shared/interfaces";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const gameReducer = (state: any, action: ReducerAction) => {
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

    case Actions.START_NEW_GAME:
      return {
        username: "",
        difficulty: "",
        showCategorySelection: false,
        selectedCategories: [],
        answers: [],
      };

    default:
      return state;
  }
};
