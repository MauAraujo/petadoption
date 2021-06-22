import React, { Fragment } from 'react';
import "./styles/NavBar.scss";
import './styles/sub-header.scss';
import { connectSearchBox } from 'react-instantsearch-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaw } from '@fortawesome/free-solid-svg-icons'

const SubHeader = ({ currentRefinement, isSearchStalled, refine }) => (
     <Fragment>
      <div className="container-fluid sub-header">
        <div className="row pt-4 pb-2">
          <div className="col-12 col-md-1">
            <FontAwesomeIcon icon={faPaw} size='2x' />
          </div>
          <div className="col-12 col-md-3 offset-md-8">
            <div className="input-group">
              <form noValidate action="" role="search">
                <input
                  type="search"
                  value={currentRefinement}
                  onChange={event => refine(event.currentTarget.value)}
                  className="form-control search input-outline"
                  placeholder="Ingrese su busqueda"
                  aria-label="Ingrese su busqueda"
                  aria-describedby="Busqueda"
                />
                {isSearchStalled ? 'Buscando...' : ''}
              </form>
              <div className="input-group-append">
                <button className="btn btn-outline search " type="button" id="button-addon2">Buscar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
);

export default connectSearchBox(SubHeader);
