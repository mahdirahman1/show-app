import { Fragment, useEffect, useState } from "react";
import AllShows from "./Shows/AllShows";
import styles from "./Home.module.css";
import Search from "./Search";
import { connect } from "react-redux";

const Home = (props) => {
  const [searchText, setSearch] = useState("");
  const [resultsText, setresultsText] = useState("");
  // const [showsState, dispatchShows] = useReducer(showReducer, {
  //   shows: [],
  //   isLoading: false,
  //   error: null,
  // });
  console.log(props.shows);
  const SearchHandler = (word) => {
    setSearch(word);
    setresultsText(word);
    fetchShowsHandler(word);
  };

  useEffect(() => {
    setSearch(localStorage.getItem("search"));
    setresultsText(localStorage.getItem("searchTitle"));
  }, []);

  useEffect(() => {
    localStorage.setItem("search", searchText);
    localStorage.setItem("searchTitle", resultsText);
    fetchShowsHandler(searchText);
  }, [searchText, resultsText]);

  async function fetchShowsHandler(word) {
    props.setLoading(true);
    props.setError(null);
    try {
      if (word === "") {
        word = "Batman";
      }
      const response = await fetch(
        `http://api.tvmaze.com/search/shows?q=${word}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong :(");
      }

      const data = await response.json();

      const transformedData = data.map((show) => {
        let setImage = null;
        if (show.show.image != null) {
          setImage = show.show.image.original;
        }
        return {
          id: show.show.id,
          name: show.show.name,
          image: setImage,
        };
      });
      props.setShows(transformedData);
    } catch (error) {
      props.setError(error.message);
    }
    props.setLoading(false);
  }

  //Conditional renderring
  let content = <h1 className={styles.message}>No TV shows found</h1>;
  if (props.shows.length > 0) {
    content = (
      <div className={`${styles.shows} ${styles.home}`}>
        <AllShows iswatchList={false} shows={props.shows} />{" "}
      </div>
    );
  }
  if (props.error) {
    content = <h1 className={styles.message}>{props.error}</h1>;
  }
  if (props.isLoading) {
    content = <h1 className={styles.message}>Loading...</h1>;
  }

  return (
    <Fragment>
      <Search onSearch={SearchHandler} searchText={searchText} />
      {resultsText !== "" && (
        <h1 className={styles.result_title}>
          Search results for {resultsText}
        </h1>
      )}
      {resultsText === "" && (
        <h1 className={styles.result_title}>Popular TV shows</h1>
      )}
      {content}
    </Fragment>
  );
};

//Connect redux store
const mapStatetoProps = (store) => {
  return {
    shows: store.showReducer.shows,
    isLoading: store.showReducer.isLoading,
    error: store.showReducer.error,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    setShows: (data) => dispatch({ type: "SET_SHOWS", value: data }),
    setLoading: (bool) => dispatch({ type: "SET_LOADING", value: bool }),
    setError: (msg) => dispatch({ type: "SET_ERROR", value: msg }),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);
