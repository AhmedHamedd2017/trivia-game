import { QuestionResponseAPI } from "../shared/interfaces";
import { getErrorQuestionsResponse } from "../utils/helpers";

const BASE_API_URI = "https://opentdb.com";

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
  difficulty: string
) => {
  const response = await fetch(
    `${BASE_API_URI}/api.php?amount=${amount}&difficulty=${difficulty}${
      category < 0 ? "" : `&category=${category}`
    }`
  );

  if (!response.ok) {
    throw new Error("Fetching questions failed!");
  }

  const jsonResponse: QuestionResponseAPI = await response.json();

  getErrorQuestionsResponse(jsonResponse.response_code);

  return jsonResponse;
};
