import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoadingScreen from './components/LoadingScreen.jsx'
import Daksha from './pages/Daksha.jsx'
import Team from './pages/Team.jsx'
import Competitions from './pages/Competitions.jsx'
import Workshops from './pages/Workshops.jsx'
import About from './pages/About.jsx'
import ProShows from './pages/ProShows.jsx'
import Exhibitions from './pages/Exhibitions.jsx'
import Talks from './pages/Talks.jsx'
import Home from './pages/Home.jsx'

function App() {
  const [loading, setLoading] = useState(true)

  return (
<<<<<<< HEAD
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Routes>
        <Route path="/" element={<Navigate to="/daksha" replace />} />
        <Route path="/daksha" element={<Daksha />} />
        <Route path="/team" element={<Team />} />
        <Route path="/competitions" element={<Competitions />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/proshows" element={<ProShows />} />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path="/talks" element={<Talks />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/daksha" replace />} />
      </Routes>
    </>
=======
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/daksha" element={<Daksha />} />
      <Route path="/team" element={<Team />} />
      <Route path="/competitions" element={<Competitions />} />
      <Route path="/workshops" element={<Workshops />} />
      <Route path="/proshows" element={<ProShows />} />
      <Route path="/exhibitions" element={<Exhibitions />} />
      <Route path="/talks" element={<Talks />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
>>>>>>> 6843c7790ec8a60e526c3c46397fd21b91c2433a
  )
}

export default App
