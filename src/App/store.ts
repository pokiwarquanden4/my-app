import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Reducers/UserSlice";
import DataSlice from "../Reducers/DataSlice";

export const store = configureStore({
    reducer: {
        user: UserSlice,
        data: DataSlice
    },
    // middleware: (getDefaultMiddleware) => {
    //     getDefaultMiddleware({
    //         serializableCheck: false
    //     })
    // }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>