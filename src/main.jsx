import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import './css/index.css'
import './css/main.css'
import App from './App.jsx'
import store from './store.js'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
