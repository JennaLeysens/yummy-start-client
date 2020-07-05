import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectToken } from "../User/selectors";

export function userLoggedIn(data) {
  return { type: "LOGIN-SUCCESS", payload: data };
}

export function tokenStillValid(userWithoutToken) {
  return { type: "TOKEN_STILL_VALID", payload: userWithoutToken };
}

export function userLoggedOut() {
  return { type: "LOG_OUT" };
}

export function newRecipeAdded(data) {
  return { type: "ADD_NEW_RECIPE", payload: data };
}
export function newFavouriteAdded(data) {
  return { type: "TOGGLE_FAVOURITE_RECIPE", payload: data };
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
export function getUserWithStoredToken() {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    if (token === null) return;
    try {
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(tokenStillValid(response.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      dispatch(logOut());
    }
  };
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
    const token = selectToken(getState());
    console.log("testing");
    const response = await axios.post(
      `${apiUrl}/`,
      {
        title,
        imageURL,
        description,
        ingredients,
        method,
        cookingTime,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("add recipe", response);
    dispatch(newRecipeAdded(response.data));
  };
}

export function addToFavourites(recipeId) {
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const response = await axios.post(
      `${apiUrl}/newfav`,
      {
        recipeId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("add fav", response);
    dispatch(newFavouriteAdded(response.data));
  };
}
