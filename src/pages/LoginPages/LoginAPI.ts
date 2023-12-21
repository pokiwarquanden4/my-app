import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../config/axiosConfig";
import { ILogin } from "./LoginPages";

export const login = createAsyncThunk<any, ILogin>(
    "/login",
    async (payload, thunkApi) => {
        const res = await sendRequest(`users/login`, {
            thunkApi,
            payload: payload,
            method: "POST"
        })
        return res
    }
)