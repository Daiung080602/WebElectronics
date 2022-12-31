import {createSlice} from "@reduxjs/toolkit";

export default createSlice({
    name: 'customer',
    initialState: {
        filter: {
            searchText: ''
        },
        listCustomer: [],
        form: {
            customer_id: '',
            fullname: '',
            phone: '',
            address: '',
        }
    },
    reducers: {
        setListCustomer: (state, action) => {
            state.listCustomer = action.payload
        },
        setSearchChange: (state, action) => {
            state.filter = action.payload
        },
        formChange: (state, action) => {
            state.form = action.payload
        }
    }
})