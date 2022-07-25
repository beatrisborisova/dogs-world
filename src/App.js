import './App.css';
import { Routes, Route } from "react-router-dom";
import { Adopt } from './components/catalog/Adopt';
import { Buy } from './components/catalog/Buy';
import { Main } from './components/catalog/Main';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { Home } from './components/Home/Home';
import { DogDetails } from './components/catalog/dog/dog-details/DogDetails';
import { Login } from './components/user/Login';
import { Register } from './components/user/Register';
import { Create } from './components/create-edit/Create';
import { Edit } from './components/create-edit/Edit';
import { Profile } from './components/user/profile/Profile';
import { EditProfile } from './components/user/profile/EditProfile';
import { MyDogs } from './components/catalog/dog/my-dogs/MyDogs';
import { Cause } from './components/about/Cause/Cause';
import { Contacts } from './components/about/Contacts/Contacts';

import AuthContext from './contexts/Auth';

function App() {

  let hasUser = 'true'

  return (
    <div className="App">
      <AuthContext.Provider value={hasUser}>

        <Header />
        <main>
          <Routes>
            <Route path='/' index element={<Home />} />

            <Route path='/cause' element={<Cause />} />
            <Route path='/contacts' element={<Contacts />} />

            <Route path='catalog' element={<Main />} />
            <Route path='catalog/adopt' element={<Adopt />} />
            <Route path='catalog/buy' element={<Buy />} />
            <Route path='catalog/adopt/:id' element={<DogDetails />} />
            <Route path='catalog/buy/:id' element={<DogDetails />} />

            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='profile' element={<Profile />} />
            <Route path='edit-profile' element={<EditProfile />} />
            <Route path='my-dogs' element={<MyDogs />} />

            <Route path='create' element={<Create />} />
            <Route path='edit/:id' element={<Edit />} />
          </Routes>
        </main>
        <Footer />
      </AuthContext.Provider >
    </div>

  );
}

export default App;
