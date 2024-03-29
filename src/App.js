import './App.css';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify';

import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { DogContextRoutes } from './components/others/DogContextRoutes';
import { Routes, Route, Outlet, Router, BrowserRouter } from 'react-router-dom';
import { NotFound } from './components/not-found/NotFound';
import { Home } from './components/Home/Home';
import { Main } from './components/catalog/Main';
import { Adopt } from './components/catalog/Adopt';
import { Buy } from './components/catalog/Buy';
import { Login } from './components/user/Login';
import { Register } from './components/user/Register';
import { Profile } from './components/user/profile/Profile';
import { EditProfile } from './components/user/profile/EditProfile';
import { Create } from './components/create-edit/Create';
import { useSelector } from 'react-redux';
import { MyDogs } from './components/catalog/dog/my-dogs/MyDogs';
import { lazy, Suspense } from 'react';
import CircularColor from './components/others/Spinner';
import { useNavigate } from "react-router-dom";

const About = lazy(() => import('./components/about/About/About'));

const ProtectedRoute = ({ data }) => {
  const navigate = useNavigate();
  const hasRedirection = true;
  if (data.user === undefined) {
    navigate(data.redirectPath, { state: { hasRedirection }, replace: false })
  }
  return <Outlet />
};

function App() {

  const user = useSelector((states) => states.user.value.payload);

  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <main>
        <Routes>
          <Route path='/' index element={<Home />} />

          <Route path='/about' element={
            <Suspense fallback={<CircularColor />}>
              <About />
            </Suspense>
          } />

          <Route path='catalog' element={
            <Suspense fallback={<CircularColor />}>
              <Main />
            </Suspense>
          } />


          <Route path='catalog/adopt' element={<Adopt dogsPerPage={4} />} />
          <Route path='catalog/buy' element={<Buy dogsPerPage={4} />} />

          <Route path='login' element={<Login />} />

          <Route path='register' element={
            <Suspense fallback={<CircularColor />}>
              <Register />
            </Suspense>
          } />

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

          <Route path='/catalog/*' element={<DogContextRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
