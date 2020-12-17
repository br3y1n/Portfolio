import React from "react"
import "./footer.scss"
import LanguageButton from "../languageButton"
import ModeButton from "../modeButton"


const Footer = () => {
    return (
        <footer className="footer noselect">
            <LanguageButton />
            <ModeButton />
        </footer>
    )
}

export default React.memo(Footer)