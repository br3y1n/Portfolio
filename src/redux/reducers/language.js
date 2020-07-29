import { Locales } from '../../assets/helpers/locales'
import { type as changeLanguage } from '../actions/changeLanguage'

const initialState = Locales._getLanguage()

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case changeLanguage: {
            Locales._setLanguage(payload)
            return payload
        }

        default:
            return state
    }
}

export default reducer