const initialState = { watchList: [] };

const watchListReducer = (prevState = initialState, action) => {
  let newState = { ...prevState };
  if (action.type === "ADD") {
    newState.watchList = [...prevState.watchList, action.show];
  }
  if (action.type === "REMOVE") {
    newState.watchList = prevState.watchList.filter(
      (item) => item.id !== action.show.id
    );
  }

  return newState;
};

export default watchListReducer;
