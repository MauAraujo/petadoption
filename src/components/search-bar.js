import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import './styles/search-bar.scss'

export default function SearchBar(props) {
  return (
    <div className='search-container row'>
      <div className='input-group col-lg-7 col-md-10 col-sm-12'>
        <input
          type='text'
          className='form-control input'
          placeholder="Mi ubicación"
        />
        <div className='input-group-append'>
          <button className='btn button' type='button' id='button-addon2'>
            <span className='mr-2'>Buscar</span>
            <FontAwesomeIcon icon={faLocationArrow} />
          </button>
        </div>
      </div>
    </div>
  )
}
