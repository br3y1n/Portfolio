import React, { Component, Children } from "react"
import "../assets/css/global.scss"
import BackgroundLines from "../components/backgroundLines"
import Header from "../components/header"
import Footer from "../components/footer"
import { Locales } from '../assets/helpers/locales.js'
import { Modes } from '../assets/helpers/modes.js'

class Layout extends Component {
    state = {
        darkMode: Modes._isDark(),
        language: Locales._getLanguage()
    }

    _toggleMode = () => {
        this.setState(prevState => {
            Modes._setMode(!prevState.darkMode)
            return ({ darkMode: !prevState.darkMode })
        })
    }

    _changeLanguage = language => {
        Locales._setLanguage(language)
        this.setState({ language: language })
    }

    render() {
        const
            CLASS_THEME = this.state.darkMode ? 'theme-dark' : 'theme-light',
            { children, notShowHeader, target } = this.props,
            { language } = this.state

        return (
            <div className={`portfolioContent ${CLASS_THEME}`}>
                <BackgroundLines />
                {!notShowHeader && <Header language={language} target={target} />}
                <section className={`main-content ${notShowHeader ? '' : 'with-header'}`}>
                    {children && Children.map(children, child => React.cloneElement(child, { language: language }))}
                </section>
                <Footer
                    changeLanguage={this._changeLanguage}
                    currentLanguage={this.state.language}
                    toggleMode={this._toggleMode}
                    darkMode={this.state.darkMode}
                />
            </div >
        )
    }
}

export default Layout