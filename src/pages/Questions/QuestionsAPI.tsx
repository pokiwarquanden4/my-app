import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../config/axiosConfig"

interface IGetPosts {
    number: number,
    type: string
    searchVal: string
    tags: string[]
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
    _id: string
    rate: string[];
    answer: number;
    title: string;
    subTitle: string,
    tags: string[];
    userId: {
        _id: string,
        account: string,
        avatarURL: string
    };
    responses: { vertified: boolean }[],
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
        const res: IPostsResponse = await sendRequest(`posts/posts?number=${payload.number}&type=${payload.type}&searchVal=${payload.searchVal}&tags=${payload.tags}`, {
            thunkApi,
            method: "GET"
        }, false)
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

interface IFollowPost {
    postId: string,
    dispatch: any
}

export const followPost = createAsyncThunk<any, IFollowPost>(
    "/follow/post",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/follow/post`, {
            thunkApi,
            payload: payload,
            method: "POST",
            dispatch: payload.dispatch
        })
        return res
    }
)

export const unFollowPost = createAsyncThunk<any, IFollowPost>(
    "/follow/unPost",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/follow/unPost`, {
            thunkApi,
            payload: payload,
            method: "POST",
            dispatch: payload.dispatch
        })
        return res
    }
)

interface IFollowResponse {
    responseId: string,
    dispatch: any
}

export const followResponse = createAsyncThunk<any, IFollowResponse>(
    "/follow/response",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/follow/response`, {
            thunkApi,
            payload: payload,
            method: "POST",
            dispatch: payload.dispatch
        })
        return res
    }
)

export const unFollowResponse = createAsyncThunk<any, IFollowResponse>(
    "/follow/unResponse",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/follow/unResponse`, {
            thunkApi,
            payload: payload,
            method: "POST",
            dispatch: payload.dispatch
        })
        return res
    }
)

interface IRateReponse {
    responseId: string,
    dispatch: any
}

export const rateResponse = createAsyncThunk<any, IRateReponse>(
    "/rate/response",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/rate/response`, {
            thunkApi,
            payload: payload,
            method: "POST",
            dispatch: payload.dispatch
        })
        return res
    }
)

export const unRateResponse = createAsyncThunk<any, IRateReponse>(
    "/rate/unResponse",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/rate/unResponse`, {
            thunkApi,
            payload: payload,
            method: "POST",
            dispatch: payload.dispatch
        })
        return res
    }
)

interface IVertifyResponse {
    postId: string;
    responseId: string
    trueOrFalse: boolean
}

export const vertifyResponse = createAsyncThunk<any, IVertifyResponse>(
    "/response/vertify",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/vertify`, {
            thunkApi,
            payload: payload,
            method: "PUT"
        })
        return res
    }
)

interface IRatePost {
    postId: string,
    dispatch: any
}

export const ratePost = createAsyncThunk<any, IRatePost>(
    "/rate/post",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/rate/post`, {
            thunkApi,
            payload: payload,
            method: "POST",
            dispatch: payload.dispatch
        })
        return res
    }
)

export const unRatePost = createAsyncThunk<any, IRatePost>(
    "/rate/unPost",
    async (payload, thunkApi) => {
        const res = await sendRequest(`posts/rate/unPost`, {
            thunkApi,
            payload: payload,
            method: "POST",
            dispatch: payload.dispatch
        })
        return res
    }
)