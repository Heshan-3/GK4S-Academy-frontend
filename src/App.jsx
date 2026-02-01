import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import AdminDashboard from './pages/admin/AdminDashboard'
import TutorPage from './pages/tutors/tutorPage'
import StudentDashboard from './pages/students/StudentDashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes path='/*'>
        <Route path="/admin/*" element={<AdminDashboard/>}></Route>
        <Route path="/tutor/*" element={<TutorPage/>}></Route>
        <Route path="/student/*" element={<StudentDashboard/>}></Route>
        <Route path="/*" element={<Homepage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
