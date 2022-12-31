import {configureStore} from "@reduxjs/toolkit";
import office from "./reducer/office";
import productline from "./reducer/productline";
import product from "./reducer/product";
import customer from "./reducer/customer";
import lots from "./reducer/lots";

const store = configureStore({
    reducer: {
        productline: productline.reducer,
        office: office.reducer,
        product: product.reducer,
        customer: customer.reducer,
        lots: lots.reducer
    },
})

export default store