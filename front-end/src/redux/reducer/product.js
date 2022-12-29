import {createSlice} from "@reduxjs/toolkit";

export default createSlice({
    name: 'product',
    initialState: {
        filter: {
            searchText: '',
            catalog: 'Danh mục',
            warrantyPeriod: 'Thời gian bảo hành'
        },
        listProduct: [],
        form: {
            name: '',
            image: [],
            catalog: 'iphone',
            warrantyPeriod: '',
            mota: ''
        }
    },
    reducers: {
        setListProduct: (state, action) => {
            action.payload.map((e) => {
                e.selected = false
            })
            state.listProduct = action.payload
        },
        setSearchChange: (state, action) => {
            state.filter = action.payload
        },
        formChange: (state, action) => {
            state.form = action.payload
        },
        selectedChange: (state, action) => {
            state.listProduct.map((e) => {
                if (e.name === action.payload) {
                    e.selected = !e.selected
                }
            })
        },
        selectedAll: (state, action) => {
            state.listProduct.map((e) => {
                e.selected = action.payload
            })
        }
    }
})