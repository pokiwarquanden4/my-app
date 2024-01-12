import { createSlice } from "@reduxjs/toolkit";
import { getTags } from "../pages/Questions/QuestionsAPI";
import { Tag } from "react-tag-input";
import { getSimpleAdvert } from "../pages/Advert/AdvertAPI";

export interface ITags {
    value: string,
    description: string,
    popular: number
}

export interface ISimpleAdvert {
    _id: string,
    url: string,
    imgURL: string
}

interface IDataSlice {
    tags: string[]
    tagsDetails: ITags[]
    filterTags: Tag[]
    adverts: ISimpleAdvert[]
}

const initialState: IDataSlice = {
    tags: [],
    tagsDetails: [],
    filterTags: [],
    adverts: []
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
        builder.addCase(getSimpleAdvert.fulfilled, (state, action: any) => {
            state.adverts = action.payload.data.adverts
        })
    }
})

export const { updateFilterTags } = DataSlice.actions
export default DataSlice.reducer