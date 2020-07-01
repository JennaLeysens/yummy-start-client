const initialState = {
  recipe: [],
};

export default function oneRecipeSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ONE_RECIPE":
      return {
        ...state,
        recipe: action.payload,
      };
    default:
      return state;
  }
}
