const initialState = {
  recipes: [],
};
export default function recipesSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_RECIPES":
      console.log("payload", action.payload);
      return {
        ...state,
        recipes: action.payload,
      };
    default:
      return state;
  }
}
