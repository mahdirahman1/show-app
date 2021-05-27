import styles from "./Header.module.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>ShowFinder</h1>
        <div className={styles.links}>
          <Link to="/">
            <span>Discover</span>
          </Link>
          <Link to="/watchlist">
            <span>Watchlist</span>
          </Link>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
