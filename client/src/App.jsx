import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Daksha from './pages/Daksha.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/daksha" replace />} />
      <Route path="/daksha" element={<Daksha />} />
      <Route path="*" element={<Navigate to="/daksha" replace />} />
    </Routes>
  )
}

export default App
