import { Fragment, useContext } from "react";
import AllShows from "./Shows/AllShows";
import { watchListContext } from "../App";
import { connect } from "react-redux";
import styled from "styled-components";

const Message = styled.h1`
  margin: 25%;
  color: white;
`;

const ShowWrapper = styled.div`
  gap: 20px;
  padding: 2rem;
  margin: 5rem auto;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  animation: shows-appear 1s ease-out forwards;

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

const WatchListPage = (props) => {
  //const ctx = useContext(watchListContext);
  let content = (
    <Message>
      Your watchlist is empty! <br /> Add shows from Discover page
    </Message>
  );
  if (props.watchList.length > 0) {
    content = (
      <ShowWrapper>
        <AllShows iswatchList={true} shows={props.watchList} />
      </ShowWrapper>
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
