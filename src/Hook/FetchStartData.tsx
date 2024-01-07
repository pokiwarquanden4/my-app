import { useCallback, useEffect, useMemo, useRef } from "react";
import { useAppDispatch } from "../App/hook";
import { getTags } from "../pages/Questions/QuestionsAPI";
import { getUserAllDetails } from "../pages/LoginPages/LoginAPI";
import { getNotify } from "../Component/Message/MessageContent/NotifyAPI";
import Cookies from "universal-cookie";

export function useFectStartData() {
    const dispatch = useAppDispatch()
    const cookies = useMemo(() => {
        return new Cookies()
    }, [])
    const tagsRef = useRef<boolean>(false)
    const userDetailsRef = useRef<boolean>(false)
    const notifyRef = useRef<boolean>(false)

    const handleGetDefaultData = useCallback(async () => {
        const token = cookies.get('token') || cookies.get('refresh_token')
        let allPromises = []

        if (!tagsRef.current) {
            allPromises.push(dispatch(getTags({})))
            tagsRef.current = true
        }

        if (!token) return

        if (!userDetailsRef.current) {
            allPromises.push(dispatch(getUserAllDetails({})))
            userDetailsRef.current = true
        }
        if (!notifyRef.current) {
            allPromises.push(dispatch(getNotify({})))
            notifyRef.current = true
        }

        await Promise.all(allPromises)
    }, [cookies, dispatch])

    useEffect(() => {
        handleGetDefaultData()
        cookies.addChangeListener(handleGetDefaultData)
    }, [cookies, handleGetDefaultData])
}