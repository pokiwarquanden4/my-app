import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../config/axiosConfig"

export const getAdverts = createAsyncThunk<any, { currentPage: number, searchVal: string, type: string }>(
    "/get/Advert",
    async (payload, thunkApi) => {
        const res = await sendRequest(`admin/advert?page=${payload.currentPage}&type=${payload.type}&searchVal=${payload.searchVal}`, {
            thunkApi,
            method: "GET"
        })

        return res
    }
)

export const createAdvert = createAsyncThunk<any, FormData>(
    "/create/Advert",
    async (payload, thunkApi) => {
        const res = await sendRequest(`admin/advert/create`, {
            thunkApi,
            payload: payload,
            method: "POST"
        })

        return res
    }
)

export const updateAdvert = createAsyncThunk<any, FormData>(
    "/update/Advert",
    async (payload, thunkApi) => {
        const res = await sendRequest(`admin/advert/update`, {
            thunkApi,
            payload: payload,
            method: "PUT"
        })

        return res
    }
)

export const getSimpleAdvert = createAsyncThunk<any, {}>(
    "/get/simple/advert",
    async (payload, thunkApi) => {
        const res = await sendRequest(`admin/advert/simpleAdverts`, {
            thunkApi,
            method: "GET"
        })

        return res
    }
)