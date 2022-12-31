import './App.css';
import {BrowserRouter, Redirect, Route, Routes, Navigate} from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import Navbar from "./components/admin/Navbar";
import ListProductLine from "./components/admin/productline/ListProductLine";
import ListOffice from "./components/admin/office/ListOffice";
import {Provider, useSelector} from "react-redux";

import store from "./redux/store"
import HomeAdmin from "./components/admin/HomeAdmin";
import axios from "axios";
import {useEffect, useState} from "react";
import HomeAgent from "./components/agent/HomeAgent";
import ListPrLine from "./components/productline/ListPrLine";
import ListCustomer from "./components/agent/customer/ListCustomer";
import ListProductAdmin from "./components/admin/ProductAdmin/ListProductAdmin";
import ListProduct from "./components/product/ListProduct";
import HomeWarranty from "./components/warranty/HomeWarranty";
import HomeExporter from "./components/exporter/HomeExporter";
import ListLots from "./components/exporter/lots/ListLots";


axios.defaults.withCredentials = true

function App() {

    return (
        <Provider store={store}>
            <div>
                <BrowserRouter>
                    <Routes>
                        {
                            <Route path={"/login"} element={<LoginForm/>}></Route>
                        }
                        {
                            <>
                                <Route path={"/admin/productlines"}
                                       element={<HomeAdmin element={<ListProductLine/>}/>}/>
                                <Route path={"/admin/offices"}
                                       element={<HomeAdmin element={<ListOffice/>}/>}/>
                                <Route path={"/admin/products"}
                                       element={<HomeAdmin element={<ListProductAdmin/>}/>}/>
                            </>
                        }
                        {
                            <>
                                <Route path={"/agent/productlines"}
                                       element={<HomeAgent element={<ListPrLine/>}/>}/>
                                <Route path={"/agent/customer"}
                                       element={<HomeAgent element={<ListCustomer/>}/>}/>
                                <Route path={"/agent/products"}
                                       element={<HomeAgent element={<ListProduct/>}/>}/>
                            </>
                        }
                        {
                            <>
                                <Route path={"/warranty/productlines"}
                                       element={<HomeWarranty element={<ListPrLine/>}/>}/>
                                <Route path={"/warranty/products"}
                                       element={<HomeWarranty element={<ListProduct/>}/>}/>
                            </>
                        }
                        {
                            <>
                                <Route path={"/warranty/productlines"}
                                       element={<HomeWarranty element={<ListPrLine/>}/>}/>
                                <Route path={"/warranty/products"}
                                       element={<HomeWarranty element={<ListProduct/>}/>}/>
                            </>
                        }
                        {
                            <>
                                <Route path={"/exporter/productlines"}
                                       element={<HomeExporter element={<ListPrLine/>}/>}/>
                                <Route path={"/exporter/products"}
                                       element={<HomeExporter element={<ListProduct/>}/>}/>
                                <Route path={"/exporter/lots"}
                                       element={<HomeExporter element={<ListLots/>}/>}/>
                            </>
                        }

                        <Route path={"/"} element={<Navigate replace to={"/login"}/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>

    );
}

export default App;
