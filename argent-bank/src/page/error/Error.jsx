// Import React Router
import { Link } from 'react-router-dom'
// Import du CSS de la page
import './error.css'
// Composant qui permet l'affichage de la page erreur 404

function Error() {
  document.title = '404 - Kasa'

  return (
    <div className="error-container ">
      <h1 className="error-title">404</h1>
      <p className="error-text">
        Oups! La page que vous demandez n'existe pas.
      </p>
      <Link to="/" className="error404-container_link">
        Retourner sur la page d’accueil
      </Link>
    </div>
  )
}

export default Error
