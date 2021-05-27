import { Card } from "../UI/Card";
import styled from "styled-components";
import { connect } from "react-redux";

const Image = styled.img`
  width: 100%;
  height: 70%;
  display: block;
`;

const CardContent = styled.div`
  padding: 0 1.5rem;
  font-weight: 500;
  font-size: 1.2rem;
  height: 10%;
  background-color: #fafafa;
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  & button {
    border-radius: 5px;
    padding: 10px;
    border: none;
    font-weight: bold;
    background-color: ${(props) => {
      if (props.type === "add") {
        return "forestgreen";
      } else if (props.type === "remove") {
        return "red";
      } else {
        return "blue";
      }
    }};
    color: white;
    cursor: pointer;
    margin-bottom: 1rem;
  }

  & button:hover {
    background-color: ${(props) => {
      if (props.type === "add") {
        return "yellowgreen";
      } else if (props.type === "remove") {
        return "lightcoral";
      } else {
        return "none";
      }
    }};
  }
`;

const ShowItem = (props) => {
  //const ctx = useContext(watchListContext);
  const addHandler = () => {
    const show = {
      id: props.show.id,
      name: props.show.name,
      image: props.show.image,
    };

    props.addShow(show);
  };

  const removeHandler = () => {
    props.removeShow(props.show);
  };

  let button = (
    <ButtonWrapper type="remove">
      <button onClick={removeHandler}>REMOVE</button>
    </ButtonWrapper>
  );

  if (!props.iswatchList) {
    button = (
      <ButtonWrapper type="add">
        <button onClick={addHandler}>ADD TO WATCHLIST</button>
      </ButtonWrapper>
    );
    if (props.inWatchlist) {
      button = (
        <ButtonWrapper type="othetr">
          <button>IN WATCHLIST</button>
        </ButtonWrapper>
      );
    }
  }
  return (
    <Card>
      <Image src={props.show.image} alt="Item" />
      <CardContent>
        <p>{props.show.name}</p>
      </CardContent>
      {button}
    </Card>
  );
};

//Connect redux store
const mapStatetoProps = (store) => {
  return {
    watchList: store.watchListReducer.watchList,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    addShow: (show) => dispatch({ type: "ADD", show: show }),
    removeShow: (show) => dispatch({ type: "REMOVE", show: show }),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(ShowItem);
