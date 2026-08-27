import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Daksha from './pages/Daksha.jsx'
import Team from './pages/Team.jsx'
import Competitions from './pages/Competitions.jsx'
import Workshops from './pages/Workshops.jsx'
import About from './pages/About.jsx'
import Talks from './pages/Talks.jsx'
import Exhibitions from './pages/Exhibitions.jsx'
import ProShows from './pages/ProShows.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/daksha" replace />} />
      <Route path="/daksha" element={<Daksha />} />
      <Route path="/team" element={<Team />} />
      <Route path="/competitions" element={<Competitions />} />
      <Route path="/workshops" element={<Workshops />} />
      <Route path="/about" element={<About />} />
      <Route path="/talks" element={<Talks />} />
      <Route path="/exhibitions" element={<Exhibitions />} />
      <Route path="/proshows" element={<ProShows />} />
      <Route path="*" element={<Navigate to="/daksha" replace />} />
    </Routes>
  )
}

export default App
