import React from "react"
import "../assets/css/global.scss"
import BackgroundLines from "../components/backgroundLines"
import Header from "../components/header"
import { useSelector } from "react-redux"

const Layout = props => {
    const
        darkMode = useSelector(({ themeMode }) => themeMode.isDark),
        { children } = props,
        CLASS_THEME = darkMode ? 'theme-dark' : 'theme-light'

    return (
        <div className={`portfolioContent ${CLASS_THEME}`}>
            <BackgroundLines />
            {/* <Header /> */}
            <section className="main-content">
                {children}
            </section>
        </div>
    )
}

export default Layout