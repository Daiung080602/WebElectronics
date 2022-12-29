import {useState} from "react";
import {Button, Dropdown, DropdownButton, Modal} from "react-bootstrap";
import {FaSearch, FaUserPlus, FaRegTrashAlt} from "react-icons/fa";
import TableEmployee from "./TableEmployee";
import {useDispatch, useSelector} from "react-redux";
import employee from "../../redux/reducer/employee";
import ModalInfoEmployee from "./ModalInfoEmployee";
import {listEmployeeSelectedSelector} from "../../redux/selector";
import axios from "axios";
import {apiEmployee} from "../url";

function ListEmployee() {
    const authenlist = ['Admin', 'Quản lý đại lý', 'Quản lý cơ sở sản xuất', 'Quản lý cơ sở bảo hành']

    const [searchText, setSearchText] = useState('')
    const [role, setRole] = useState('Quyền')
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState('Bạn có muốn xóa tất cả nhân viên đã chọn không?')
    const [isDeleting, setIsDeleting] = useState(false)

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
        dispatch(employee.actions.setSearchChange(data))
    }

    const listSelected = useSelector(listEmployeeSelectedSelector)
    const clickDelete = () => {
        if (listSelected.length !== 0) {
            setShow(true)
        }
    }

    const clickOKDelete = () => {
        let status = ''
        setIsDeleting(true)
        listSelected.map((e, i) => {
            axios.delete(apiEmployee + "/" + e.id)
                .then(response => {
                    if (response.data.status !== "success") {
                        status += response.data.status + "\n"
                    }
                    if (i === listSelected.length - 1) {
                        setIsDeleting(false)
                        if (status === '') {
                            setStatus("Đã xóa thành công!")
                        } else {
                            setStatus(status)
                        }
                        axios.get(apiEmployee)
                            .then(respone => {
                                dispatch(employee.actions.setListEmployee(respone.data))
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                })
        })
    }

    const handleModalHide = () => {
        setShow(false)
        setStatus("Bạn có muốn xóa tất cả nhân viên đã chọn không?")
        setIsDeleting(false)
    }

    return (
        <div className="right">
            <div className="sticky-top bg-light">
                <div className="title bg-warning bg-opacity-10 d-flex justify-content-between">
                    <h3 className="p-3">Danh sách nhân viên</h3>
                    <ModalInfoEmployee
                        element={<FaUserPlus/>}
                        buttonContent={" Thêm nhân viên mới"}
                        title={"Thêm nhân viên mới"}
                        styleButton={"m-3 btn-blue"}
                        type={"add"}
                        info={{}}
                        />
                </div>
                <div className="search">
                    <input type="text" className="input-search bg-light"
                           placeholder="Nhập mã sản phẩm hoặc tên sản phẩm"
                           value={searchText}
                           onChange={handleChangeSearch}/>
                    <DropdownButton variant="outline-secondary" className="dropdown" title={role}>
                        {
                            authenlist.length ? authenlist.map((type) => (
                                <Dropdown.Item key={type} onClick={handleChangeRoleSearch}>{type}</Dropdown.Item>)) : null
                        }
                    </DropdownButton>
                    <Button className={"btn-blue"} onClick={clickSearch}><FaSearch fontSize='20px'/></Button>
                    <Button className={"btn-blue"} onClick={clickDelete}><FaRegTrashAlt fontSize='20px'/></Button>
                </div>
            </div>

            <div className={"base-table"}>
                <TableEmployee/>
            </div>

            <Modal
                show={show}
                onHide={handleModalHide}
                backdrop={"static"}
                dialogClassName="modal-80w"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        isDeleting ?
                            <div className="m-3 text-center fs-3">
                                <span className="spinner-border" role="status"/>
                                &nbsp;Đang xóa
                            </div> : status
                    }
                </Modal.Body>
                <Modal.Footer>
                    {
                        status.startsWith("Bạn có muốn xóa") ?
                            <>
                                <Button onClick={clickOKDelete}>Delete</Button>
                                <Button onClick={handleModalHide}>Cancel</Button>
                            </> :
                            <Button id={"okDelete"} onClick={handleModalHide}>OK</Button>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ListEmployee