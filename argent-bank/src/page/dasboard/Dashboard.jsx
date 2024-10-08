import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './dashboard.css'

import EditForm from '../../components/editForm/EditForm'

import { openEditForm } from '../../actions/user.actions'

function Dashboard() {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const isEditFormOpened = user.openedUserEditForm

  const userName = user.getUserInfos.userName

  const handleOpeningStatus = () => dispatch(openEditForm(true))

  // CODE pour éviter l'accès sans authorisation au dashboard quand on tape directement l'URL ou le retour en arrière dans le navigateur !
  const navigate = useNavigate()
  if (user.loggedIn === false) {
    navigate('/sign-in')
    return (
      <div className="redirection">
        <h1>Vous devez être connecté pour accéder à cette page !</h1>
        <h2>
          Veuillez cliquer sur le lien "Sign in" en haut à gauche pour vous
          authentifiez ou cliquer sur le logo pour revenir à la page d'accueil.
        </h2>
      </div>
    )
  } else {
    return (
      <main className="main bg-dark">
        {isEditFormOpened === false ? (
          <div className="header">
            <h1>
              Welcome back
              <br />
              {userName} !
            </h1>
            <button className="edit-button" onClick={handleOpeningStatus}>
              Edit Name
            </button>
          </div>
        ) : (
          <EditForm />
        )}
        <section className="account-content">
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Checking (x8349)</h3>
              <p className="account-amount">$2,082.79</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Savings (x6712)</h3>
              <p className="account-amount">$10,928.42</p>
              <p className="account-amount-description">Available Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
          <section className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
              <p className="account-amount">$184.30</p>
              <p className="account-amount-description">Current Balance</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        </section>
      </main>
    )
  }
}

export default Dashboard
