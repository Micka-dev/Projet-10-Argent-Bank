import {
  EDIT_USER_INFOS,
  GET_USER_INFOS,
  LOG_IN,
  OPEN_USER_EDIT_FORM,
} from '../actions/user.actions'

const initialState = {
  loggedIn: false,
  openedUserEditForm: false,
  getUserInfos: '',
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return { ...state, loggedIn: action.payload, getUserInfos: '' }

    case OPEN_USER_EDIT_FORM:
      return { ...state, openedUserEditForm: action.payload }

    case GET_USER_INFOS:
      return { ...state, getUserInfos: action.payload }

    case EDIT_USER_INFOS:
      return { ...state, getUserInfos: action.payload }

    default:
      return state
  }
}
