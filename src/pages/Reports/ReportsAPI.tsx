import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../config/axiosConfig"

export const getReports = createAsyncThunk<any, { currentPage: number, searchVal: string, type: string }>(
    "/get/reports",
    async (payload, thunkApi) => {
        const res = await sendRequest(`admin/report?page=${payload.currentPage}&type=${payload.type}&searchVal=${payload.searchVal}`, {
            thunkApi,
            method: "GET"
        })

        return res
    }
)