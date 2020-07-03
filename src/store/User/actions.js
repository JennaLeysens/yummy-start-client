import axios from "axios";
import { apiUrl } from "../../config/constants";

export function userLoggedIn(data) {
  return { type: "LOGIN-SUCCESS", payload: data };
}

export function userLoggedOut() {
  return { type: "LOG_OUT" };
}

export function newRecipeAdded(data) {
  return { type: "ADD_NEW_RECIPE", payload: data };
}

export function login(email, password) {
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
}

export function signUp(name, email, password) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
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
}

export function logOut() {
  return { type: "LOG_OUT" };
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
