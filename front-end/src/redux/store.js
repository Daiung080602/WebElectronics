import {configureStore} from "@reduxjs/toolkit";
import employee from "./reducer/employee";

// import listEmployeeSlice from "./reducer/employee/listEmployeeSlice"
// import filterSlice from "./reducer/employee/filterSlice";

const store = configureStore({
    reducer: {
        employee: employee.reducer
    },
})

export default store