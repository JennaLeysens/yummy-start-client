const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  imageurl: null,
  recipe: null,
  userFavourites: null,
  recipes: null,
  errorMessage: null,
};

export default function userSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN-SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload, errorMessage: null };
    case "TOKEN_STILL_VALID":
      return { ...state, ...action.payload };
    case "LOG_OUT":
      localStorage.removeItem("token");
      return { ...initialState, token: null };
    case "ADD_NEW_RECIPE":
      return {
        ...state,
        recipe: action.payload,
      };
    case "ADD_FAVOURITE_RECIPE": {
      console.log("reducer", action.payload);
      return {
        ...state,
        userFavourites: state.userFavourites.some(
          (favourite) => favourite.id === action.payload.recipeId
        )
          ? state.userFavourites.filter((fav) => {
              return fav !== action.payload;
            })
          : state.userFavourites.concat(action.payload),
      };
    }
    case "DELETE_FAVOURITE_RECIPE": {
      const FavId = action.payload.id;
      const newFavs = state.userFavourites.filter(
        (favourite) => favourite.id !== FavId
      );
      return {
        ...state,
        userFavourites: newFavs,
      };
    }
    case "SET_ERROR_MESSAGE": {
      return { ...state, errorMessage: action.payload };
    }
    case "DELETE_RECIPE": {
      console.log("reducer", action.payload);
      const recipeId = action.payload.id;
      const newRecipes = state.recipes.filter(
        (recipe) => recipe.id !== recipeId
      );
      return {
        ...state,
        recipes: newRecipes,
      };
    }
    default:
      return state;
  }
}
