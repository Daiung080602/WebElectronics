import {Component, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {FaPlus, FaRegTrashAlt, FaSearch} from "react-icons/fa";
import {Button, Dropdown, DropdownButton, Modal} from "react-bootstrap";
import TableProductLine from "./TableProductLine";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import productline from "../../redux/reducer/productline";


function ListPrLine() {
    const catalogList = ["Tất cả", "iphone", "ipad", "laptop", "PC"]
    const warrantyPeriodList = ["Tất cả", "0-6 tháng", "6-12 tháng", "Lớn hơn 1 năm"]

    const [searchText, setSearchText] = useState('')
    const [catalog, setCatalog] = useState('Danh mục')
    const [warrantyPeriod, setWarrantyPeriod] = useState('Thời gian bảo hành')


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
            type: catalog,
            date: warrantyPeriod
        }
        dispatch(productline.actions.setSearchChange(filter))
    }

    return (
        <div className="right">
            <div className="sticky-top bg-light">
                <div className="title bg-warning bg-opacity-10 d-flex justify-content-between">
                    <h3 className="p-3">Danh sách dòng sản phẩm</h3>
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
                </div>
            </div>

            <div className={"base-table"}>
                <TableProductLine/>
            </div>


            <Modal>

            </Modal>
        </div>
    )
}

export default ListPrLine