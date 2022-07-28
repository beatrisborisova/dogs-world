import './App.css';

import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { AnimatedRoutes } from './components/others/AnimatedRoutes';

// import { useSelector } from 'react-redux';

// import { Home } from './components/Home/Home';
// import { DogDetails } from './components/catalog/dog/dog-details/DogDetails';
// import { Login } from './components/user/Login';
// import { Register } from './components/user/Register';
// import { Create } from './components/create-edit/Create';
// import { Edit } from './components/create-edit/Edit';
// import { Profile } from './components/user/profile/Profile';
// import { EditProfile } from './components/user/profile/EditProfile';
// import { MyDogs } from './components/catalog/dog/my-dogs/MyDogs';
// import { Cause } from './components/about/Cause/Cause';
// import { Contacts } from './components/about/Contacts/Contacts';
// import { NotFound } from './components/not-found/NotFound';

// import { Adopt } from './components/catalog/Adopt';
// import { Buy } from './components/catalog/Buy';
// import { Main } from './components/catalog/Main';

function App() {
  return (
    <div className="App">

      <Header />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>

  );
}

export default App;
