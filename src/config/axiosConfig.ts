import { InternalAxiosRequestConfig } from "axios";

export const handleAxiosRequest = async (config: InternalAxiosRequestConfig) => {
    let token = localStorage.getItem("token") || localStorage.getItem("refresh_token")
    if (token) {
        config.headers.set("Authorization", "Bearer " + token)
    }
    return config
}

export const handleAxiosResponse = async (response: any) => {
    //if contain jwt then save it in local storage
    return response
}