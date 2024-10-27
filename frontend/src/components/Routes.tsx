import { Routes as AppRoutes, BrowserRouter, Route } from "react-router-dom";
import Notes from "../pages/NotesPage";
import ProfilePage from "../pages/ProfilePage";
import HomePage from "../pages/HomePage";
import SingIn from "../pages/SignInPage";
import SignUp from "../pages/SignUpPage";

const Routes = () => {
    return (
        <BrowserRouter>
            <AppRoutes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/signin" element={<SingIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/profile" element={<ProfilePage />} />
            </AppRoutes>
        </BrowserRouter>
    );
}

export default Routes;
