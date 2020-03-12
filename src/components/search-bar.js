import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons"
import './styles/search-bar.scss'

export default function SearchBar(props) {
  return (
    <div className='search-container mt-4'>
      <div className='input-group'>
        <input
          type='text'
          className='form-control input'
          placeholder="Recipient's username"
        />
        <div className='input-group-append'>
          <button className='btn button' type='button' id='button-addon2'>
            <span className='mr-2'>ubicación</span>
            <FontAwesomeIcon icon={faLocationArrow} />
          </button>
        </div>
      </div>
    </div>
  )
}
