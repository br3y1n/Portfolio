import React from "react"
import "./backgroundLines.scss"


const BackgroundLines = () => {
    return (
        <div className="backgroundLines">
            <span className="line-one"></span>
            <span className="line-two"></span>
            <span className="line-three"></span>
            <span className="line-four"></span>
        </div>
    )
}

export default React.memo(BackgroundLines, () => true) 