import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

import './editForm.css'

import { editUserInfos, openEditForm } from '../../actions/user.actions'

function EditForm() {
  const user = useSelector((state) => state.user)

  const [editedUserName, setEditedUserName] = useState(
    user.getUserInfos.userName
  )

  const dispatch = useDispatch()

  const handleSaveButton = (e) => {
    e.preventDefault()

    dispatch(editUserInfos(editedUserName))
    dispatch(openEditForm(false))
  }

  const handleCancelButton = (e) => {
    e.preventDefault()

    dispatch(openEditForm(false))
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
          value={user.getUserInfos.firstName}
          readOnly
        />
      </div>
      <div className="form-field">
        <label className="form-label">Last Name:</label>
        <input
          className="form-input non-editable-field"
          type="text"
          placeholder="Last Name"
          value={user.getUserInfos.lastName}
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
    </form>
  )
}

export default EditForm
