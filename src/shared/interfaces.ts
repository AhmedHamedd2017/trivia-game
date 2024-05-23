import { Actions } from "./enums";
import { AnswerType, QuestionDifficulty, QuestionType } from "./types";

export interface Instruction {
  buttons: (string | React.ReactElement)[];
  description: string;
}

export interface StyledComponent {
  styles?: string;
}

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
  [key: string]: string | number | Answer;
}
export interface ReducerAction {
  type: Actions;
  value?: ReducerValue;
}

export interface Answer {
  type: AnswerType;
  time: number;
  category?: string;
}
