export const Modes = {
    _isDark: () => {
        const
            SETUP_STRING = localStorage.getItem('portfolioSetup'),
            CURRENT_DARK_MODE = SETUP_STRING && JSON.parse(SETUP_STRING).darkMode

            return CURRENT_DARK_MODE ? CURRENT_DARK_MODE : false
    },
    _setMode: darkMode => {
        const
            SETUP_STRING = localStorage.getItem('portfolioSetup'),
            setup = (SETUP_STRING && JSON.parse(SETUP_STRING)) || {}

        setup.darkMode = darkMode
        localStorage.setItem('portfolioSetup', JSON.stringify(setup))
        return true
    }
}