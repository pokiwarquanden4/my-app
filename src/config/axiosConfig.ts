import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { trackPromise } from "react-promise-tracker";
import Cookies from "universal-cookie";


const cookies = new Cookies();

export const handleAxiosRequest = async (config: InternalAxiosRequestConfig) => {
    const token = cookies.get('token') || cookies.get('refresh_token')
    if (token) {
        config.headers.set("Authorization", "Bearer " + token)
    }
    return config
}

export const handleAxiosResponse = async (response: any) => {
    //if contain jwt then save it in local storage
    if (response.data.accessToken && response.status === 200) {
        cookies.set('token', response.data.accessToken, {
            expires: new Date(Number(jwtDecode(response.data.accessToken).exp) * 1000),
        });
    }
    if (response.data.refreshToken && response.status === 200) {
        cookies.set('refresh_token', response.data.refreshToken, {
            expires: new Date(Number(jwtDecode(response.data.refreshToken).exp) * 1000),
        });
    }
    return response
}

export const sendRequest = async (url: string, { thunkApi, payload, method }: { thunkApi: any, payload?: any, method: string }, loading: boolean = true) => {
    const request = axios({
        method,
        url,
        data: payload,
    }).then((results) => {
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
                console.log({
                    status: axiosError.response.status,
                    data: axiosError.response.data
                })
                if (thunkApi) return {
                    status: axiosError.response.status,
                    data: axiosError.response.data
                }
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

    return loading ? trackPromise(request) : request

};
