import { createSlice } from "@reduxjs/toolkit";
import { getTags } from "../pages/Questions/QuestionsAPI";

interface IDataSlice {
    tags: string[]
}

const initialState: IDataSlice = {
    tags: []
}

const DataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getTags.fulfilled, (state, action: any) => {
            state.tags = action.payload.data.tags
        })
    }
})

export default DataSlice.reducer