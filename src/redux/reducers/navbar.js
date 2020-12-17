import { type as updateNavbar } from '../actions/updateNavbar'

const initialState = {
    show: false,
    currentPage: ''
}

function reducer(state = initialState, { type, payload }) {
    switch (type) {
        case updateNavbar: {
            return {
                ...state,
                ...payload
            }
        }

        default:
            return state
    }
}

export default reducer