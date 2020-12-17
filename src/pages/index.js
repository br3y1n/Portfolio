import React, { useEffect, useState, useCallback } from "react"
import "./loaderPage.scss"
import { useDispatch } from 'react-redux'
import updateNavbar from '../redux/actions/updateNavbar'
import Terminal from '../components/terminal'
import Loader from '../components/loader'
import { navigate } from 'gatsby'

const LoaderPage = () => {
    const
        [showTerminal, setShowTerminal] = useState(false),
        [showLoader, setShowLoader] = useState(false)

    const _dispatch = useDispatch()

    const _hideTerminal = useCallback(() => {
        setShowTerminal(false)
        setTimeout(() => { setShowLoader(true) }, 500)
    }, [])

    const _hideLoader = useCallback(() => { navigate('/home') }, [])


    useEffect(() => {
        _dispatch(updateNavbar({ show: false, currentPage: 'LoaderPage' }))
        setTimeout(() => { setShowTerminal(true) }, 1)
    }, [_dispatch])

    return (
        <div className="loader-page noselect">
            <Terminal className={`terminal ${showTerminal ? 'active' : ''}`} hideTerminal={_hideTerminal} />
            <Loader className={`loader ${showLoader ? 'active' : ''}`} hideLoader={_hideLoader} />
        </div>
    )
}

export default LoaderPage