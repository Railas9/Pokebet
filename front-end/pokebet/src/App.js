import './App.css';
import bg_logo from './assets/BG_Logo.svg';
import logo from './assets/PokeBet_Group.svg';

function App() {
  return (
    <div className="App">
      <div className="header">
        <img className="bg-logo" src={bg_logo} alt='PokeBet_BG'></img>
        <img className="logo" src={logo} alt='PokeBet_Logo'></img>
      </div>
    </div>
  );
}

export default App;
