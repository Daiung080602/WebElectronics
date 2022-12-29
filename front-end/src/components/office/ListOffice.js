import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {FaPlus, FaRegTrashAlt, FaSearch} from "react-icons/fa";
import {Button, Dropdown, DropdownButton, Modal} from "react-bootstrap";
import TableOffice from "./TableOffice";

import {useDispatch, useSelector} from "react-redux";
import {listOfficeSelectedSelector} from "../../redux/selector";
import axios from "axios";
import {apiOffice} from "../url";
import office from "../../redux/reducer/office";
import ModalInfoOffice from "./ModalInfoOffice";


function ListOffice() {
    const typeList = ["Tất cả", "Đại lý", "Cơ sở sản xuất", "Cơ sở bảo hành"]
    const addressList = ["Tất cả", "Hà Nội", "Hồ Chí Minh", "Hải Phòng"]

    const [searchText, setSearchText] = useState('')
    const [type, setType] = useState('Loại cơ sở')
    const [address, setAddress] = useState('Khu vực')
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState("Bạn có muốn xóa tất cả cơ sở đã chọn không?")
    const [isDeleting, setIsDeleting] = useState(false)

    const dispatch = useDispatch()

    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
    }

    const handleChangeType = (e) => {
        setType(e.target.innerText)
    }

    const handleChangeAddress = (e) => {
        setAddress(e.target.innerText)
    }

    const clickSearch = () => {
        let filter = {
            searchText: searchText,
            type: type,
            address: address
        }
        dispatch(office.actions.setSearchChange(filter))
    }

    const listSelected = useSelector(listOfficeSelectedSelector)
    const clickDelete = () => {
        console.log(listSelected)
        if (listSelected.length !== 0) {
            setShow(true)
        }
    }

    const clickOKDelete = () => {
        let status = ''
        setIsDeleting(true)
        listSelected.map((e, i) => {
            axios.delete(apiOffice + "/" + e.id)
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
                        axios.get(apiOffice)
                            .then(respone => {
                                dispatch(office.actions.setListOffice(respone.data))
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
        setStatus("Bạn có muốn xóa tất cả cơ sở đã chọn không?")
        setIsDeleting(false)
    }

    return (
        <div className="right">
            <div className="sticky-top bg-light">
                <div className="title bg-warning bg-opacity-10 d-flex justify-content-between">
                    <h3 className="p-3 d-inline-block">Danh sách cơ sở</h3>
                    <ModalInfoOffice
                        element={<FaPlus/>}
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
                    <DropdownButton variant="outline-secondary" className="dropdown" title="Loại cơ sở">
                        {
                            typeList.length ? typeList.map((type) => (<Dropdown.Item key={type}>{type}</Dropdown.Item>)) : null
                        }
                    </DropdownButton>
                    <DropdownButton variant="outline-secondary" className="dropdown" title="Khu vực">
                        {
                            addressList.length ? addressList.map((type) => (<Dropdown.Item key={type}>{type}</Dropdown.Item>)) : null
                        }
                    </DropdownButton>
                    <Button className="btn-blue" onClick={clickSearch}><FaSearch fontSize='20px'/></Button>
                    <Button className={"btn-blue"} onClick={clickDelete}><FaRegTrashAlt fontSize='20px'/></Button>
                </div>
            </div>

            <div className={"base-table"}>
                <TableOffice/>
            </div>

            <Modal
                show={show}
                onHide={handleModalHide}
                backdrop={"static"}
                dialogClassName="modal-80w"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa sinh viên</Modal.Title>
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
export default ListOffice