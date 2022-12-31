import {createSlice} from "@reduxjs/toolkit";

export default createSlice({
    name: 'product',
    initialState: {
        filter: {
            searchText: '',
            state: 'Trạng thái',
            office: ''
        },
        listProduct: [],
        form: {
            product_id: '',
            state: '',
            lot_id: '',
            lot: '',
            agent_id:'',
            agent: '',
            warranty_id: '',
            warranty: '',
            warranty_times: ''
        }
    },
    reducers: {
        setListProduct: (state, action) => {
            console.log(action.payload)
            state.listProduct = action.payload
        },
        setSearchChange: (state, action) => {
            state.filter = action.payload
        },
        formChange: (state, action) => {
            state.form = action.payload
        }
    }
})