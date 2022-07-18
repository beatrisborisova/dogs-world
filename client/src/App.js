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

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path='/' index element={<Home />} />

          <Route path='catalog' element={<Main />} />
          <Route path='catalog/adopt' element={<Adopt />} />
          <Route path='catalog/buy' element={<Buy />} />
          <Route path='catalog/adopt/:id' element={<DogDetails />} />
          <Route path='catalog/buy/:id' element={<DogDetails />} />

          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route path='create' element={<Create />} />
          <Route path='edit/:id' element={<Edit />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
