import { createSlice } from '@reduxjs/toolkit'

// create an auth slice to maintain the user signin status
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // user is not logged in
    status: false,
  },
  reducers: {
    signin: (state, action) => {
      // the user is now signed in
      state.status = true
debugger
      // localStorage
      // - built-in javascript object
      // - used to store something (key-value pairs)
      // - will NOT be cleared untill the keys get removed explicitly

      // sessionStorage
      // - built-in javascript object
      // - used to store something (key-value pairs)
      // - will be cleared automatically after the session gets killed

      // get the token from response and save it in sessionStorage
      // const token = result.data.token
      sessionStorage['token'] = action.payload['token']
      sessionStorage['username'] = action.payload['firstName']
      sessionStorage['last_name'] = action.payload['last_name']
      sessionStorage['role'] = action.payload['role']
      sessionStorage['id'] = action.payload['id']
      sessionStorage['contact_no'] = action.payload['contact_no']
      sessionStorage['adharno'] = action.payload['adharno']
      sessionStorage['date'] = action.payload['date']
      sessionStorage['email'] = action.payload['email']
      sessionStorage['gender'] = action.payload['gender']
      sessionStorage['city'] = action.payload['city']
      sessionStorage['state'] = action.payload['state']
      sessionStorage['pincode'] = action.payload['pincode']
      sessionStorage['street'] = action.payload['street']
    },
signout: (state, action) => {
  // the user is signed out
  state.status = false

  // remove the user token and name from sessionStorage
  sessionStorage.clear();
},
  },
})

// export the reducer for authSlice
export default authSlice.reducer

// export the actions
export const { signin, signout } = authSlice.actions