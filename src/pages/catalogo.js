import React, { Fragment, useEffect, useState } from "react";
import "./styles/catalogo.scss";
//components
import SubHeader from "../components/subHeader";
import { getPublications } from "../services/publications.service";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Select } from 'antd';

const { Option } = Select;

let dummy =
  "https://i.pinimg.com/originals/22/d2/aa/22d2aa3cf43c1e6a72d18887be3846c2.jpg";

export default function Catalogo() {
  const [publications, setpublications] = useState([]);

  useEffect(() => {
    async function fetchPublications() {
      setpublications(await getPublications());
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
            <img className="contain" src={dummy} alt={dummy} />
          </div>
          <div className="title-container">
            <h6 className="subtitle-pet text-center">{publication.name}</h6>
          </div>
        </Link>
      </Col>
    );
  };


  function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }

  return (

    
    <Fragment>
      <SubHeader />
      <section className="bg-yellow">
        <Container fluid>
          <Row className="py-4">
            <Col md={2}>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Col>
            <Col md={8}>
              <h2 className="subtitle">Mascotas</h2>
              <Row className="catalogo">
                {publications.map((publication, index) => {
                  return card(publication, index);
                })}
                {/* {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()} */}
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
