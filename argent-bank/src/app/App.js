import React from 'react'
// import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
// import { store } from './store'

import Router from '../routers/router/Router.jsx'
import Header from '../layout/header/Header.jsx'
import Footer from '../layout/footer/Footer.jsx'

function App() {
  return (
    // <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
    // </Provider>
    // <div>hello</div>
  )
}

export default App
