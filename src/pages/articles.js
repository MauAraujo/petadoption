import React, { Fragment, useState } from "react";
import "./styles/catalogo.scss";
//components
import SubHeader from "../components/SubHeader";
import { InstantSearch, connectHits } from "react-instantsearch-dom";
import MenuSelect from "../components/MenuSelect";
import qs from "qs";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import "instantsearch.css/themes/algolia-min.css";

const DEBOUNCE_TIME = 400;
const searchClient = instantMeiliSearch(process.env.REACT_APP_MEILISEARCH_URL);

export default function Articles() {
  const history = useHistory();
  const location = useLocation();
  const createURL = (state) => `?${qs.stringify(state)}`;
  const searchStateToUrl = (searchState) =>
    searchState ? `${location.pathname}${createURL(searchState)}` : "";
  const urlToSearchState = ({ search }) => qs.parse(search.slice(1));

  const searchQuery = urlToSearchState(location);
  const [searchState, setSearchState] = useState(searchQuery);
  const [debouncedSetState, setDebouncedSetState] = useState(null);

  const onSearchStateChange = (updatedSearchState) => {
    clearTimeout(debouncedSetState);

    setDebouncedSetState(
      setTimeout(() => {
        history.push(searchStateToUrl(updatedSearchState), updatedSearchState);
      }, DEBOUNCE_TIME)
    );
    setSearchState(updatedSearchState);
  };

  return (
    <Fragment>
      <InstantSearch
        indexName="pet-articles"
        searchClient={searchClient}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}
      >
        <SubHeader />
        <section className="catalog">
          <Container fluid>
            <Row className="py-4">
              <Col md={2} className="side">
                <h2 className="label">Animal</h2>
                <MenuSelect attribute="animal" />
              </Col>
              <Col md={10}>
                <h2 className="subtitle">Mascotas</h2>
                <CustomHits />
              </Col>
            </Row>
          </Container>
        </section>
      </InstantSearch>
    </Fragment>
  );
}

const Hits = ({ hits, history }) => {
  const thumborURL = process.env.REACT_APP_THUMBOR_URL;

  return (
    <Row className="catalogo">
      {hits.map((hit) => (
        <Col md={2} className="article-card" key={hit.id}>
          <Link to={"/articulo/" + hit.id}>
            <div className="img-container">
              <img
                className="contain"
                src={`${thumborURL}/unsafe/fit-in/x460/filters:format(webp)/${encodeURIComponent(
                  hit.cover
                )}`}
                alt=""
              />
            </div>
            <div className="title-container">
              <h6 className="subtitle-pet text-center">{hit.title}</h6>
            </div>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

const CustomHits = connectHits(Hits);
