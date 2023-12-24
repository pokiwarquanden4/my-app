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

export const getUser = createAsyncThunk<any, {}>(
    "/get-user",
    async (payload, thunkApi) => {
        const res = await sendRequest(`users/getUser`, {
            thunkApi,
            method: "GET"
        })

        return res
    }
)

export const getUserAllDetails = createAsyncThunk<any, {}>(
    "/get-user-details",
    async (payload, thunkApi) => {
        const res = await sendRequest(`users/getUser/details`, {
            thunkApi,
            method: "GET"
        })

        return res
    }
)