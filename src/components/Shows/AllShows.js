import { Fragment } from "react";
import ShowItem from "./ShowItem";
import { connect } from "react-redux";

const AllShows = (props) => {
  //const ctx = useContext(watchListContext);
  return (
    <Fragment>
      {props.shows.map((show) => {
        let inWatchlist = false;
        //filter shows if component is for watch list page
        if (!props.iswatchList) {
          var result = props.watchList.filter((s) => show.id === s.id);
          if (result.length > 0) {
            inWatchlist = true;
          }
        }
        return (
          <ShowItem
            key={show.id}
            inWatchlist={inWatchlist}
            iswatchList={props.iswatchList}
            show={show}
          />
        );
      })}
    </Fragment>
  );
};

//Connect store
const mapStatetoProps = (store) => {
  return {
    watchList: store.watchListReducer.watchList,
  };
};

export default connect(mapStatetoProps)(AllShows);
