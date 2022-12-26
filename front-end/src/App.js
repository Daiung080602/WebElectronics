import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./page/LoginForm";
import Navbar from "./components/Navbar";
import ListProduct from "./components/product/ListProduct";
import ListEmployee from "./components/employee/ListEmployee";
import ListOffice from "./components/office/ListOffice";
import {Provider} from "react-redux";

import store from "./redux/store"

function App() {
  return (
      <Provider store={store}>
          <div>
              <BrowserRouter>
                  <Routes>
                      <Route path={"/login"} element={<LoginForm/>}></Route>
                  </Routes>
                  <div className="d-flex">
                      <Navbar role={"admin"}/>
                      <Routes>
                          <Route path={"/"} element={<div className={'right'}>Welcome</div>}/>
                          <Route path={"/admin/products"} element={<ListProduct/>}/>
                          <Route path={"/admin/employees"} element={<ListEmployee/>}/>
                          <Route path={"/admin/offices"} element={<ListOffice/>}/>
                      </Routes>
                  </div>
              </BrowserRouter>
          </div>
      </Provider>

  );
}

export default App;
