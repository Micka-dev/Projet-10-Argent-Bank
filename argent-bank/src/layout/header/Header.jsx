import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Logo from '../../assets/images/argentBankLogo.webp'
import './header.css'

import { userSlice } from '../../slices/userSlice'

function Header() {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  // Le code suivant est compatible avec toutes les versions JS (ES5 et ultérieures)
  // const isLogged = user && user.loggedIn
  // Le code suivant supporte ES2020 ou une transpilation avec Babel ou un autre outil pour les environnements plus anciens
  const isLogged = user?.loggedIn

  const handleSignOut = () => {
    localStorage.removeItem('token')

    dispatch(userSlice.actions.logIn(false))
    dispatch(userSlice.actions.openEditForm(false))
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
        {isLogged === false ? (
          // Lien qui permet de se diriger vers la page sign-in
          <NavLink className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        ) : (
          <>
            {/* Lien qui permet de se diriger vers la page dashboard quand connecté */}
            <NavLink to="/dashboard" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {user.userInfos.userName}
            </NavLink>
            <i className="fa-solid fa-gear"></i>
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
