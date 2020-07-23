import React from "react"
import "./footer.scss"
import LanguageButton from "../languageButton"
import ModeButton from "../modeButton"


const Footer = props => {
    return <footer className="footer">
        <LanguageButton
            changeLanguage={props.changeLanguage}
            currentLanguage={props.currentLanguage}
        />
        <ModeButton
            toggleMode={props.toggleMode}
            darkMode={props.darkMode}
        />
    </footer>
}

export default Footer