const BASE_API_URI = "https://opentdb.com";

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
    `${BASE_API_URI}/api.php?amount=${amount}&difficulty=${difficulty}${
      category < 0 ? "" : `&category=${category}`
    }`
  );
  return response.json();
};
