import { SearchCard } from "./UI/Card";

const Search = (props) => {
  let searchValue = props.searchText;
  if (searchValue === null) {
    searchValue = "";
  }

  const onAdd = (event) => {
    props.onSearch(event.target.value);
  };

  return (
    <SearchCard>
      <i class="fas fa-search fa-4x"></i>
      <input
        value={props.searchText}
        onChange={onAdd}
        placeholder="Search for a TV show"
      />
    </SearchCard>
  );
};

export default Search;
