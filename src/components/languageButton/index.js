import React from "react"
import "./languageButton.scss"
import changeLanguage from '../../redux/actions/changeLanguage'
import { useDispatch, useSelector } from 'react-redux'

const LanguageButton = () => {
    const
        language = useSelector(({ language }) => language),
        dispatch = useDispatch(),
        IS_EN = language === 'EN'

    return (
        <div className="language-button">
            <ul >
                <li className={IS_EN ? 'active' : ''} onClick={() => dispatch(changeLanguage('EN'))}>EN</li>
                <li className="middle">|</li>
                <li className={!IS_EN ? 'active' : ''} onClick={() => dispatch(changeLanguage('ES'))}>ES</li>
            </ul>
        </div >
    )
}

export default LanguageButton