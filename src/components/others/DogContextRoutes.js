import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { DogDetails } from "../catalog/dog/dog-details/DogDetails";
import { DogProvider } from "../../contexts/Dog";
import { Edit } from "../create-edit/Edit";
import { NotFound } from "../not-found/NotFound";

const ProtectedRoute = ({ data }) => {
    if (data.user === undefined) {
        return <Navigate to={data.redirectPath} replace />;
    }
    return <Outlet />
};

export const DogContextRoutes = () => {

    const user = useSelector((states) => states.user.value.payload);

    return (
        <DogProvider>
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

                <Route element={<ProtectedRoute data={{ user, redirectPath: 'login' }} />}>
                    <Route path='my-dogs/:id' element={<DogDetails />} />
                </Route>


            </Routes >
        </DogProvider>
    )
}