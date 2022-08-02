import './App.css';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { AnimatedRoutes } from './components/others/AnimatedRoutes';
import { DogContextRoutes } from './components/others/DogContextRoutes';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <AnimatedRoutes />
        <DogContextRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
