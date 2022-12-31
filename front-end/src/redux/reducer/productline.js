import {createSlice} from "@reduxjs/toolkit";

export default createSlice({
    name: 'productline',
    initialState: {
        filter: {
            searchText: '',
            type: 'Danh mục',
            date: 'Thời gian bảo hành'
        },
        listProductLine: [],
        form: {
            productline_id: '',
            image: [],
            type: 'iphone',
            date_warranty: '',
            detail: '',
            active: true
        }
    },
    reducers: {
        setListProductLine: (state, action) => {
            action.payload.map((e) => {
                e.image = e.image.split(',')
            })
            state.listProductLine = action.payload
        },
        setSearchChange: (state, action) => {
            state.filter = action.payload
        },
        formChange: (state, action) => {
            state.form = action.payload
        },
        selectedChange: (state, action) => {
            state.listProductLine.map((e) => {
                if (e.name === action.payload) {
                    e.selected = !e.selected
                }
            })
        },
        selectedAll: (state, action) => {
            state.listProductLine.map((e) => {
                e.selected = action.payload
            })
        }
    }
})