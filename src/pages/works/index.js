import React, { useEffect } from "react"
import { useDispatch } from 'react-redux'
import updateNavbar from '../../redux/actions/updateNavbar'

const Works = () => {

    const _dispatch = useDispatch()

    useEffect(() => {
        _dispatch(updateNavbar({ show: true, currentPage: 'works' }))
    }, [_dispatch])

    return (
        <h1>Works</h1>
    )
}

export default Works