import {createSlice} from "@reduxjs/toolkit";

export default createSlice({
    name: 'employee',
    initialState: {
        filter: {
            searchText: '',
            role: 'Quyền'
        },
        listEmployee: [],
        form: {
            id: '',
            password: '',
            fullname: '',
            phone: '',
            office: '',
            role: 'Admin',
            status: true,
        }
    },
    reducers: {
        setListEmployee: (state, action) => {
            action.payload.map((e) => {
                e.selected = false
            })
            state.listEmployee = action.payload
        },
        setSearchChange: (state, action) => {
            state.filter = action.payload
        },
        formChange: (state, action) => {
            state.form = action.payload
        },
        selectedChange: (state, action) => {
            state.listEmployee.map((e) => {
                if (e.id === action.payload) {
                    e.selected = !e.selected
                }
            })
        },
        selectedAll: (state, action) => {
            state.listEmployee.map((e) => {
                e.selected = action.payload
            })
        }
    }
})