import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorBoundary from './ErrorBounday.jsx'
import { store } from './redux/store.js'
import {Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
    <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
)
