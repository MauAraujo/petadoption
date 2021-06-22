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
    useLocation
} from "react-router-dom";
import qs from 'qs';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import "instantsearch.css/themes/algolia-min.css";
import { Card } from 'antd';

const { Meta } = Card;
const searchClient = instantMeiliSearch(
    "http://localhost:7700"
);

export default function Articles() {
    const urlToSearchState = (query) => qs.parse(query.replace('/articulos/', ''));
    const query = useLocation().pathname;
    //var searchState = urlToSearchState(query);
    // let init = {
    //     refinementList: {
    //         animal: ['perro'],
    //         "target-age": ['cachorro', 'adolescente']
    //     },
    //     menu: {
    //         animal: 'perro',
    //         "target-age": 'cachorro',
    //     },
    //     query: 'juguetes',
    //     page: 1,
    // }

    const [searchState, setSearchState] = useState(urlToSearchState(query));

    return (
        <Fragment>
          <InstantSearch indexName="pet-articles"
                         searchClient={searchClient}
                         searchState={searchState}
                         onSearchStateChange={search => setSearchState(search)}
          >
            <SubHeader />
            <section className="catalog">
              <Container fluid>
                <Row className="py-4">
                  <Col md={2} className="side">
                    <span className="label">Animal</span>
                    <MenuSelect attribute="animal"/>
                    <span className="label">Edad</span>
                    <MenuSelect attribute="target-age" />
                  </Col>
                  <Col md={10}>
                    <h2 className="subtitle">Articulos</h2>
                    <CustomHits />
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

const Hits = ({ hits }) => (
    <Row className="catalogo">
      {hits.map(hit => (
          <Card
            className="publication-card"
            key={hit.objectID}
            hoverable
            style={{ width: 240 }}

          >
            <Meta title={hit.title}/>
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
