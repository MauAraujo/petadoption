import React, { Fragment, useEffect, useState } from "react";
import "./styles/catalogo.scss";
//components
import SubHeader from "../components/subHeader";
import {
  getPublications,
  getPublicationsFilter,
} from "../services/publications.service";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Select } from "antd";
import filters from "../data/filters.json";

const { Option } = Select;

let dummy =
  "https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg";

export default function Catalogo() {
  const [publications, setpublications] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    async function fetchPublications() {
      setpublications(await getPublications());

      await getPublicationsFilter({
        name: "benito",
        animal: "Gato",
        colors: ["gris", "white"],
      });
    }
    fetchPublications();
  }, []);

  let card = (publication, index) => {
    return (
      <Col
        md={2}
        className="mb-5 publication-card"
        key={publication.publicationID || index}
      >
        <Link to={"/detail/" + (publication.publicationID || index)}>
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

  function onChange(value, key) {
    if (value) {
      selectedFilters[key] = value;
    }
    setSelectedFilters(selectedFilters);
    console.log(value, key);
  }

  async function onDeselect(value, key) {
    delete selectedFilters[key];
    console.log(selectedFilters);
    setSelectedFilters(selectedFilters);
    setpublications(await getPublicationsFilter(selectedFilters));
  }

  async function onBlur() {
    console.log("Apply filters: ", selectedFilters)
    setpublications(await getPublicationsFilter(selectedFilters));
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  return (
    <Fragment>
      <SubHeader />
      <section className="bg-yellow">
        <Container fluid>
          <Row className="py-4">
            <Col md={2} className="side">
              {filters.map((filter) => {
                return filter.options ? (
                  <Select
                    key={filter.name}
                    showSearch
                    mode="options"
                    onBlur={onBlur}
                    onChange={(value) => onChange(value, filter.name)}
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
                ) : (
                  <Select
                    key={filter.name}
                    showSearch
                    mode="tags"
                    onBlur={onBlur}
                    onChange={(value) => onChange(value, filter.name)}
                    onDeselect={(value) => onDeselect(value, filter.name)}
                    style={{ width: "100%", margin: "0.5rem" }}
                    placeholder={filter.label}
                    optionFilterProp="children"
                    // filterOption={(input, option) =>
                    //   option.children
                    //     .toLowerCase()
                    //     .indexOf(input.toLowerCase()) >= 0
                    // }
                  ></Select>
                );
              })}
            </Col>
            <Col md={8}>
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
