const initialState = {
  tags: [],
};
export default function tagsSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_TAGS":
      return {
        ...state,
        tags: action.payload,
      };
    default:
      return state;
  }
}
