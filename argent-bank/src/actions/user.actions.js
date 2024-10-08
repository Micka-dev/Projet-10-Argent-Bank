import axios from 'axios'

export const LOG_IN = 'LOG_IN'
export const OPEN_USER_EDIT_FORM = 'OPEN_USER_EDIT_FORM'
export const GET_USER_INFOS = 'GET_USER_INFOS'
export const EDIT_USER_INFOS = 'EDIT_USER_INFOS'

// Gestion de l'état de connection (store)
export const logIn = (data) => {
  return (dispatch) => dispatch({ type: LOG_IN, payload: data })
}

// Gestion de l'état d'ouverture du formulaire d'édition des infos de l'utilisateur (store)
export const openEditForm = (data) => {
  return (dispatch) => dispatch({ type: OPEN_USER_EDIT_FORM, payload: data })
}

// Récupération des infos utilisateur de l'API et mise à jour du store
export const getUserInfos = () => {
  const token = localStorage.getItem('token')

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  return async (dispatch) => {
    const response = await axios.get(
      'http://localhost:3001/api/v1/user/profile',
      config
    )
    dispatch({ type: GET_USER_INFOS, payload: response.data.body })
  }
}

// Modification du userName au niveau de l'API et mise à jour du store
export const editUserInfos = (data) => {
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  // Passer la donnée data sous la forme : { userName: data } car c'est le format attendu par la route de l'API !
  const body = JSON.stringify({ userName: data })

  return async (dispatch) => {
    try {
      const response = await axios.put(
        'http://localhost:3001/api/v1/user/profile',
        body,
        config
      )
      if (response.status === 200) {
        dispatch({ type: EDIT_USER_INFOS, payload: response.data.body })
      }
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response?.data)
      } else {
        console.error('Error:', error.message)
      }
    }
  }
}
