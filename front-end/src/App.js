import './App.css';
import {BrowserRouter, Redirect, Route, Routes, Navigate} from "react-router-dom";
import LoginForm from "./components/login/LoginForm";
import Navbar from "./components/Navbar";
import ListProduct from "./components/productline/ListProduct";
import ListEmployee from "./components/employee/ListEmployee";
import ListOffice from "./components/office/ListOffice";
import {Provider} from "react-redux";

import store from "./redux/store"
import Home from "./components/Home";

function App() {
  return (
      <Provider store={store}>
          <div>
              <BrowserRouter>
                  <Routes>
                      <Route path={"/login"} element={<LoginForm/>}></Route>
                      <Route path={"/admin/products"}
                             element={<Home
                                 role={"admin"}
                                 element={<ListProduct/>}/>}/>
                      <Route path={"/admin/employees"}
                             element={<Home
                                 role={"admin"}
                                 element={<ListEmployee/>}/>}/>
                      <Route path={"/admin/offices"}
                             element={
                                 <Home
                                     role={"admin"}
                                     element={<ListOffice/>}/>}/>
                      <Route path={"/"} element={<Navigate replace to={"/login"}/>}/>
                  </Routes>
              </BrowserRouter>
          </div>
      </Provider>

  );
}

export default App;
