import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import CreaturePage from './CreaturePage'
import MaterialPage from './MaterialPage'
import MonsterPage from './MonsterPage'
import NotFound from './NotFound'
import Header from './Header/Header.jsx'
import MaterialProfile from './MaterialProfile/MaterialProfile.jsx'
import CreatureProfile from './Creature/CreatureProfile.jsx'
import Home from './Home/Home.jsx'

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/monsters" Component={MonsterPage} />
      <Route path="/materials" Component={MaterialPage} />
      <Route path="/materials/entry/:id" Component={MaterialProfile} />
      <Route path="/creatures" Component={CreaturePage} />
      <Route path ="/creatures/entry/:id" Component={CreatureProfile} />
      {/* <Route path="*" Component={NotFound} /> */}
    </Routes>
    </>
  )
}

export default App
