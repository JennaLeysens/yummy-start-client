const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  recipe: null,
  userFavourites: null,
};

export default function userSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN-SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };
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
      console.log("action.payload", action.payload);
      const newFavs = state.userFavourites.filter(
        (story) => story.id !== FavId
      );
      return {
        ...state,
        userFavourites: newFavs,
      };
    }
    default:
      return state;
  }
}
