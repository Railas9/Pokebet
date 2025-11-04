import "./App.css"
import bg_logo from "./assets/BG_Logo.svg"
import logo from "./assets/PokeBet_Group.png"
import PokemonSelector from "../src/component/pokemonSelector/PokemonSelector.jsx"

function App() {
	const handleSelectClick = () => {
		console.log("Clic !")
	}
	return (
		<div className='App'>
			<img src={bg_logo} alt='PokeBet_BG'></img>
			<img className='logo' src={logo} alt='PokeBet_Logo'></img>

			<PokemonSelector onClick={handleSelectClick} />
		</div>
	)
}

export default App
