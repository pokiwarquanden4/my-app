import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../config/axiosConfig"

interface IGetPosts {
    number: number,
    type: string
}

export const getTags = createAsyncThunk<any, {}>(
    "/get/tags",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/tags`, {
            thunkApi,
            method: "GET"
        })
        return res
    }
)

export interface IPosts {
    _id: number
    rate: number;
    answer: number;
    title: string;
    subTitle: string,
    tags: string[];
    userId: string;
    verified: number,
    updatedAt: Date;
}

export interface IPostsResponse {
    status: number,
    data: {
        posts: IPosts[]
        totalCount: number
    }
}

export const getPosts = createAsyncThunk<IPostsResponse, IGetPosts>(
    "/get/posts",
    async (payload, thunkApi) => {
        const res: IPostsResponse = await sendRequest(`posts/posts?number=${payload.number}&type=${payload.type}`, {
            thunkApi,
            method: "GET"
        })
        return res
    }
)

interface ICreatePost {
    title: string,
    subTitle: string
    content: string,
    tags: string[]
}

export const createPosts = createAsyncThunk<any, ICreatePost>(
    "/create/posts",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/create/post`, {
            thunkApi,
            payload: payload,
            method: "POST"
        })
        return res
    }
)