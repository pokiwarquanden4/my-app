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

export const createOtp = createAsyncThunk<any, { account: string }>(
    "/create-otp",
    async (payload, thunkApi) => {
        const res = await sendRequest(`users/otp/create`, {
            thunkApi,
            payload: payload,
            method: "POST"
        })

        return res
    }
)

export const vertifiOtp = createAsyncThunk<any, { account: string, otp: string }>(
    "/vertify-otp",
    async (payload, thunkApi) => {
        const res = await sendRequest(`users/otp/vertify`, {
            thunkApi,
            payload: payload,
            method: "POST"
        })

        return res
    }
)