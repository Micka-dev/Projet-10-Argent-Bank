import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import Logo from '../../assets/images/argentBankLogo.png'
import './header.css'

function Header() {
  // true pour tester le css =>après remettre à false
  const [isLogged, setisLogged] = useState(true)

  const userName = 'Micka'

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setisLogged(false)
  }

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {!isLogged ? (
          // Lien qui permet de se diriger vers la page sign-in
          <NavLink className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        ) : (
          <>
            {/* Permet de recharger la page en faisant une nouvelle requête */}
            <NavLink to="/dashboard" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {userName}
              <i class="fa-solid fa-gear"></i>
            </NavLink>
            {/* Permet de se déconnecter et de retourner à la page sign-in */}
            <NavLink
              to="/sign-in"
              className="main-nav-item"
              onClick={handleSignOut}
            >
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Header
