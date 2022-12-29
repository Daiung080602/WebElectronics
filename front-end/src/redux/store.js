import {configureStore} from "@reduxjs/toolkit";
import employee from "./reducer/employee";
import product from "./reducer/product";
import office from "./reducer/office";

const store = configureStore({
    reducer: {
        employee: employee.reducer,
        product: product.reducer,
        office: office.reducer
    },
})

export default store