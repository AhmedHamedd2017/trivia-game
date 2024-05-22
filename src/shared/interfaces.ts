import { Actions } from "./reducerActions";

export interface Instruction {
  buttons: (string | React.ReactElement)[];
  description: string;
}

export interface StyledComponent {
  styles?: string;
}

export type QuestionType = "multiple" | "boolean";
export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface Category {
  id: number;
  name: string;
}
export interface Question {
  type: QuestionType;
  difficulty: QuestionDifficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface GameReducerState {
  username: string;
  difficulty: string;
}

export interface ReducerValue {
  [key: string]: string;
}
export interface ReducerAction {
  type: Actions;
  value?: ReducerValue;
}
