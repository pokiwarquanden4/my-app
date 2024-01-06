import { createSlice } from "@reduxjs/toolkit";
import { getUserAllDetails, login } from "../pages/LoginPages/LoginAPI";
import { followPost, followResponse, unFollowPost, unFollowResponse } from "../pages/Questions/QuestionsAPI";
import { checkNotify, getNotify } from "../Component/Message/MessageContent/NotifyAPI";

export interface INotify {
    _id: string
    postId: string
    responseId?: string
    commentId?: string
    details: {
        sender: string
        avatar?: string
        postName?: string
    },
    checked: boolean
}

interface IUserLogin {
    message: string;
    account: string;
    avatarURL: string;
    name: string;
    email: string;
    roleName: string;
    techTags: string[],
    heartNumber: number;
    userPost: string[];
    userResponse: string[]
    followPost: string[];
    followResponse: string[];
}

interface IUserLoginData {
    data: IUserLogin
    notify: INotify[] | undefined
    loginShow: {
        show: boolean
    }
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
        techTags: [],
        userPost: [],
        userResponse: [],
        followPost: [],
        followResponse: [],
    },
    loginShow: {
        show: false
    },
    notify: undefined
}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addNotify: (state, action) => {
            if (!state.notify || !Array.isArray(state.notify)) {
                state.notify = [];
            }
            state.notify = [...state.notify, action.payload];
        },

        logoutSlice: (state, action) => {
            state.data = {
                message: "",
                account: "",
                avatarURL: "",
                name: "",
                email: "",
                roleName: "",
                heartNumber: 0,
                techTags: [],
                userPost: [],
                userResponse: [],
                followPost: [],
                followResponse: [],
            }
            state.notify = undefined
        },
        loginShow: (state, action) => {
            state.loginShow = {
                show: action.payload
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(checkNotify.fulfilled, (state, action: any) => {
            const id = action.meta.arg.id
            const newData = (state.notify || []).map((item) => {
                if (item._id === id) {
                    return {
                        ...item,
                        checked: true
                    }
                }
                return item
            })

            state.notify = newData
        })
        builder.addCase(getNotify.fulfilled, (state, action: any) => {
            state.notify = action.payload.data.notifications
        })
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
            if (!state.data.followResponse.includes(action.payload.data.responseId)) {
                state.data.followResponse.push(action.payload.data.responseId)
            }
        })
        builder.addCase(unFollowResponse.fulfilled, (state, action: any) => {
            if (action.payload.status !== 200) return
            const index = state.data.followPost.indexOf(action.payload.data.responseId)
            state.data.followResponse.splice(index, 1)
        })
    }
})

export const { addNotify, loginShow, logoutSlice } = UserSlice.actions
export default UserSlice.reducer