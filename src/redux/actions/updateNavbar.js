export const type = 'updateNavbar'

const updateNavbar = data => {
    return {
        type,
        payload: data
    }
}

export default updateNavbar