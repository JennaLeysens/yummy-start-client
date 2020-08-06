const initialState = {
  tags: [],
};
export default function favouritesSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_FAVOURITES":
      return {
        ...state,
        favourites: action.payload,
      };
    default:
      return state;
  }
}
