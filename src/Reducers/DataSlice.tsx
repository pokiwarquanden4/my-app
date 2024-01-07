import { createSlice } from "@reduxjs/toolkit";
import { getTags } from "../pages/Questions/QuestionsAPI";
import { Tag } from "react-tag-input";

export interface ITags {
    value: string,
    description: string,
    popular: number
}

interface IDataSlice {
    tags: string[]
    tagsDetails: ITags[]
    filterTags: Tag[]
}

const initialState: IDataSlice = {
    tags: [],
    tagsDetails: [],
    filterTags: []
}

const DataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        updateFilterTags: (state, action) => {
            state.filterTags = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTags.fulfilled, (state, action: any) => {
            state.tagsDetails = action.payload.data.tags
            state.tags = action.payload.data.tags.map((item: any) => item.value)
        })
    }
})

export const { updateFilterTags } = DataSlice.actions
export default DataSlice.reducer