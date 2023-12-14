import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../config/axiosConfig";

export const getUser = createAsyncThunk<any, {}>(
    "/get-user",
    async (payload, thunkApi) => {
        const res = await sendRequest(`users/data`, {
            thunkApi,
            method: "GET"
        })
        return res
    }
)