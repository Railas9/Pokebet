import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainPage from "./pages/mainPage.jsx"
import FightPage from "./pages/fightPage.jsx"
import ResultPage from "./pages/resultPage.jsx"

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/fight/:side/:ids/:probas" element={<FightPage />} />
					<Route path="/results/:side/:winner" element={<ResultPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
