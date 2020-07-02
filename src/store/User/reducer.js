const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  recipe: null,
};

export default function userSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN-SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };
    case "ADD_NEW_RECIPE":
      return {
        ...state,
        recipe: action.payload,
      };

    default:
      return state;
  }
}
