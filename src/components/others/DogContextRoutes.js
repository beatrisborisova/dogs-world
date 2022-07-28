import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"


import { useSelector } from "react-redux";
import { DogDetails } from "../catalog/dog/dog-details/DogDetails";
import DogContext from "../../contexts/Dog";
import { useEffect, useState } from "react";
import * as dogService from '../../services/dogs';
import { Edit } from "../create-edit/Edit";

const ProtectedRoute = ({ data }) => {
    if (data.user === undefined) {
        return <Navigate to={data.redirectPath} replace />;
    }
    return <Outlet />
};

export const DogContextRoutes = () => {

    const [dogState, setDogState] = useState(null);
    const user = useSelector((states) => states.user.value.payload);
    const location = useLocation();

    const locationasd = location.pathname.split('/');
    const dogId = locationasd[locationasd.length - 1];

    useEffect(() => {
        dogService.getDogById(dogId)
            .then(res => setDogState(res))
    }, [dogId])

    console.log('dogState', dogState);

    return (
        <DogContext.Provider value={dogState}>
            <Routes >
                <Route element={<ProtectedRoute data={{ user, redirectPath: 'login' }} />}>
                    <Route path='catalog/buy/:id' element={<DogDetails />} />
                </Route>

                <Route element={<ProtectedRoute data={{ user, redirectPath: 'login' }} />}>
                    <Route path='catalog/adopt/:id' element={<DogDetails />} />
                </Route>

                <Route element={<ProtectedRoute data={{ user, redirectPath: 'login' }} />}>
                    <Route path='edit/:id' element={<Edit />} />
                </Route>

            </Routes >
        </DogContext.Provider>
    )
}