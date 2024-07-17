import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendRequest } from "../../config/axiosConfig"

export interface IPost {
    _id: string;
    userId: {
        _id: string,
        account: string
    };
    title: string;
    subTitle: string;
    content: string;
    close: boolean;
    tags: string[];
    rate: string[];
    slove: boolean;
    reportNum: string[];
    enable: boolean;
    responses: string[];
    createdAt: string;
    updatedAt: string;
    avatarURL: string
}

export interface IResponse {
    post: string,
    _id: string
    userId: {
        _id: string,
        account: string
    };
    content: string;
    vertified: boolean
    rate: string[]
    comment: string[]
    createdAt: string;
    updatedAt: string;
}

export interface IComment {
    _id: string
    userId: {
        _id: string,
        account: string
    };
    content: string;
    createdAt: string;
    updatedAt: string;
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

export const getCommentInResponse = createAsyncThunk<any, string>(
    "/posts/post/comment",
    async (payload, thunkApi) => {
        const res: any = await sendRequest(`posts/comments?id=${payload}`, {
            thunkApi,
            method: "GET"
        })
        return res
    }
)

export interface ICreateRequest {
    content: string,
    postId: string,
    dispatch: any,
}

export const createResponse = createAsyncThunk<any, ICreateRequest>(
    "/posts/create-response",
    async (payload, thunkApi) => {
        const res: any = await sendRequest(`posts/create/response`, {
            thunkApi,
            payload: payload,
            method: "POST",
            dispatch: payload.dispatch
        })
        return res
    }
)

interface ICreateComment {
    responseId: string,
    content: string,
    postId: string
}

export const createComment = createAsyncThunk<any, ICreateComment>(
    "/posts/create-comment",
    async (payload, thunkApi) => {
        const res: any = await sendRequest(`posts/create/comment`, {
            thunkApi,
            payload: payload,
            method: "POST"
        })
        return res
    }
)

interface IUpdatePost {
    postId: string
    title?: string
    subTitle?: string
    content?: string
    tags?: string[]
}

export const updatePost = createAsyncThunk<any, IUpdatePost>(
    "/posts/update-post",
    async (payload, thunkApi) => {
        const res: any = await sendRequest(`posts/update/post`, {
            thunkApi,
            payload: payload,
            method: "PUT"
        })
        return res
    }
)

interface IUpdateResponse {
    responseId: string
    content?: string
}

export const updateReponse = createAsyncThunk<any, IUpdateResponse>(
    "/posts/update-response",
    async (payload, thunkApi) => {
        const res: any = await sendRequest(`posts/update/response`, {
            thunkApi,
            payload: payload,
            method: "PUT"
        })
        return res
    }
)


export const deletePost = createAsyncThunk<any, { postId: string }>(
    "/posts/delete-post",
    async (payload, thunkApi) => {
        const res: any = await sendRequest(`posts/delete/post`, {
            thunkApi,
            payload: payload,
            method: "POST"
        })
        return res
    }
)


