import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../config/axiosConfig"

export const getUserProfile = createAsyncThunk<any, string>(
    "/get-user-profile",
    async (payload, thunkApi) => {
        const res = await sendRequest(`users/profile?account=${payload}`, {
            thunkApi,
            method: "GET"
        })

        return res
    }
)

export const updateUserProfile = createAsyncThunk<any, FormData>(
    "/update-user-profile",
    async (payload, thunkApi) => {
        const res = await sendRequest(`users/profile/update`, {
            thunkApi,
            payload: payload,
            method: "PUT"
        })

        return res
    }
)