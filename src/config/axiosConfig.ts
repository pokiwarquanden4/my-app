import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { trackPromise } from "react-promise-tracker";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { loginShow } from "../Reducers/UserSlice";


const cookies = new Cookies();

export const handleAxiosRequest = async (config: InternalAxiosRequestConfig) => {
    const token = cookies.get('token') || cookies.get('refresh_token')
    if (token) {
        config.headers.set("Authorization", "Bearer " + token)
    }
    return config
}

export const handleAxiosResponse = async (response: any) => {
    if (response.data.accessToken) {
        cookies.remove('token')
        cookies.set('token', response.data.accessToken, {
            sameSite: true,
            expires: new Date(Number(jwtDecode(response.data.accessToken).exp) * 1000),
        });
    }
    if (response.data.refreshToken) {
        cookies.remove('refresh_token')
        cookies.set('refresh_token', response.data.refreshToken, {
            sameSite: true,
            expires: new Date(Number(jwtDecode(response.data.refreshToken).exp) * 1000),
        });
    }
    return response
}

export const sendRequest = async (url: string, { thunkApi, payload, method, dispatch }: { thunkApi: any, payload?: any, method: string, dispatch?: any }, loading: boolean = true) => {
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
                if (dispatch && axiosError.response.status === 401 && axiosError.response.data === 'Token is invalid') {
                    dispatch(loginShow(true))
                }

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
