import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../config/axiosConfig"

export const getPostById = createAsyncThunk<any, string>(
    "/posts/post",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/post?id=${payload}`, {
            thunkApi,
            method: "GET"
        })
        return res
    }
)