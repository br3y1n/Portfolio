import React from "react"
import "./modeButton.scss"
import { useDispatch, useSelector } from "react-redux"
import setMode from '../../redux/actions/setMode'
import sun from "./assets/sun.svg"
import moon from "./assets/moon.svg"


const ModeButton = () => {
    const
        isDarkMode = useSelector(({ themeMode }) => themeMode.isDark),
        dispatch = useDispatch()

    return (
        <div className="mode-button">
            <div className='toggle-button' onClick={() => dispatch(setMode(!isDarkMode))}>
                <div className={`inner-circle ${isDarkMode ? 'active' : ''}`}>
                    <img src={isDarkMode ? moon : sun} />
                </div>
            </div>
        </div>
    )
}

export default ModeButton