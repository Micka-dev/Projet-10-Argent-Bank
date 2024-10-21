import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Déclaration du state initial
const initialState = {
  loggedIn: false,
  openedUserEditForm: false,
  userInfos: '',
}

// Action asynchrone qui récupère les infos de l'utilisateur depuis l'API
export const getUserInfos = createAsyncThunk(
  'user/getUserInfos',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.get(
        'http://localhost:3001/api/v1/user/profile',
        config
      )
      return response.data.body
    } catch (error) {
      // vérifie si l'erreur a une réponse
      if (error.response) {
        // Si oui, rejette la promesse avec le status et le message d'erreur détaillé de la réponse ou un message générique
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.message || error.message,
        })
        // Si non, rejette avec un statut par défaut de 500 et le message d'erreur générique
      } else {
        return rejectWithValue({
          status: 500,
          message: error.message,
        })
      }
    }
  }
)

// Action asynchrone qui permet d'éditer les infos de l'utilisateur via l'API
export const editUserInfos = createAsyncThunk(
  'user/editUserInfos',
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
      const body = JSON.stringify({ userName: data })
      const response = await axios.put(
        'http://localhost:3001/api/v1/user/profile',
        body,
        config
      )
      return response.data.body
    } catch (error) {
      if (error.response) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.message || error.message,
        })
      } else {
        return rejectWithValue({
          status: 500,
          message: error.message,
        })
      }
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Met à jour l'état de connexion de l'utilisateur et réinitialise ses donnéees
    logIn: (state, action) => {
      state.loggedIn = action.payload
      state.userInfos = ''
    },
    // Met à jour l'état d'ouverture du formulaire
    openEditForm: (state, action) => {
      state.openedUserEditForm = action.payload
    },
  },
  // Gère les actions asynchrones créées avec createAsyncThunk
  extraReducers: (builder) => {
    builder
      // Récupère et met à jour les infos utilisateurs quand l'action 'getUserInfo' est réussie (fulfilled)
      .addCase(getUserInfos.fulfilled, (state, action) => {
        state.userInfos = action.payload
      })
      // Met à jour les infos utilisateurs quand l'action 'editUserInfo' est réussie (fulfilled)
      .addCase(editUserInfos.fulfilled, (state, action) => {
        state.userInfos = action.payload
      })
  },
})

export const { logIn, openEditForm } = userSlice.actions
export default userSlice.reducer
