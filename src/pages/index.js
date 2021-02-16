import React, { useState, useCallback } from "react"
import "./loaderPage.scss"
import Terminal from '../components/terminal'
import Loader from '../components/loader'
import Footer from '../components/footer'
import { navigate } from 'gatsby'
import { chainEvents } from '../assets/helpers/chainEvents'

const LoaderPage = () => {
    const
        [showTerminal, setShowTerminal] = useState(true),
        [showLoader, setShowLoader] = useState(false),
        [retract, setRetract] = useState(false)


    const _hideTerminal = useCallback(() => {
        setShowTerminal(false)

        chainEvents(
            [
                [() => { setShowLoader(true) }, 500],
                [() => { setRetract(true) }, 1800],
                [() => { navigate('/home') }, 400]
            ]
        )
    }, [])

    return (
        <div className="loader-page noselect">
            {!showLoader && <Terminal className={`terminal ${showTerminal ? 'active' : ''}`} hideTerminal={_hideTerminal} />}
            { showLoader && <Loader className={`loader ${retract ? 'retract' : ''}`} />}
            <Footer className={retract ? 'retract' : ''} />
        </div>
    )
}

export default LoaderPage