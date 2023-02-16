import {createSlice} from "@reduxjs/toolkit";

export interface AuthSlice {
    user: any;
}

const initialState: AuthSlice = {
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    }
})

export default authSlice.reducer;