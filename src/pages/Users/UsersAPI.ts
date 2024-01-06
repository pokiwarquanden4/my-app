import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../config/axiosConfig"

export const getUsersPaging = createAsyncThunk<any, { currentPage: number, type: string, searchVal: string }>(
    "/get-user-simple-data",
    async (payload, thunkApi) => {
        const res = await sendRequest(`users/getUsersSimpleData?page=${payload.currentPage}&type=${payload.type}&searchVal=${payload.searchVal}`, {
            thunkApi,
            method: "GET"
        }, false)

        return res
    }
)