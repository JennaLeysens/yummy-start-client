export const selectRecipes = (state) => {
  return state.recipes.recipes;
};

export const selectTags = (state) => {
  console.log("Selector", state.recipes.recipes.tags);
  return state.recipes.recipes.tags;
};
