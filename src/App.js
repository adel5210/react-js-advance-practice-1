import logo from './logo.svg';
import './App.css';
import PracticeIndexedDB from "./PracticeIndexedDB";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>ReactJS Advanced Practice 1</code>
        </p>
        <PracticeIndexedDB/>
      </header>
    </div>
  );
}

export default App;
