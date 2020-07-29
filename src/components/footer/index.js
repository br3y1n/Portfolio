import React from "react"
import "./footer.scss"
import LanguageButton from "../languageButton"
import ModeButton from "../modeButton"


const Footer = () => {
    return (
        <footer className="footer">
            <LanguageButton />
            <ModeButton />
        </footer>
    )
}

export default Footer