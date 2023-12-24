import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../config/axiosConfig"

export interface IPost {
    _id: string;
    userId: string;
    title: string;
    subTitle: string;
    content: string;
    close: boolean;
    tags: string[];
    rate: number;
    slove: boolean;
    reportNum: string[];
    enable: boolean;
    view: string[];
    responses: IResponse[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IResponse {
    userId: string;
    content: string;
    vertified: boolean
    rate: number
    comment: IComment[]
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IComment {
    userId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export const getPostById = createAsyncThunk<any, string>(
    "/posts/post",
    async (payload, thunkApi) => {
        const res: any = await sendRequest(`posts/post?id=${payload}`, {
            thunkApi,
            method: "GET"
        })
        return res
    }
)

export interface ICreateRequest {
    content: string,
    postId: string
}

export const createResponse = createAsyncThunk<any, ICreateRequest>(
    "/posts/create-response",
    async (payload, thunkApi) => {
        const res: any = await sendRequest(`posts/create/response`, {
            thunkApi,
            payload: payload,
            method: "POST"
        })
        return res
    }
)

