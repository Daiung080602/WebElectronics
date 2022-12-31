import Navbar from "./Navbar";
import {useEffect, useState} from "react";
import {defaults} from "axios";

function HomeWarranty(props) {
    return (
        localStorage.getItem('role') === '3' ?
            <div className="d-flex">
                <Navbar/>
                {props.element}
            </div> :
            <div>
                <h1>404 Not Found</h1>
            </div>

    )
}
export default HomeWarranty