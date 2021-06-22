import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import {
    InstantSearch,
    SearchBox,
} from "react-instantsearch-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import "./styles/search-bar.scss";
import MenuSelect from './MenuSelect';
import qs from 'qs';

const searchClient = instantMeiliSearch(
    "http://127.0.0.1:7700",
    "7807a8dcffdfc5e8400074eafe451e9aab4c9864"
);

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {search: {}};
    }

    createURL(state) {
        return `${qs.stringify(state)}`;
    }

    searchStateToUrl(searchState) {
        return searchState ? `articulos/${this.createURL(searchState)}` : '';
    }

    render() {
        return (
    // <div className="search-container row searchBar">
    //   <div className="input-group col-lg-7 col-md-10 col-sm-12">
    //     <input
    //       type="text"
    //       className="form-control input"
    //       placeholder=""
    //     />
    //     <div className="input-group-append">
    //       <button className="btn button" type="button" id="button-addon2">
    //         <span className="mr-2">Buscar</span>
    //         <FontAwesomeIcon icon={faLocationArrow} />
    //       </button>
    //     </div>
    //   </div>
      // </div>
            <div className="search-container row searchBar">
              <InstantSearch indexName="pet-articles"
                             searchClient={searchClient}
                             onSearchStateChange={searchState => {
                                 this.setState({search: searchState});
                             }}
              >
                <div>
                  <span>Animal</span>
                  <MenuSelect attribute="animal" />
                </div>
                <div>
                  <span>Edad</span>
                  <MenuSelect attribute="target-age" />
                </div>
                <SearchBox onSubmit={event => {
                    event.preventDefault();
                    const search = this.state.search;
                    const url = this.searchStateToUrl(search);
                    this.props.history.push(url);
                }}/>
              </InstantSearch>
            </div>
        );
    }
}
