import logo from "./logo.svg";
import "./App.css";
import Crossword from "./components/Crossword";

function App() {
  return (
    <div>
      <div className="jumbotran text-center">
        <h1>Crossword Composer</h1>
      </div>
      <Crossword />
    </div>
  );
}

export default App;
