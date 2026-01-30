import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'

function App() {

  return (
    <BrowserRouter>
      <Routes path='/*'>
        <Route path="/*" element={<Homepage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
