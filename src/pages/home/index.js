import React, { useEffect } from "react"
import { useDispatch } from 'react-redux'
import updateNavbar from '../../redux/actions/updateNavbar'

const Home = () => {

    const _dispatch = useDispatch()

    useEffect(() => {
        _dispatch(updateNavbar({ show: true, currentPage: 'home' }))
    }, [_dispatch])

    return (
        <h1>Home</h1>
    )
}

export default Home