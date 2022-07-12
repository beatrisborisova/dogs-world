import './App.css';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { Home } from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
