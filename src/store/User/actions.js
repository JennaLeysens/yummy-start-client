import axios from "axios";
import { apiUrl } from "../../config/constants";

export function newRecipeAdded(data) {
  return { type: "ADD_NEW_RECIPE", payload: data };
}

export function userLoggedIn(data) {
  return { type: "LOGIN-SUCCESS", payload: data };
}

export const login = (email, password) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(userLoggedIn(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};

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
