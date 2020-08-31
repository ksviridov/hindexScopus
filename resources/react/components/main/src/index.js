import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

import App from './App'

const store = createStore(reducers, applyMiddleware(thunk))

ReactDOM.render(<Provider store={store}><App /></Provider>, global.app)
