import {createSlice} from "@reduxjs/toolkit";

export default createSlice({
    name: 'office',
    initialState: {
        filter: {
            searchText: '',
            type: 'Loại cơ sở',
            address: 'Khu vực'
        },
        listOffice: [],
        form: {
            id: '',
            name: '',
            phone: '',
            address: '',
            manager: '',
            type: 'Đại lý'
        }
    },
    reducers: {
        setListOffice: (state, action) => {
            action.payload.map((e) => {
                e.selected = false
            })
            state.listOffice = action.payload
        },
        setSearchChange: (state, action) => {
            state.filter = action.payload
        },
        formChange: (state, action) => {
            state.form = action.payload
        },
        selectedChange: (state, action) => {
            state.listOffice.map((e) => {
                if (e.id === action.payload) {
                    e.selected = !e.selected
                }
            })
        },
        selectedAll: (state, action) => {
            state.listOffice.map((e) => {
                e.selected = action.payload
            })
        }
    }
})