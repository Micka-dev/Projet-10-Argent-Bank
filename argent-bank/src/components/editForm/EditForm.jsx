import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import './editForm.css'

import { editUserInfos, userSlice } from '../../slices/userSlice'

function EditForm() {
  const user = useSelector((state) => state.user)

  const [editedUserName, setEditedUserName] = useState(user.userInfos.userName)

  const [error, setError] = useState('')

  const dispatch = useDispatch()

  const handleSaveButton = async (e) => {
    e.preventDefault()
    if (!editedUserName) {
      setError('You have not filled in your user name, please edit it.')
      return
    }
    try {
      await dispatch(editUserInfos(editedUserName)).unwrap()
      dispatch(userSlice.actions.openEditForm(false))
    } catch (error) {
      console.log('Error in editUserInfos:', error)
      if (error.status) {
        const status = error.status
        switch (status) {
          case 400:
            setError('Veuillez vérifier les informations saisies et réessayer.')
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
        setError('Une erreur est survenue. Veuillez réessayer plus tard.')
      }
    }
  }

  const handleCancelButton = (e) => {
    e.preventDefault()
    dispatch(userSlice.actions.openEditForm(false))
  }

  return (
    <form className="edit-form">
      <div className="form-field">
        <label className="form-label">User Name:</label>
        <input
          className="form-input"
          type="text"
          placeholder="User Name"
          value={editedUserName}
          onChange={(e) => setEditedUserName(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label className="form-label">First Name:</label>
        <input
          className="form-input non-editable-field"
          type="text"
          placeholder="First Name"
          value={user.userInfos.firstName}
          readOnly
        />
      </div>
      <div className="form-field">
        <label className="form-label">Last Name:</label>
        <input
          className="form-input non-editable-field"
          type="text"
          placeholder="Last Name"
          value={user.userInfos.lastName}
          readOnly
        />
      </div>
      <div className="form-btn">
        <button
          type="button"
          className="btn form-btn-save"
          onClick={handleSaveButton}
        >
          Save
        </button>
        <button className="btn form-btn-cancel" onClick={handleCancelButton}>
          Cancel
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}

export default EditForm
