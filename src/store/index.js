import { configureStore } from 'redux-starter-kit'

import {configReducer} from './reducers'

const store = configureStore({ reducer: configReducer })

export { store as default }