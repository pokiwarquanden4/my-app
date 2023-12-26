import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser, getUserAllDetails, login } from "../pages/LoginPages/LoginAPI";
import { followPost, followResponse, unFollowPost, unFollowResponse } from "../pages/Questions/QuestionsAPI";

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
        builder.addCase(followPost.fulfilled, (state, action: any) => {
            if (action.payload.status !== 200) return
            if (!state.data.followPost.includes(action.payload.data.postId)) {
                state.data.followPost.push(action.payload.data.postId)
            }
        })
        builder.addCase(unFollowPost.fulfilled, (state, action: any) => {
            if (action.payload.status !== 200) return
            const index = state.data.followPost.indexOf(action.payload.data.postId)
            state.data.followPost.splice(index, 1)
        })
        builder.addCase(followResponse.fulfilled, (state, action: any) => {
            if (action.payload.status !== 200) return
            if (!state.data.followAnswer.includes(action.payload.data.responseId)) {
                state.data.followAnswer.push(action.payload.data.responseId)
            }
        })
        builder.addCase(unFollowResponse.fulfilled, (state, action: any) => {
            if (action.payload.status !== 200) return
            const index = state.data.followPost.indexOf(action.payload.data.responseId)
            state.data.followAnswer.splice(index, 1)
        })
    }
})

export default UserSlice.reducer