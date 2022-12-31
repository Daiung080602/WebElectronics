import Nav from 'react-bootstrap/Nav'
import { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../assets/css/main-styles.css'
import React from "react";
import {
    FaBarcode,
    FaChartLine, FaMagic,
    FaRecycle,
    FaRegBell,
    FaSignOutAlt,
    FaUser,
} from "react-icons/fa";
import {apiLogout} from "../url";

class Navbar extends Component {
    logout = (e) => {
        axios.get(apiLogout, {withCredentials: true})
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    localStorage.removeItem('role')
                    localStorage.removeItem('office_id')
                    localStorage.removeItem('token')
                    window.open('/login','_self')
                }
            })
    }

    render() {
        return (
            <Nav href="/home" className="flex-column float-start left">
                <div className="fixed-nav">
                    <Nav.Item>
                        <Nav.Link id={'home'} className="nav-branch" href={"/home"}>
                            <FaRecycle/>&nbsp;&nbsp;&nbsp;Product Move
                        </Nav.Link>
                    </Nav.Item>
                    <div>
                        <Nav.Item>
                            <Nav.Link id={'products'} className="nav-branch" href={"/admin/productlines"}>
                                <FaBarcode/>&nbsp;&nbsp;&nbsp;Dòng sản phẩm
                            </Nav.Link>
                        </Nav.Item>
                    </div>
                    <Nav.Item>
                        <Nav.Link id={'employees'} className="nav-branch" href={"/admin/offices"}><FaUser/>&nbsp;&nbsp;&nbsp;Quản lý cơ sở</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Item>
                            <Nav.Link id={'products'} className="nav-branch" href={"/admin/products"}>
                                <FaBarcode/>&nbsp;&nbsp;&nbsp;Sản phẩm
                            </Nav.Link>
                        </Nav.Item>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="nav-branch" onClick={this.logout}><FaSignOutAlt/>&nbsp;&nbsp;&nbsp;Log out</Nav.Link>
                    </Nav.Item>
                </div>
            </Nav>
        )
    }
}

export default Navbar