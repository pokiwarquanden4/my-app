import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../../config/axiosConfig"

export const getNotify = createAsyncThunk<any, {}>(
    "/get/notify",
    async (payload, thunkApi) => {
        const res = await sendRequest(`users/getNotify`, {
            thunkApi,
            method: "GET"
        })

        return res
    }
)

export const checkNotify = createAsyncThunk<any, { id: string }>(
    "/check/notify",
    async (payload, thunkApi) => {
        const res = await sendRequest(`users/checkNotify`, {
            thunkApi,
            payload: payload,
            method: "PUT"
        })

        return res
    }
)
