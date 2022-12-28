import {configureStore} from "@reduxjs/toolkit";
import employee from "./reducer/employee";
import product from "./reducer/product";

const store = configureStore({
    reducer: {
        employee: employee.reducer,
        product: product.reducer
    },
})

export default store