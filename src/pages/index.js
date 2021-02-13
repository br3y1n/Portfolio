import React, { useState, useCallback } from "react"
import "./loaderPage.scss"
import Terminal from '../components/terminal'
import Loader from '../components/loader'
import Footer from '../components/footer'
import { navigate } from 'gatsby'

const LoaderPage = () => {
    const
        [showTerminal, setShowTerminal] = useState(true),
        [showLoader, setShowLoader] = useState(false)


    const _hideTerminal = useCallback(() => {
        setShowTerminal(false)
        setTimeout(() => { setShowLoader(true) }, 500)
    }, [])

    const _hideLoader = useCallback(() => { navigate('/home') }, [])

    return (
        <div className="loader-page noselect">
            <Terminal className={`terminal ${showTerminal ? 'active' : ''}`} hideTerminal={_hideTerminal} />
            <Loader className={`loader ${showLoader ? 'active' : ''}`} hideLoader={_hideLoader} />
            <Footer />
        </div>
    )
}

export default LoaderPage