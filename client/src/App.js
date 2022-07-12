import './App.css';
import { Routes, Route } from "react-router-dom";
import { Adopt } from './components/catalog/Adopt';
import { Buy } from './components/catalog/Buy';
import { Main } from './components/catalog/Main';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { Home } from './components/Home/Home';

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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
