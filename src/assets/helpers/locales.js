export const Locales = {
    _getLanguage: () => {
        const
            SETUP_STRING = localStorage.getItem('portfolioSetup'),
            DEFAULT_LANGUAGE = 'EN',
            CURRENT_LANGUAGE = SETUP_STRING ? JSON.parse(SETUP_STRING).language : undefined || navigator.language || navigator.userLanguage,
            LANGUAGE_SETUP = CURRENT_LANGUAGE
                ? CURRENT_LANGUAGE.toLowerCase().includes('es')
                    ? 'ES'
                    : DEFAULT_LANGUAGE
                : DEFAULT_LANGUAGE

        return LANGUAGE_SETUP
    },
    _setLanguage: language => {
        const
            SETUP_STRING = localStorage.getItem('portfolioSetup'),
            setup = (SETUP_STRING && JSON.parse(SETUP_STRING)) || {}

        setup.language = language
        localStorage.setItem('portfolioSetup', JSON.stringify(setup))
        return true
    }
}


















