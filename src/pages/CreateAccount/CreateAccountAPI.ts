import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../config/axiosConfig";

export const createAccount = createAsyncThunk<any, FormData>(
    "/create/account",
    async (payload, thunkApi) => {
        const res = await sendRequest(`users/create/account`, {
            thunkApi,
            payload: payload,
            method: "POST"
        })
        return res
    }
)