import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import CreaturePage from './CreaturePage'
import MaterialPage from './MaterialPage'
import NotFound from './NotFound'
import Header from './Header/Header.jsx'
import Materials from './Materials/Materials.jsx'
import CreatureProfile from './Creature/CreatureProfile.jsx'

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" Component={MaterialPage} />
      <Route path="entry/:id" Component={Materials} />
      <Route path="/" Component={CreaturePage} />
      <Route path ="entry/:id" Component={CreatureProfile} />
      <Route path="*" Component={NotFound} />
    </Routes>
    </>
  )
}

export default App
