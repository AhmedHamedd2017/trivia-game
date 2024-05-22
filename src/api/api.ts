// TODO (ENHANCEMENT): USE AXIOS INSTEAD OF FETCH API
export const fetchCategories = async () => {
  const categories = await fetch("https://opentdb.com/api_category.php");
  return categories.json();
};
