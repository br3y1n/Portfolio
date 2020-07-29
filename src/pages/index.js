import React, { useEffect, useState } from "react"
import "./loaderPage.scss"
import { useDispatch } from 'react-redux'
import updateNavbar from '../redux/actions/updateNavbar'
import Terminal from '../components/terminal'
import Loader from '../components/loader'
import { navigate } from 'gatsby'

const LoaderPage = () => {
    const
        dispatch = useDispatch(),
        [showTerminal, setShowTerminal] = useState(false),
        [showLoader, setShowLoader] = useState(false),
        _hideTerminal = () => {
            setShowTerminal(false)
            setTimeout(() => { setShowLoader(true) }, 500)
        },
        _hideLoader = () => {
            navigate('/home')
        }


    useEffect(() => {
        dispatch(updateNavbar({ show: true, currentPage: 'LoaderPage' }))
        setTimeout(() => { setShowTerminal(true) }, 1)
    }, [])

    return (
        <div className="loader-page">
            <Terminal className={`terminal ${showTerminal ? 'active' : ''}`} hideTerminal={_hideTerminal} />
            <Loader className={`loader ${showLoader ? 'active' : ''}`} hideLoader={_hideLoader} />
        </div>
    )
}

export default LoaderPage