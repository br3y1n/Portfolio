import { Modes } from '../../assets/helpers/modes'
import { type as setMode } from '../actions/setMode.js'

const initialState = {
    isDark: Modes._isDark()
}

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case setMode: {
            Modes._setMode(payload)
            return { isDark: payload }
        }

        default:
            return state

    }
}

export default reducer