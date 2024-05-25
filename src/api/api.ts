import { QuestionResponseAPI } from "../shared/interfaces";
import { getErrorQuestionsResponse } from "../utils/helpers";

const BASE_API_URI = "https://opentdb.com";

export const fetchSession = async () => {
  const response = await fetch(`${BASE_API_URI}/api_token.php?command=request`);

  if (!response.ok) {
    throw new Error("Fetching session failed!");
  }

  const sessionJson = await response.json();

  return sessionJson.token;
};

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_API_URI}/api_category.php`);

  if (!response.ok) {
    throw new Error("Fetching categories failed!");
  }

  return response.json();
};

export const fetchQuestions = async (
  amount: number,
  category: number,
  difficulty: string,
  sessionData: string
) => {
  const response = await fetch(
    `${BASE_API_URI}/api.php?amount=${amount}&difficulty=${difficulty}${
      category < 0 ? "" : `&category=${category}&token=${sessionData}`
    }`
  );

  if (!response.ok) {
    throw new Error("Fetching questions failed!");
  }

  const jsonResponse: QuestionResponseAPI = await response.json();

  getErrorQuestionsResponse(jsonResponse.response_code);

  return jsonResponse;
};
