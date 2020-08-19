const initialState = {
  recipes: [],
};
export default function recipesSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
}
