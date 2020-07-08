export const selectUser = (state) => {
  return state.user;
};

export const selectToken = (state) => {
  return state.user.token;
};

export const selectErrorMessage = (state) => {
  return state.user.errorMessage;
};
