import {createSlice} from "@reduxjs/toolkit";

export default createSlice({
    name: 'office',
    initialState: {
        filter: {
            searchText: '',
            role: 'Quyền'
        },
        listOffice: [],
        form: {
            office_id: '',
            password: '',
            name: '',
            phone: '',
            address: '',
            role: 2,
            active: 'true'
        }
    },
    reducers: {
        setListOffice: (state, action) => {
            state.listOffice = action.payload
        },
        setSearchChange: (state, action) => {
            state.filter = action.payload
        },
        formChange: (state, action) => {
            state.form = action.payload
        }
    }
})