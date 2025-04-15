import { createSlice } from '@reduxjs/toolkit'

let timeoutId = null

const initialState = {
  text: '',
  color: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    addNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return initialState
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    dispatch(addNotification(notification))

    timeoutId = setTimeout(() => {
      dispatch(removeNotification(notification))
      timeoutId = null
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
