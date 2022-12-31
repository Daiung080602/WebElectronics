import Navbar from "./Navbar";
import {useEffect, useState} from "react";

function HomeAdmin(props) {
    return (
        localStorage.getItem('role') == 1 ?
            <div className="d-flex">
                <Navbar/>
                {props.element}
            </div> :
            <div>
                <h1>404 Not Found</h1>
            </div>

    )

}

export default HomeAdmin