export const type = 'changeLanguage'

const changeLanguage = language => {
    return {
        type,
        payload: language
    }
}

export default changeLanguage