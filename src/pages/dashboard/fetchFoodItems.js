// Fetch food items from the API
const fetchFoodItems = async (setFoodItems, setIsLoading) => {
  try {
    const response = await fetch("http://localhost:6060/foodItems");
    const data = await response.json();
    setFoodItems(data);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching food items:", error);
    setIsLoading(false);
  }
};

export default fetchFoodItems;
