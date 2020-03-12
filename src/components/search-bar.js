import React from 'react'
import './styles/search-bar.scss'

export default function SearchBar(props) {
  return (
    <div className='search-container mt-4'>
      <div className="input-group">
        <input type="text" className="form-control input" placeholder="Recipient's username"/>
        <div className="input-group-append">
          <button className="btn button" type="button" id="button-addon2">ubicacion X</button>
        </div>
      </div>
    </div>
  )
}
