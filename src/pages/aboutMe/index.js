import React, { useEffect } from "react"
import { useDispatch } from 'react-redux'
import updateNavbar from '../../redux/actions/updateNavbar'

const About = () => {

    const _dispatch = useDispatch()

    useEffect(() => {
        _dispatch(updateNavbar({ show: true, currentPage: 'aboutMe' }))
    }, [_dispatch])

    return (
        <h1>About</h1>
    )
}

export default About