import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
function Header() {
  return (
    <>
    <header className = "headerFormat">
    <Link to = {"/"}>
    <img src="https://www.pngmart.com/files/22/The-Legend-Of-Zelda-Breath-Of-The-Wild-Logo-PNG-Transparent.png"alt="The Legend of Zelda Breath of the Wild logo"/>
    </Link>
   <ul className="categories">
    <Link to = {"/monsters"} className="link">
    <li><h3>MONSTERS</h3></li>
    </Link>
    <Link to = {"/treasures"} className="link">
    <li><h3>TREASURES</h3></li>
    </Link>
    <li><Link to = {"/materials"} className="link">
    <h3>MATERIALS</h3>
    </Link></li>
    <li><Link to = {"/creatures"} className="link">
     <h3>WILDLIFE</h3>
    </Link></li>
    </ul>
    </header>
    </>
  )
}

export default Header;