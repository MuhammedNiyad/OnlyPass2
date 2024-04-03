/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

interface user {
  currentUser: any;
}

export const userSlice = createSlice({
  name:"user",
  initialState:{
    currentUser:{
        userDetails:{},
        accessToken:""
    }
  } as user,

  reducers:{
    setCurrentUser: (state, action)=>{
        // console.log({'data':action.payload.other})
        state.currentUser.userDetails = action.payload.other;
        state.currentUser.accessToken = action.payload.accessToken
    }
  }

});

export const { setCurrentUser} = userSlice.actions;
export default userSlice.reducer;
