import { useEffect, useState } from 'react';
import { fetchRecipeByID } from '../services';

function useRecipeDetails(id, drinkRecipe) {
  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    const getRecipeDetail = async () => {
      const recipeReceived = await fetchRecipeByID(id, drinkRecipe);
      setRecipeDetail(recipeReceived);
    };
    getRecipeDetail();
  }, [id, drinkRecipe]);

  return recipeDetail;
}

export default useRecipeDetails;
