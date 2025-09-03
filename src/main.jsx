import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { store } from './app/store.jsx'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
  {/* <StrictMode> */}
    <App />
  {/* </StrictMode> */}
  </Provider>
  </BrowserRouter>,
)
