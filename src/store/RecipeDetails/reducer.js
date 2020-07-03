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
    case "ADD_LIKE":
      return {
        ...state,
        recipe: { ...state.recipe, likes: state.recipe.likes + 1 },
      };
    default:
      return state;
  }
}
