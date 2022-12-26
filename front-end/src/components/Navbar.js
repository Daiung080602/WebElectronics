import Nav from 'react-bootstrap/Nav'
import { Component } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/main-styles.css'
import React from "react";
import {
    FaBarcode,
    FaChartLine, FaMagic,
    FaRecycle,
    FaRegBell,
    FaSignOutAlt,
    FaUser,
} from "react-icons/fa";

let url = 'https://637cfc2a16c1b892ebc4d885.mockapi.io/api/category'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            managent: []
        }
    }

    componentDidMount() {
        if (this.props.role === "admin") {
            this.setState({
                managent: ["Quản lý cơ sở"]
            })
        }
    }

    render() {
        // const {category} = this.state
        const {managent} = this.state
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
                            <Nav.Link id={'products'} className="nav-branch" href={"/" + this.props.role + "/products"}>
                                <FaBarcode/>&nbsp;&nbsp;&nbsp;Sản phẩm
                            </Nav.Link>
                        </Nav.Item>
                        {/*{*/}
                        {/*    category.length ?*/}
                        {/*        category.map((type) => (<Nav.Item><Nav.Link className="type">{type}</Nav.Link></Nav.Item>)) :*/}
                        {/*        null*/}
                        {/*}*/}
                    </div>
                    {
                        managent.length ?
                            <Nav.Item>
                                <Nav.Link className={"nav-branch"} href={"/" + this.props.role + "/offices"}>
                                    <FaMagic/>&nbsp;&nbsp;&nbsp;Quản lý cơ sở
                                </Nav.Link>
                            </Nav.Item> :
                            null
                    }
                    <Nav.Item>
                        <Nav.Link id={'employees'} className="nav-branch" href={"/" + this.props.role + "/employees"}><FaUser/>&nbsp;&nbsp;&nbsp;Quản lý nhân viên</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="nav-branch"><FaChartLine/>&nbsp;&nbsp;&nbsp;Xuất báo cáo</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="nav-branch"><FaRegBell/>&nbsp;&nbsp;&nbsp;Thông báo</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="nav-branch" href={"/login"}><FaSignOutAlt/>&nbsp;&nbsp;&nbsp;Log out</Nav.Link>
                    </Nav.Item>
                </div>
            </Nav>
        )
    }
}

export default Navbar