import Navbar from "./Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListProduct from "./productline/ListProduct";
import ListEmployee from "./employee/ListEmployee";
import ListOffice from "./office/ListOffice";

function Home(props) {
    return (
        <div className="d-flex">
            <Navbar role={props.role}/>
            {props.element}

        </div>
    )

}

export default Home