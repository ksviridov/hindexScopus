import { combineReducers } from 'redux'

import app, { Store as AppStore } from './app'
import main, { Store as MainStore } from './main'
import promised, { Store as PropmisedStore } from './promised'
import quote, { Store as QuoteStore } from './quote'

export interface Store {
    app: AppStore,
    main: MainStore,
    promised: PropmisedStore,
    quote: QuoteStore
}

export default combineReducers({ app, main, promised, quote })
