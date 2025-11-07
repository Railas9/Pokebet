import React from "react"
import { useParams } from "react-router-dom"
import logo from "../assets/PokeBet_Group.svg"
import bg_logo from "../assets/BG_Logo.svg"
import ActionButton from "../component/actionButton/ActionButton"
import { useNavigate } from "react-router-dom";

function ResultPage() {
	const { side, winner } = useParams()

    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate("/");
    };

	let message = ""

	if (!side || !winner) {
		message = "Aucun résultat disponible."
	} else if (side === winner) {
		message = "Success"
	} else if (winner === "draw") {
		message = "Draw"
	} else {
		message = "Failure"
	}

    const resultSrc = message ? require(`../assets/results/${message}.svg`) : null

    return (
        <>
            <div className='header'>
                <img className='bg-logo' src={bg_logo} alt='PokeBet_BG' />
                <img className='logo' src={logo} alt='PokeBet_Logo' />
            </div>
            <div className='main-content'>
                <div className="result-content">
                    <img
                        className='result-vector'
                        src={resultSrc ? (resultSrc.default || resultSrc) : undefined}
                        alt='Result_Logo'
                    />
                    <ActionButton className="result-button" type="shuffle" text={"Recommencer"} onClick={goToHomePage} />
                </div>
            </div>
        </>
    )
}

export default ResultPage