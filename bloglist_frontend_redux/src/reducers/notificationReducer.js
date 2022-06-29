import { createSlice } from '@reduxjs/toolkit/'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage() {
      return null
    },
  },
})

export const { setMessage, clearMessage } = notificationSlice.actions

export default notificationSlice.reducer
