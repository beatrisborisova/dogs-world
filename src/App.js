import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { NotFound } from './components/not-found/NotFound';
import { AnimatedRoutes } from './components/others/AnimatedRoutes';
import { DogContextRoutes } from './components/others/DogContextRoutes';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <AnimatedRoutes />
        <DogContextRoutes />
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
