import { Route, Routes } from "react-router-dom";
import TutorDashboard from "./TutorDashboard";
import AddCourses from "./AddCourses";
import ApproveRequests from "./ApproveRequests";
import AddMaterial from "./AddMaterial";

export default function TutorPage(){
    return(
        <div>
            <Routes>
                <Route path="/" element={<TutorDashboard/>}></Route>
                <Route path="add-course" element={<AddCourses/>}></Route>
                <Route path="requested-courses" element={<ApproveRequests/>}></Route>
                <Route path="courses/:courseId/materials/add" element={<AddMaterial/>}></Route>
            </Routes>
        </div>
    )
}