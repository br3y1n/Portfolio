import React from "react"
import { Provider } from 'react-redux'
import store from './src/redux/store.js'
import Layout from './src/layouts'

export const wrapRootElement = ({ element }) => (
    <Provider store={store}>
        <Layout>
            {element}
        </Layout>
    </Provider>
)
