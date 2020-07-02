import axios from "axios";
import { apiUrl } from "../../config/constants";

export function newRecipeAdded(data) {
  return { type: "ADD_NEW_RECIPE", payload: data };
}

export function addRecipe(
  title,
  imageURL,
  description,
  ingredients,
  method,
  cookingTime
) {
  return async (dispatch, getState) => {
    const response = await axios.post(`${apiUrl}/recipes`, {
      title,
      imageURL,
      description,
      ingredients,
      method,
      cookingTime,
    });
    console.log("add recipe", response);
    dispatch(newRecipeAdded(response.data));
  };
}
