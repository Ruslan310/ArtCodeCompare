import React from 'react'
import {render} from 'react-dom'
import App from './App'
import {createStore, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import saga from "redux-saga"
import {rootReducer} from "./redux/rootReducer"
import rootSaga from '../src/saga/saga'
import {composeWithDevTools} from "redux-devtools-extension"

const sagaMiddleware = saga()
const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware))

// export const store = createStore(rootReducer, enhancer)

const store = createStore(rootReducer, enhancer)
sagaMiddleware.run(rootSaga)

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)
render(app, document.getElementById('root')
);

