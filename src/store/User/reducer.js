const initialState = {
  recipe: null,
};

export default function userSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_NEW_RECIPE":
      return {
        ...state,
        recipe: action.payload,
      };

    default:
      return state;
  }
}
