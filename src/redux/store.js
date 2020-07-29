import { createStore, combineReducers } from 'redux'
import * as allReducers from './reducers/index.js'

const
    reducers = combineReducers({ ...allReducers }),
    store = createStore(reducers)

export default store

