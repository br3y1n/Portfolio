import React from "react"
import "./footer.scss"
import LanguageButton from "../languageButton"
import ModeButton from "../modeButton"


const Footer = (props) => {

    return (
        <footer className={`footer noselect ${props.className}`}>
            <div className="horizontal-rotation">
                <div className="align-end">
                    <LanguageButton />
                </div>
                <div className="align-end">
                    <ModeButton />
                </div>
            </div>
        </footer>
    )
}

export default React.memo(Footer)