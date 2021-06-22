import React, { Fragment, useEffect, useState } from "react";
import "./styles/catalogo.scss";
//components
import SubHeader from "../components/subHeader";
 import {
   getPublications,
   getPublicationsFilter,
 } from "../services/publications.service";
import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
    ClearRefinements,
    RefinementList,
    Configure,
    Snippet
} from "react-instantsearch-dom";
import qs from 'qs';
import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation} from "react-router-dom";
import { Select, Input } from "antd";
import filters from "../data/filters.json";
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import "instantsearch.css/themes/algolia-min.css";

const searchClient = instantMeiliSearch(
    "http://localhost:7700"
);

const { Option } = Select;

let dummy =
  "https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg";

export default function Catalogo() {
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
  const [publications, setpublications] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    async function fetchPublications() {
      setpublications(await getPublications());
      // await getPublicationsFilter({
      //   name: "benito",
      //   animal: "Gato",
      //   colors: ["gris", "white"],
      // });
    }
    fetchPublications();
  }, []);

  let card = (publication, index) => {
    return (
      <Col
        md={2}
        className="publication-card"
        key={publication.ID || index}
      >
        <Link to={"/detail/" + (publication.ID || index)}>
          <div className="img-container">
            <img
              className="contain"
              src={publication.images ? publication.images[0] : dummy}
              alt={dummy}
            />
          </div>
          <div className="title-container">
            <h6 className="subtitle-pet text-center">{publication.name}</h6>
          </div>
        </Link>
      </Col>
    );
  };

    // const onChange = (value, {label}) => {
    //     const attributes = {
    //         "Animal": "animal",
    //         "Tamaño": "petSize",
    //         "Genero": "gender"
    //     }
    //     const queryString = filter === '?' ?
    //           `${filter}${attributes[label]}=${value}`
    //           :
    //           `${filter}&${attributes[label]}=${value}`
    //     setfilter(queryString)
    //     getPublications(queryString)
    // }

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
              {filters.map((filter) => {
                return filter.options ? (
                  <div key={filter.name}>
                    <span className="label">{filter.label}</span>
                    <Select
                      showSearch
                      mode="options"
                      style={{ width: "100%", margin: "0.5rem" }}
                      placeholder={filter.label}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {filter.options.map((option) => {
                        return (
                          <Option value={option} key={option}>
                            {option}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                ) : (
                  <div key={filter.name}>
                    <span className="label">{filter.label}</span>
                    <Select
                      showSearch
                      mode={filter.mode}
                      tokenSeparators={[","]}
                      style={{ width: "100%", margin: "0.5rem" }}
                      placeholder={filter.label}
                      optionFilterProp="children"
                      // filterOption={(input, option) =>
                      //   option.children
                      //     .toLowerCase()
                      //     .indexOf(input.toLowerCase()) >= 0
                      // }
                    ></Select>
                  </div>
                );
              })}

              <Input.Group
                compact
                style={{ width: "100%", marginLeft: "0.5rem" }}
              >
                <span className="label">Edad Minima</span>
                <br></br>
                <Input
                  className="site-input-left"
                  style={{ width: 80, textAlign: "center" }}
                  placeholder="Min"
                  type="number"
                />
                <Input
                  className="site-input-split"
                  style={{
                    width: 30,
                    borderLeft: 0,
                    borderRight: 0,
                    pointerEvents: "none",
                  }}
                  placeholder="~"
                  disabled
                />
                {/* <span className="label">Edad Máxima</span> */}
                <Input
                  // style={{ width: "50%", marginRight: "0.5rem" }}
                  className="site-input-right"
                  style={{
                    width: 90,
                    textAlign: "center",
                  }}
                  placeholder="Max"
                  type="number"
                />
              </Input.Group>
            </Col>
            <Col md={10}>
              <h2 className="subtitle">Mascotas</h2>
              <Row className="catalogo">
                {publications.map((publication, index) => {
                  return card(publication, index);
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      </InstantSearch>
    </Fragment>
  );
}

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
