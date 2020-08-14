import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectToken, selectUser } from "../User/selectors";
import { appLoading, appDoneLoading } from "../Appstate/actions";

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
  return { type: "ADD_FAVOURITE_RECIPE", payload: data };
}

export function favouriteDeleted(id) {
  return { type: "DELETE_FAVOURITE_RECIPE", payload: id };
}

export function setErrorMessage(data) {
  return { type: "SET_ERROR_MESSAGE", payload: data };
}

export function recipeDeleted(data) {
  return { type: "DELETE_RECIPE", payload: data };
}

export function login(email, password) {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(userLoggedIn(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        dispatch(setErrorMessage({ message: error.response.data.message }));
      } else {
        console.log(error.message);
      }
    }
  };
}

export function signUp(name, email, password, imageurl) {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
        imageurl,
      });
      dispatch(appDoneLoading());
      dispatch(userLoggedIn(response.data));
    } catch (error) {
      if (error.response) {
        dispatch(setErrorMessage({ message: error.response.data.message }));
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
  imageUrl,
  description,
  ingredients,
  method,
  cookingTime,
  tagIds,
  servings
) {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    const token = selectToken(getState());
    try {
      const response = await axios.post(
        `${apiUrl}/`,
        {
          title,
          imageUrl,
          description,
          ingredients,
          method,
          cookingTime,
          tagIds,
          servings,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("add recipe", response.data);
      dispatch(newRecipeAdded(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        dispatch(setErrorMessage({ message: error.response.data.message }));
      } else {
        console.log(error.message);
      }
    }
  };
}

export function addToFavourites(recipeId) {
  console.log("action", recipeId);
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const user = selectUser(getState());
    const response = await axios.post(
      `${apiUrl}/newfav`,
      {
        recipeId,
        userId: user.id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("add fav", response.data.newFavourite);
    dispatch(newFavouriteAdded(response.data.newFavourite));
  };
}

export function deleteFavourite(favId) {
  console.log("action", favId);
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const response = await axios.delete(`${apiUrl}/favourite/${favId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("delete fav", response.data.favourite);
    dispatch(favouriteDeleted(response.data.favourite));
  };
}

export function deleteRecipe(recipeId) {
  console.log("action", recipeId);
  return async (dispatch, getState) => {
    const token = selectToken(getState());
    const response = await axios.delete(`${apiUrl}/deleterecipe/${recipeId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("delete recipe", response.data.recipe);
    dispatch(recipeDeleted(response.data.recipe));
  };
}
