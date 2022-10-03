import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Trossö 2122
        </p>
        <a
          className="App-link"
          href="/dash"
          // target="_blank"
          // rel="noopener noreferrer"
        >
          Öppna kontrollpanel
        </a>
      </header>
    </div>
  );
}

export default App;
