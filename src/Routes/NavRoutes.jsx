import { Routes, Route } from "react-router-dom";
import { SignIn } from "../components/SignIn";
import { SignUp } from "../components/Signup";
import { MealCalendar } from "../components/MealCalendar";

const NavRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<SignIn/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/" element={<MealCalendar/>}></Route>
        </Routes>
    )
}
export { NavRoutes }