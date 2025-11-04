import './App.css';
import bg_logo from './assets/BG_Logo.svg';
import logo from './assets/PokeBet_Group.png';

function App() {
  return (
    <div className="App">
      <img src={bg_logo} alt='PokeBet_BG'></img>
      <img className="logo" src={logo} alt='PokeBet_Logo'></img>
    </div>
  );
}

export default App;
