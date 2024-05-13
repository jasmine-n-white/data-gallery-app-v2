import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
function Header() {
  return (
    <>
    <header className = "headerFormat">
    <img src="https://www.pngmart.com/files/22/The-Legend-Of-Zelda-Breath-Of-The-Wild-Logo-PNG-Transparent.png"alt="The Legend of Zelda Breath of the Wild logo"/>
   <ul className="categories">
    <li><h3>MONSTERS</h3></li>
    <li><h3>LOCATIONS</h3></li>
    <li><h3>MATERIALS</h3></li>
    <li><Link to = {"/"} className="link">
     <h3>WILDLIFE</h3>
    </Link></li>
    </ul>
    </header>
    </>
  )
}

export default Header