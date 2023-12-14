import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { trackPromise } from "react-promise-tracker";

export const handleAxiosRequest = async (config: InternalAxiosRequestConfig) => {
    let token = localStorage.getItem("token") || localStorage.getItem("refresh_token")
    if (token) {
        config.headers.set("Authorization", "Bearer " + token)
    }
    return config
}

export const handleAxiosResponse = async (response: any) => {
    //if contain jwt then save it in local storage
    if (response.data.accessToken && response.data.refreshToken && response.status === 200) {
        localStorage.setItem('token', response.data.accessToken)
        localStorage.setItem('refresh_token', response.data.refreshToken)
        window.dispatchEvent(new Event("storage"));
    }
    return response
}

export const sendRequest = async (url: string, { thunkApi, payload, method }: { thunkApi: any, payload?: any, method: string }) => {
    trackPromise(
        axios({
            method,
            url,
            data: payload,
        })
    ).then((results) => {
        return {
            status: results.status,
            data: results.data
        }
    }).catch((error) => {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (thunkApi) return thunkApi.rejectWithValue({
                    status: axiosError.response.status,
                    data: axiosError.response.data
                })
            } else if (axiosError.request) {
                // The request was made but no response was received
                console.log('No response received from the server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error setting up the request:', axiosError.message);
            }
            if (thunkApi) return thunkApi.rejectWithValue(error)
        }
    })

};
