import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../../config/axiosConfig"

export const postsSearch = createAsyncThunk<any, string>(
    "/posts/search",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/search?searchVal=${payload}`, {
            thunkApi,
            method: "GET"
        }, false)
        return res
    }
)