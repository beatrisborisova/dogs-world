import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"


import { useSelector } from "react-redux";
import { Home } from "../Home/Home";
import { Cause } from "../about/Cause/Cause";
import { Contacts } from "../about/Contacts/Contacts";
import { Main } from "../catalog/Main";
import { Adopt } from "../catalog/Adopt";
import { Buy } from "../catalog/Buy";
import { Login } from "../user/Login";
import { Register } from "../user/Register";
import { Profile } from "../user/profile/Profile";
import { EditProfile } from "../user/profile/EditProfile";
import { MyDogs } from "../catalog/dog/my-dogs/MyDogs";
import { Create } from "../create-edit/Create";
import { Edit } from "../create-edit/Edit";
import { NotFound } from "../not-found/NotFound";

import { AnimatePresence } from 'framer-motion';

const ProtectedRoute = ({ data }) => {
    if (data.user === undefined) {
        return <Navigate to={data.redirectPath} replace />;
    }
    return <Outlet />
};

export const AnimatedRoutes = () => {


    const user = useSelector((states) => states.user.value.payload);
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>

                <Route path='/' index element={<Home />} />

                <Route path='/cause' element={<Cause />} />
                <Route path='/contacts' element={<Contacts />} />

                <Route path='catalog' element={<Main />} />
                <Route path='catalog/adopt' element={<Adopt dogsPerPage={4} />} />
                <Route path='catalog/buy' element={<Buy dogsPerPage={4} />} />

                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />


                <Route element={<ProtectedRoute data={{ user, redirectPath: 'login' }} />}>
                    <Route path='profile' element={<Profile />} />
                </Route>

                <Route element={<ProtectedRoute data={{ user, redirectPath: 'login' }} />}>
                    <Route path='edit-profile' element={<EditProfile />} />
                </Route>

                <Route element={<ProtectedRoute data={{ user, redirectPath: 'login' }} />}>
                    <Route path='my-dogs' element={<MyDogs dogsPerPage={4} />} />
                </Route>

                <Route element={<ProtectedRoute data={{ user, redirectPath: 'login' }} />}>
                    <Route path='create' element={<Create />} />
                </Route>


            </Routes>
        </AnimatePresence>

    )
}