import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {FaPlus, FaSearch} from "react-icons/fa";
import {Button} from "react-bootstrap";
import {useDispatch} from "react-redux";
import TableCustomer from "./TableCustomer";
import ModalInfoCustomer from "./ModalInfoCustomer";
import customer from "../../../redux/reducer/customer";


function ListCustomer() {
    const [searchText, setSearchText] = useState('')

    const dispatch = useDispatch()

    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
    }

    const clickSearch = () => {
        let filter = {
            searchText: searchText,
        }
        dispatch(customer.actions.setSearchChange(filter))
    }

    return (
        <div className="right">
            <div className="sticky-top bg-light">
                <div className="title bg-warning bg-opacity-10 d-flex justify-content-between">
                    <h3 className="p-3">Danh sách khách hàng</h3>
                    <ModalInfoCustomer
                        element={<FaPlus/>}
                        buttonContent={" Thêm khách hàng mới"}
                        title={"Thêm khách hàng mới"}
                        styleButton={"m-3 btn-blue"}
                        type={"add"}
                        info={{}}
                    />
                </div>
                <div className="search">
                    <input type="text" className="input-search bg-light"
                           placeholder="Nhập mã khách hàng hoặc tên khách hàng"
                           value={searchText}
                           onChange={handleChangeSearch}
                    />
                    <Button className="btn-blue" onClick={clickSearch}><FaSearch fontSize='20px'/></Button>
                </div>
            </div>

            <div className={"base-table"}>
                <TableCustomer/>
            </div>

        </div>
    )
}

export default ListCustomer