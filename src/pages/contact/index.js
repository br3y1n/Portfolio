import React, { useEffect } from "react"
import { useDispatch } from 'react-redux'
import updateNavbar from '../../redux/actions/updateNavbar'

const Contact = () => {

    const _dispatch = useDispatch()

    useEffect(() => {
        _dispatch(updateNavbar({ show: true, currentPage: 'contact' }))
    }, [_dispatch])

    return (
        <h1>Contact</h1>
    )
}

export default Contact