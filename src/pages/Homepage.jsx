import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import About from "./About";
import Home from "./Home";
import Contact from "./Contact";
import Course from "./Course";
import Tutor from "./Tutor";
import { Footer } from "../components/Footer";
import Login from "./Login";
import Register from "./Regster";

export default function Homepage(){
    return(
        <>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/about" element={<About/>}></Route>
                    <Route path="/contact" element={<Contact/>}></Route>
                    <Route path="/course" element={<Course/>}></Route>
                    <Route path="/tutors" element={<Tutor/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                </Routes>
                <Footer />
            </div>
        </>
    )
}