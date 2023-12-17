import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserLogin {
    name: string
}

const initialState: IUserLogin = {
    name: ''
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
})

export default UserSlice.reducer