import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { InstantSearch, connectSearchBox } from "react-instantsearch-dom";
import { useHistory } from "react-router-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import "./styles/search-bar.scss";
import MenuSelect from "./MenuSelect";
import qs from "qs";

const searchClient = instantMeiliSearch(
  process.env.REACT_APP_MEILISEARCH_URL,
  process.env.REACT_APP_MEILISEARCH_SECRET
);

export default function SearchBar() {
  const [searchState, setSearchState] = useState({});

  return (
    <div className="search-container row searchBar">
      <InstantSearch
        indexName="pet-adoption"
        searchClient={searchClient}
        onSearchStateChange={setSearchState}
      >
        <div>
          <span>Animal</span>
          <MenuSelect attribute="animal" />
        </div>
        <div>
          <span>Edad</span>
          <MenuSelect attribute="target-age" />
        </div>
        <CustomSearchBox searchState={searchState} />
      </InstantSearch>
    </div>
  );
}

const SearchBox = ({
  currentRefinement,
  isSearchStalled,
  refine,
  searchState,
}) => {
  const createURL = (state) => `?${qs.stringify(state)}`;
  const searchStateToUrl = (searchState) =>
    searchState ? `catalogo/${createURL(searchState)}` : "";
  const history = useHistory();

  return (
    <form
      noValidate
      action=""
      role="search"
      className="input-group col-lg-7 col-md-10 col-sm-12"
      onSubmit={(event) => {
        event.preventDefault();
        const url = searchStateToUrl(searchState);
        history.push(url);
      }}
    >
      <label>
        Busca animales en adopción
        <input
          id="pet-search"
          type="search"
          className="form-control input row"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
      </label>
      <div className="input-group-append">
        <button className="btn button" type="submit" id="button-addon2">
          <span className="mr-2">Buscar</span>
          <FontAwesomeIcon icon={faLocationArrow} />
        </button>
      </div>
    </form>
  );
};

const CustomSearchBox = connectSearchBox(SearchBox);
