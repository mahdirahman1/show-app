import { Fragment, useContext } from "react";
import style from "./Home.module.css";
import AllShows from "./Shows/AllShows";
import { watchListContext } from "../App";
import { connect } from "react-redux";

const WatchListPage = (props) => {
  //const ctx = useContext(watchListContext);
  let content = (
    <h1 className={style.message}>
      Your watchlist is empty! <br /> Add shows from Discover page
    </h1>
  );
  if (props.watchList.length > 0) {
    content = (
      <div className={style.shows}>
        <AllShows iswatchList={true} shows={props.watchList} />
      </div>
    );
  }
  return <Fragment>{content}</Fragment>;
};

//Connect store
const mapStatetoProps = (store) => {
  return {
    watchList: store.watchListReducer.watchList,
  };
};

export default connect(mapStatetoProps)(WatchListPage);
