import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { DogDetails } from "../catalog/dog/dog-details/DogDetails";
import { Edit } from "../create-edit/Edit";

const ProtectedRoute = ({ data }) => {

    const hasRedirection = true;
    if (data.user === undefined) {
        return <Navigate to={data.redirectPath} state={hasRedirection} />;
    }
    return <Outlet />
};

export const DogContextRoutes = () => {

    const user = useSelector((states) => states.user.value.payload);

    return (
        <Routes >
            <Route element={<ProtectedRoute data={{ user, redirectPath: '/login' }} />}>
                <Route path='buy/:id' element={<DogDetails />} />
            </Route>

            <Route element={<ProtectedRoute data={{ user, redirectPath: '/login' }} />}>
                <Route path='adopt/:id' element={<DogDetails />} />
            </Route>

            <Route element={<ProtectedRoute data={{ user, redirectPath: '/login' }} />}>
                <Route path='edit/:id' element={<Edit />} />
            </Route>

            <Route element={<ProtectedRoute data={{ user, redirectPath: '/login' }} />}>
                <Route path='edit/:id' element={<Edit />} />
            </Route>

            <Route element={<ProtectedRoute data={{ user, redirectPath: '/login' }} />}>
                <Route path='my-dogs/:id' element={<DogDetails />} />
            </Route>
        </Routes >
    )
}