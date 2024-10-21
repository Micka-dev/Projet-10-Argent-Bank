import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './dashboard.css'

import accountData from '../../datas/accountsData.json'

import EditForm from '../../components/editForm/EditForm'
import Account from '../../components/account/Acoount'

import { userSlice } from '../../slices/userSlice'

function Dashboard() {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const isEditFormOpened = user.openedUserEditForm
  const userName = user.userInfos.userName

  const handleOpeningStatus = () =>
    dispatch(userSlice.actions.openEditForm(true))

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
          {/* Parcourt les données des comptes et rend un composant Account pour chaque entrée */}
          {accountData.map((data) => (
            <Account
              key={data.id}
              title={data.title}
              amount={data.amount}
              description={data.description}
            />
          ))}
        </section>
      </main>
    )
  }
}

export default Dashboard
