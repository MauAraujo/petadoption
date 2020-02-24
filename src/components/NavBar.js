import React from 'react'

class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Terms of use</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    )
  }
}

export default NavBar
