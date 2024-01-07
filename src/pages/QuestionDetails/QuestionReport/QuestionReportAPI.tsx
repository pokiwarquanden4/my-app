import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../../config/axiosConfig"

interface IReport {
    postId: string,
    reason: string
}

export const createReport = createAsyncThunk<any, IReport>(
    "/report",
    async (payload, thunkApi) => {
        const res = await sendRequest(`admin/report/create`, {
            thunkApi,
            payload: payload,
            method: "POST"
        })

        return res
    }
)