import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser, getUserAllDetails, login } from "../pages/LoginPages/LoginAPI";

interface INotify {
    postId: string
    responseId: string
    commentId: string
    checked: boolean
}

interface IUserLogin {
    message: string;
    account: string;
    avatarURL: string;
    name: string;
    email: string;
    roleName: string;
    heartNumber: number;
    userPost: string[];
    followPost: string[];
    followAnswer: string[];
    notification: INotify[];
}

interface IUserLoginData {
    data: IUserLogin
}

const initialState: IUserLoginData = {
    data: {
        message: "",
        account: "",
        avatarURL: "",
        name: "",
        email: "",
        roleName: "",
        heartNumber: 0,
        userPost: [],
        followPost: [],
        followAnswer: [],
        notification: [],
    }
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action: any) => {
            state.data = action.payload.data
        })
        builder.addCase(getUserAllDetails.fulfilled, (state, action: any) => {
            state.data = action.payload.data
        })
    }
})

export default UserSlice.reducer