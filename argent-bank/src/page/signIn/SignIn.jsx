import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './signIn.css'
import axios from 'axios'
import { getUserInfos, userSlice } from '../../slices/userSlice'

function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Fonction qui met à jour les valeurs des champs de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Fonction qui vérifie la validité du token JWT
  function isTokenValid(token) {
    const arrayToken = token.split('.')
    const tokenPayLoad = JSON.parse(atob(arrayToken[1]))
    const now = Math.floor(new Date().getTime() / 1000)
    if (now <= tokenPayLoad.exp) {
      return true
    } else {
      return false
    }
  }

  // Fonction qui permet de vérifier que l'utilisateur est bien logged
  function isLogged() {
    if (isTokenValid(localStorage.getItem('token'))) {
      return true
    } else {
      return false
    }
  }

  // Fonction asynchrone qui gère le processus de connexion lorsque l'utilisateur soumet le formulaire
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
        window.localStorage.setItem('token', response.data.body.token)
        if (isLogged()) {
          try {
            dispatch(userSlice.actions.logIn(true))
            await dispatch(getUserInfos()).unwrap()
            navigate('/dashboard')
          } catch (error) {
            console.log('Error in getUserInfos:', error)
            if (error.status) {
              const status = error.status
              switch (status) {
                case 400:
                  setError(
                    'Requête invalide. Veuillez vérifier les informations saisies et réessayer.'
                  )
                  break
                case 401:
                  setError('Non autorisé. Veuillez vous connecter.')
                  break
                case 403:
                  setError(
                    "Accès interdit. Vous n'avez pas les droits nécessaires."
                  )
                  break
                case 404:
                  setError(
                    "Ressource non trouvée. Vérifiez l'URL ou essayez plus tard."
                  )
                  break
                case 500:
                  setError('Erreur interne du serveur. Réessayez plus tard.')
                  break
                default:
                  setError('Erreur réseau. Vérifiez votre connexion.')
              }
            } else {
              console.log('Error.status is undefined')
              setError('Une erreur est survenue. Veuillez réessayer plus tard.')
            }
          }
        }
      }
    } catch (error) {
      console.log('Error in login:', error)
      if (error.response) {
        const status = error.response.status
        console.log('Error response status:', status)
        switch (status) {
          case 400:
            setError(
              'Requête invalide. Veuillez vérifier vos identifiants et réessayer.'
            )
            break
          case 401:
            setError('Non autorisé. Veuillez vous connecter.')
            break
          case 403:
            setError("Accès interdit. Vous n'avez pas les droits nécessaires.")
            break
          case 404:
            setError(
              "Ressource non trouvée. Vérifiez l'URL ou essayez plus tard."
            )
            break
          case 500:
            setError('Erreur interne du serveur. Réessayez plus tard.')
            break
          default:
            setError('Erreur réseau. Vérifiez votre connexion.')
        }
      } else {
        console.log('Error response is undefined')
        setError('Une erreur est survenue. Veuillez réessayer plus tard.')
      }
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
            // Fonction 'handleSignIn' appelée lors du clic sur le bouton 'Sign In'
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
