import "./App.css";
import Header from "./components/UI/Header";
import Home from "./components/Home";
import WatchListPage from "./components/WatchListPage";
import { Route, Switch } from "react-router-dom";
import { createContext } from "react";

export const watchListContext = createContext();

function App() {
  // const [watchList, setWatchList] = useState([]);

  // const AddShow = (show) => {
  //   setWatchList((prevList) => {
  //     return [...prevList, show];
  //   });
  // };

  // const removeShow = (show) => {
  //   setWatchList((prevList) => {
  //     const updatedList = prevList.filter((item) => item.id !== show.id);
  //     return updatedList;
  //   });
  // };

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/watchlist">
          <WatchListPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
