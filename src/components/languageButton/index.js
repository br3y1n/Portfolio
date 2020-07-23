import React from "react"
import "./languageButton.scss"

const LanguageButton = props => {
    const IS_EN = props.currentLanguage === 'EN'

    return <div className="language-button">
        <ul >
            <li className={IS_EN ? 'active' : undefined} onClick={() => props.changeLanguage('EN')}>EN</li>
            <li className="middle">|</li>
            <li className={!IS_EN ? 'active' : undefined} onClick={() => props.changeLanguage('ES')}>ES</li>
        </ul>
    </div >
}

export default LanguageButton