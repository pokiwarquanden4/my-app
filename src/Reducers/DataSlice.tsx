import { createSlice } from "@reduxjs/toolkit";
import { getTags } from "../pages/Questions/QuestionsAPI";

export interface ITags {
    value: string,
    description: string,
    popular: number
}

interface IDataSlice {
    tags: string[]
    tagsDetails: ITags[]
}

const initialState: IDataSlice = {
    tags: [],
    tagsDetails: []
}

const DataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getTags.fulfilled, (state, action: any) => {
            state.tagsDetails = action.payload.data.tags
            state.tags = action.payload.data.tags.map((item: any) => item.value)
        })
    }
})

export default DataSlice.reducer