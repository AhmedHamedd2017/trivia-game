const BASE_API_URI = "https://opentdb.com";

// TODO (ENHANCEMENT): USE AXIOS INSTEAD OF FETCH API
export const fetchCategories = async () => {
  const response = await fetch(`${BASE_API_URI}/api_category.php`);
  return response.json();
};

export const fetchQuestions = async (
  amount: number,
  category: number,
  difficulty: string
) => {
  const response = await fetch(
    `${BASE_API_URI}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
  );
  return response.json();
};
