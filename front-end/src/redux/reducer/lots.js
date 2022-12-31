import {createSlice} from "@reduxjs/toolkit";

export default createSlice({
    name: 'lots',
    initialState: {
        filter: {
            searchText: ''
        },
        listLots: [],
        form: {
            amount: '',
            lot_id: '',
            date_export: '',
            productline_id: '',
            export_id: ''

        }
    },
    reducers: {
        setListLots: (state, action) => {
            state.listLots = action.payload
        },
        setSearchChange: (state, action) => {
            state.filter = action.payload
        },
        formChange: (state, action) => {
            state.form = action.payload
        }
    }
})