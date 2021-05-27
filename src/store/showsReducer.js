const initialState = { shows: [], isLoading: false, error: null };

const showReducer = (prevState = initialState, action) => {
  let newState = { ...prevState };
  if (action.type === "SET_SHOWS") {
    newState.shows = action.value;
  }
  if (action.type === "SET_LOADING") {
    newState.isLoading = action.value;
  }
  if (action.type === "SET_ERROR") {
    newState.error = action.value;
  }
  return newState;
};

export default showReducer;
