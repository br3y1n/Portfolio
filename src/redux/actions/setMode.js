export const type = 'setThemeMode'

const setThemeMode = isDark => {
    return {
        type,
        payload: isDark
    }
}

export default setThemeMode