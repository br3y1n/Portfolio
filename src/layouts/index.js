import React from "react"
import "../assets/css/global.scss"
import BackgroundLines from "../components/backgroundLines"
import Header from "../components/header"
import Footer from "../components/footer"
import { useSelector } from "react-redux"

const Layout = props => {
    const
        darkMode = useSelector(({ themeMode }) => themeMode.isDark),
        showNavbar = useSelector(({ navbar }) => navbar.show),
        { children } = props,
        CLASS_THEME = darkMode ? 'theme-dark' : 'theme-light'

    return (
        <div className={`portfolioContent ${CLASS_THEME}`}>
            <BackgroundLines />
            <Header />
            <section className={`main-content ${showNavbar ? 'with-header' : ''}`}>
                {children}
            </section>
            <Footer />
        </div >
    )
}

export default Layout