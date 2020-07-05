const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  recipe: null,
  favourites: null,
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
    case "TOGGLE_FAVOURITE_RECIPE": {
      console.log("reducer", action.payload);
      return {
        ...state,
        favourites: state.favourites.includes(action.payload)
          ? state.favourites.filter((id) => {
              return id !== action.payload;
            })
          : state.favourites.concat(action.payload),
      };
    }
    default:
      return state;
  }
}
