import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store,persistor} from '../src/redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
//THE PERSISITGATE IS USED TO COVER EVERYTHING


ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
    <App />
  </Provider>
  </PersistGate>
);
