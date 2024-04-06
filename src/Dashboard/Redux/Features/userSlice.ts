/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

interface user {
  currentUser: any;
  accessToken:string
}


export const userSlice = createSlice({
  name:"user",
  initialState:{
    currentUser:{},
    accessToken:''
  } as user,

  reducers:{
    setCurrentUser: (state, action)=>{
        // console.log({'data':action.payload.other})
        state.currentUser = action.payload.other;
        state.accessToken = action.payload.accessToken
    },
    logOutUser:(state)=>{
      state.currentUser = {};
      state.accessToken = ''
    }
  }

});

export const { setCurrentUser,logOutUser} = userSlice.actions;
export default userSlice.reducer;
