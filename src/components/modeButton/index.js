import React from "react"
import "./modeButton.scss"
import { useDispatch, useSelector } from "react-redux"
import setMode from '../../redux/actions/setMode'

const ModeButton = () => {
    const
        darkMode = useSelector(({ themeMode }) => themeMode.isDark),
        dispatch = useDispatch()

    return (
        <div className="mode-button">
            <div className='toggle-button' onClick={() => dispatch(setMode(!darkMode))}>
                <div className={`inner-circle ${darkMode ? 'active' : ''}`}></div>
            </div>
        </div>
    )
}

export default ModeButton