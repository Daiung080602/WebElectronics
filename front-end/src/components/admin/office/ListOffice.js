import {useState} from "react";
import {Button, Dropdown, DropdownButton, Modal} from "react-bootstrap";
import {FaSearch, FaUserPlus, FaRegTrashAlt} from "react-icons/fa";
import TableOffice from "./TableOffice";
import {useDispatch, useSelector} from "react-redux";
import ModalInfoOffice from "./ModalInfoOffice";
import office from "../../../redux/reducer/office";

function ListOffice() {
    const authenlist = ['Tất cả', 'Admin', 'Đại lý', 'Cơ sở sản xuất', 'Cơ sở bảo hành']

    const [searchText, setSearchText] = useState('')
    const [role, setRole] = useState('Quyền')

    const dispatch = useDispatch()

    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
    }

    const handleChangeRoleSearch = (e) => {
        setRole(e.target.innerText)
    }

    const clickSearch = () => {
        let data = {
            searchText: searchText,
            role: role
        }
        dispatch(office.actions.setSearchChange(data))
    }


    return (
        <div className="right">
            <div className="sticky-top bg-light">
                <div className="title bg-warning bg-opacity-10 d-flex justify-content-between">
                    <h3 className="p-3">Danh sách cơ sở</h3>
                    <ModalInfoOffice
                        element={<FaUserPlus/>}
                        buttonContent={" Thêm cơ sở mới"}
                        title={"Thêm cơ sở mới"}
                        styleButton={"m-3 btn-blue"}
                        type={"add"}
                        info={{}}
                        />
                </div>
                <div className="search">
                    <input type="text" className="input-search bg-light"
                           placeholder="Nhập mã cơ sở hoặc tên cơ sở"
                           value={searchText}
                           onChange={handleChangeSearch}/>
                    <DropdownButton variant="outline-secondary" className="dropdown" title={role}>
                        {
                            authenlist.length ? authenlist.map((type) => (
                                <Dropdown.Item key={type} onClick={handleChangeRoleSearch}>{type}</Dropdown.Item>)) : null
                        }
                    </DropdownButton>
                    <Button className={"btn-blue"} onClick={clickSearch}><FaSearch fontSize='20px'/></Button>
                    {/*<Button className={"btn-blue"} onClick={clickDelete}><FaRegTrashAlt fontSize='20px'/></Button>*/}
                </div>
            </div>

            <div className={"base-table"}>
                <TableOffice/>
            </div>

        </div>
    )
}

export default ListOffice