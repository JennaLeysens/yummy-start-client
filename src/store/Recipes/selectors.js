export const selectRecipes = (state) => {
  return state.recipes.recipes;
};

export const selectTags = (state) => {
  return state.recipes.recipes.tags;
};
