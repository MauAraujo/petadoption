import React from 'react'
import './styles/search-bar.scss'

export default function SearchBar(props) {
  return (
    <div className='search-container mt-4'>
      <div className="input-group">
        <input type="text" className="form-control input" placeholder="Puebla Puebla"/>
        <div className="input-group-append">
          <button className="btn button" type="button" id="button-addon2">Buscar ubicación</button>
        </div>
      </div>
    </div>
  )
}
