import { Route, Routes } from "react-router-dom";
import TutorDashboard from "./TutorDashboard";
import AddCourses from "./AddCourses";

export default function TutorPage(){
    return(
        <div>
            <Routes>
                <Route path="/" element={<TutorDashboard/>}></Route>
                <Route path="add-course" element={<AddCourses/>}></Route>
            </Routes>
        </div>
    )
}