import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import TutorDashboard from './pages/tutors/TutorDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes path='/*'>
        <Route path="/admin/*" element={<AdminDashboard/>}></Route>
        <Route path="/tutor/*" element={<TutorDashboard/>}></Route>
        <Route path="/*" element={<Homepage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
