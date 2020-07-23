import React from "react"
import "./modeButton.scss"

const ModeButton = props => {

    return (
        <div className="mode-button">
            <div className='toggle-button' onClick={props.toggleMode}>
                <div className={`inner-circle ${props.darkMode ? 'active' : undefined}`}></div>
            </div>
        </div>
    )
}

export default ModeButton