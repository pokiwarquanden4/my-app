import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../../config/axiosConfig"

interface IReport {
    postId: string,
    reason: string,
    dispatch: any
}

export const createReport = createAsyncThunk<any, IReport>(
    "/report",
    async (payload, thunkApi) => {
        const res = await sendRequest(`admin/report/create`, {
            thunkApi,
            payload: payload,
            method: "POST",
            dispatch: payload.dispatch
        })

        return res
    }
)