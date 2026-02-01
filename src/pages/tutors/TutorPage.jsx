import { Route, Routes } from "react-router-dom";
import TutorDashboard from "./TutorDashboard";
import AddCourses from "./AddCourses";
import ApproveRequests from "./ApproveRequests";

export default function TutorPage(){
    return(
        <div>
            <Routes>
                <Route path="/" element={<TutorDashboard/>}></Route>
                <Route path="add-course" element={<AddCourses/>}></Route>
                <Route path="requested-courses" element={<ApproveRequests/>}></Route>
            </Routes>
        </div>
    )
}