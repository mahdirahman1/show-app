import { Fragment, useEffect, useState } from "react";
import AllShows from "./Shows/AllShows";
import styled from "styled-components";
import Search from "./Search";
import { connect } from "react-redux";

//styled components
const Message = styled.h1`
  margin: 25%;
  color: white;
`;

const Title = styled.h1`
  color: white;
  text-align: left;
  margin-left: 15%;
`;

const ShowWrapper = styled.div`
  gap: 20px;
  padding: 2rem;
  margin: 5rem auto;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  animation: shows-appear 1s ease-out forwards;
  margin: 1rem auto;

  @keyframes shows-appear {
    from {
      opacity: 0;
      transform: translateY(3rem);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

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
        `https://api.tvmaze.com/search/shows?q=${word}`
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
  let content = <message>No TV Shows found</message>;
  if (props.shows.length > 0) {
    content = (
      <ShowWrapper>
        <AllShows iswatchList={false} shows={props.shows} />
      </ShowWrapper>
    );
  }
  if (props.error) {
    content = <Message>{props.error}</Message>;
  }
  if (props.isLoading) {
    content = <Message>Loading...</Message>;
  }

  return (
    <Fragment>
      <Search onSearch={SearchHandler} searchText={searchText} />
      {resultsText !== "" && <Title>Search results for {resultsText}</Title>}
      {resultsText === "" && <Title>Popular TV shows</Title>}
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
