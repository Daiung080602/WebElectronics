import {useState} from "react";
import {Button, Dropdown, DropdownButton, Modal} from "react-bootstrap";
import {FaSearch, FaUserPlus, FaRegTrashAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import lots from "../../../redux/reducer/lots";
import TableLots from "./TableLots";
import ModalLots from "./Modal";
import LotForm from "./LotForm";

function ListLots() {
    const [searchText, setSearchText] = useState('')
    const [role, setRole] = useState('Quyền')

    const dispatch = useDispatch()

    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
    }

    // const handleChangeRoleSearch = (e) => {
    //     setRole(e.target.innerText)
    // }

    const clickSearch = () => {
        let data = {
            searchText: searchText
        }
        dispatch(lots.actions.setSearchChange(data))
    }


    return (
        <div className="right">
            <div className="sticky-top bg-light">
                <div className="title bg-warning bg-opacity-10 d-flex justify-content-between">
                    <h3 className="p-3">Danh sách lô hàng</h3>
                </div>
                <div className="search">
                    <input type="text" className="input-search bg-light"
                           placeholder="Nhập mã lô"
                           value={searchText}
                           onChange={handleChangeSearch}/>
                    <Button className={"btn-blue"} onClick={clickSearch}><FaSearch fontSize='20px'/></Button>
                    <div className={'ms-2'}>
                        <ModalLots element={<LotForm/>} title={"Thêm lô"}/>
                    </div>
                </div>
            </div>

            <div className={"base-table"}>
                <TableLots/>
            </div>

        </div>
    )
}

export default ListLots