import './dashboard.css'

function Dashboard() {
  const userName = 'Micka'

  return (
    <main className="main bg-dark">
      <div className="header">
        {/* Créer une fonction EditFormCollapsed pour afficher ou non le formulaire d'édition en fonction de l'appui sur le bouton 'Edit Name'*/}
        {/*  Le bouton save permet de modifier user name => modifie le store et referme le formulaire*/}
        {/* Le bouton cancel referme le formulaire */}
        <h1>
          Welcome back
          <br />
          {userName}
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
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

export default Dashboard
