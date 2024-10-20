import logo from './logo.svg';
import './App.css';
import PracticeIndexedDB from "./PracticeIndexedDB";
import PracticeWebWorker from "./PracticeWebWorker";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>ReactJS Advanced Practice 1</code>
        </p>
          <PracticeWebWorker/>
      </header>
    </div>
  );
}

export default App;
