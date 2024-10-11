import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import './signIn.css'

import axios from 'axios'

import { logIn } from '../../actions/user.actions'
import { getUserInfos } from '../../actions/user.actions'

function SignIn() {
  const dispatch = useDispatch()

  // Gère l'état local du composant et met à jour les valeurs des champs de formulaire (email & mot de passe) en utilisant name et value
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Gère l'état erreur
  const [error, setError] = useState('')

  // Gère les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const navigate = useNavigate()

  // Fonction qui vérifie la validité du token
  function isTokenValid(token) {
    // Transformation du "token" en tableau afin de récupérer par la suite le header, le payload et la signature de manière indépendante
    const arrayToken = token.split('.')
    // Décodage de la chaîne de données (codée en encodage Base64) grâce à la fonction atob() ; et je pare les données avec JSON.parse() pour qu'elles deviennent un objet JavaScript ; ce qui va me permettre de récupérer le timestamp d'expiration du token contenu dans l'objet
    const tokenPayLoad = JSON.parse(atob(arrayToken[1]))
    // Déclaration de la variable "now" correspondant au timestamp au moment T (la fonction getTime() permet de donner le timestamp)
    const now = Math.floor(new Date().getTime() / 1000)
    // Condition permettant de controler si le token est toujours valide (on récupére le timestamp du payload)
    if (now <= tokenPayLoad.exp) {
      return true
    } else {
      return false
    }
  }

  // Fonction qui permet de vérifier que  l'utilisateur est bien logged
  function isLogged() {
    if (isTokenValid(localStorage.getItem('token'))) {
      return true
    } else {
      return false
    }
  }

  // Fonction qui gère la soumission du formulaire, elle appelle l'API pour tenter de se connecter ; elle récupère le token et le stocke dans le localStorage si l'authentification est correcte et redirige vers le dashboard ; elle affiche une erreur dans le cas contraire
  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/user/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        // Pas besoin de convertir la donnée data en JSON avec AXIOS
        window.localStorage.setItem('token', response.data.body.token)
        if (isLogged()) {
          // Redirige l'utilisateur vers le tableau de bord
          navigate('/dashboard')
          // Fais appel à l'action logIn pour passer le loggedIn à true dans le store (= utilisateur connecté)
          dispatch(logIn(true))
          // Fais appel à l'action getUserInfos pour remplir le store avec les infos utilisateur
          dispatch(getUserInfos())
        }
      }
    } catch (error) {
      console.log('error call login', error)
      setError('Vos identifiants sont incorrects.')
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <div className="header-form">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
        </div>
        <form className="formLogin">
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button
            type="button"
            className="sign-in-button"
            // Fonction 'handleSignIn' appelée lors du clic sur le bouton 'sign in'
            onClick={handleSignIn}
          >
            Sign In
          </button>
          {/* Ajout d'un message conditionnel en cas d'erreur  */}
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </main>
  )
}

export default SignIn
