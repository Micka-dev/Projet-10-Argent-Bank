import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../../page/home/Home'
import Error from '../../page/error/Error'
import Dasboard from '../../page/dasboard/Dashboard'
import SignIn from '../../page/signIn/SignIn'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dasboard />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default Router
