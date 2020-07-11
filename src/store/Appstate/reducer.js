const initialState = {
  loading: false,
};

export default function appstateSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "APP_LOADING":
      return { ...state, loading: true };

    case "APP_DONE_LOADING":
      return { ...state, loading: false };

    default:
      return state;
  }
}
