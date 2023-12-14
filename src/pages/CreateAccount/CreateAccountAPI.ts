import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "../../config/axiosConfig";
import { ICreateAccount } from "./CreateAccount";

export const createAccount = createAsyncThunk<any, ICreateAccount>(
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