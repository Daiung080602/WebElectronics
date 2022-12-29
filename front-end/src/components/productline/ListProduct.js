import {Component, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {FaPlus, FaRegTrashAlt, FaSearch} from "react-icons/fa";
import {Button, Dropdown, DropdownButton, Modal} from "react-bootstrap";
import TableProduct from "./TableProduct";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import product from "../../redux/reducer/product";
import {listProductSelectedSelector} from "../../redux/selector";
import {apiProduct} from "../url";
import ModalInfoProduct from "./ModalInfoProduct";


function ListProduct() {
    const catalogList = ["Tất cả", "iphone", "ipad", "laptop", "PC"]
    const warrantyPeriodList = ["Tất cả", "0-6 tháng", "6-12 tháng", "Lớn hơn 1 năm"]

    const [searchText, setSearchText] = useState('')
    const [catalog, setCatalog] = useState('Danh mục')
    const [warrantyPeriod, setWarrantyPeriod] = useState('Thời gian bảo hành')
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState("Bạn có muốn xóa tất cả dòng sản phẩm đã chọn không?")
    const [isDeleting, setIsDeleting] = useState(false)

    const dispatch = useDispatch()

    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
    }

    const handleChangeCatalog = (e) => {
        setCatalog(e.target.innerText)
    }

    const handleChangeWarrantyPeriod = (e) => {
        setWarrantyPeriod(e.target.innerText)
    }

    const clickSearch = () => {
        let filter = {
            searchText: searchText,
            catalog: catalog,
            warrantyPeriod: warrantyPeriod
        }
        dispatch(product.actions.setSearchChange(filter))
    }

    const listSelected = useSelector(listProductSelectedSelector)
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
            axios.delete(apiProduct + "/" + e.name)
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
                        axios.get(apiProduct)
                            .then(respone => {
                                dispatch(product.actions.setListProduct(respone.data))
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
        setStatus("Bạn có muốn xóa tất cả dòng sản phẩm đã chọn không?")
        setIsDeleting(false)
    }

    return (
        <div className="right">
            <div className="sticky-top bg-light">
                <div className="title bg-warning bg-opacity-10 d-flex justify-content-between">
                    <h3 className="p-3">Danh sách sản phẩm</h3>
                    <ModalInfoProduct
                        element={<FaPlus/>}
                        buttonContent={" Thêm dòng sản phẩm mới"}
                        title={"Thêm dòng sản phẩm mới"}
                        styleButton={"m-3 btn-blue"}
                        type={"add"}
                        info={{}}
                        />
                </div>
                <div className="search">
                    <input type="text" className="input-search bg-light"
                           placeholder="Nhập tên dòng sản phẩm"
                           value={searchText}
                           onChange={handleChangeSearch}
                            />
                    <DropdownButton variant="outline-secondary" className="dropdown" title={catalog}>
                        {
                            catalogList.length ? catalogList.map((catalog) => (
                                <Dropdown.Item key={catalog} onClick={handleChangeCatalog}>{catalog}</Dropdown.Item>)) : null
                        }
                    </DropdownButton>
                    <DropdownButton variant="outline-secondary" className="dropdown" title={warrantyPeriod}>
                        {
                            warrantyPeriodList.length ? warrantyPeriodList.map((warrantyPeriod) => (
                                <Dropdown.Item key={warrantyPeriod} onClick={handleChangeWarrantyPeriod}>{warrantyPeriod}</Dropdown.Item>)) : null
                        }
                    </DropdownButton>
                    <Button className="btn-blue" onClick={clickSearch}><FaSearch fontSize='20px'/></Button>
                    <Button className={"btn-blue"} onClick={clickDelete}><FaRegTrashAlt fontSize='20px'/></Button>
                </div>
            </div>

            <div className={"base-table"}>
                <TableProduct/>
            </div>

            <Modal
                show={show}
                onHide={handleModalHide}
                backdrop={"static"}
                dialogClassName="modal-80w"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa dòng sản phẩm</Modal.Title>
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

export default ListProduct