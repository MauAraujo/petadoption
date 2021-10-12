import React, { Fragment, useState } from "react";
import SubHeader from "../components/subHeader";
import "./styles/catalogo.scss";
import { Col, Container, Row } from "react-bootstrap";
import {
  InstantSearch,
  connectHits
} from "react-instantsearch-dom";
import MenuSelect from "../components/MenuSelect";
import {
  useLocation,
  useHistory
} from "react-router-dom";
import qs from 'qs';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import "instantsearch.css/themes/algolia-min.css";
import { Card } from 'antd';

const { Meta } = Card;
const DEBOUNCE_TIME = 400;
const searchClient = instantMeiliSearch(
  "http://147.182.175.166:7700"
);

export default function Articles() {
  const history = useHistory();
  const location = useLocation();
  const createURL = state => `?${qs.stringify(state)}`;
  const searchStateToUrl = searchState =>
    searchState ? `${location.pathname}${createURL(searchState)}` : '';
  const urlToSearchState = ({ search }) => qs.parse(search.slice(1));

  const searchQuery = urlToSearchState(location);
  const [searchState, setSearchState] = useState(searchQuery);
  const [debouncedSetState, setDebouncedSetState] = useState(null);

  const onSearchStateChange = updatedSearchState => {
    clearTimeout(debouncedSetState);

    setDebouncedSetState(
      setTimeout(() => {
        history.push(
          searchStateToUrl(updatedSearchState),
          updatedSearchState,
        );
      }, DEBOUNCE_TIME)
    );
    setSearchState(updatedSearchState);
  };

  return (
    <Fragment>
      <InstantSearch indexName="pet-articles"
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
                <span className="label">Animal</span>
                <MenuSelect attribute="animal" />
              </Col>
              <Col md={10}>
                <h2 className="subtitle">Articulos</h2>
                <CustomHits history={history} />
              </Col>
            </Row>
          </Container>
        </section>
      </InstantSearch>
    </Fragment>
    //     <InstantSearch indexName="pet-articles"
    //                    searchClient={searchClient}
    //                    searchState={searchState}
    //                    onSearchStateChange={search => setSearchState(search)}
    //     >
    //       <div className="left-panel">
    //         <ClearRefinements />
    //         <h2>Animales</h2>
    //         <RefinementList attribute="animal" />
    //         <h2>Edad</h2>
    //         <RefinementList attribute="target-age" />
    //         <Configure
    //           hitsPerPage={6}
    //           attributesToSnippet={["description:50"]}
    //           snippetEllipsisText={"..."}
    //         />
    //       </div>
    //       <div className="right-panel">
    //         <SearchBox />
    //         <Hits hitComponent={Hit} />
    //         <Pagination showLast={true} />
    //       </div>
    //     </InstantSearch>
  );
}

const Hits = ({ hits, history }) => (
  <Row className="catalogo">
    {hits.map(hit => (
      <Card
        className="publication-card"
        key={hit.objectID}
        hoverable
        style={{ width: 320 }}
        cover={<img alt="example" src={`http://147.182.175.166:8000/unsafe/fit-in/x340/filters:format(webp)/${encodeURIComponent(hit.cover)}`} />}
        onClick={e => {
          history.push('/articulo/' + hit.id);
        }}
      >
        <Meta title={hit.title} />
      </Card>
    ))}
  </Row>
)
const CustomHits = connectHits(Hits);

// export function Select() {
//   return (<Fragment>
//     <div className="container">
//       <div className="row">
//         <div className="col-12">
//           Raza
//         </div>
//         <div className="col-12">
//           <div class="dropdown">
//             <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//               Dropdown button
//             </button>
//             <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
//               <a class="dropdown-item" href="#">Action</a>
//               <a class="dropdown-item" href="#">Another action</a>
//               <a class="dropdown-item" href="#">Something else here</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </Fragment>)
// }
/////
