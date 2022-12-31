import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {FaPlus, FaRegTrashAlt, FaSearch} from "react-icons/fa";
import {Button, Dropdown, DropdownButton, Modal} from "react-bootstrap";

import {useDispatch, useSelector} from "react-redux";
import TableProduct from "./TableProduct";
import product from "../../redux/reducer/product";

function ListProduct() {
    const [searchText, setSearchText] = useState('')
    const [state, setState] = useState('Trạng thái')
    const [office, setOffice] = useState('')
    const [listState, setListState] = useState([])

    useEffect(() => {
        if (localStorage.getItem('role') == 2) {
            setListState(['Tất cả', 'Đã nhận từ cơ sở sản xuất', 'Đã bán', 'Lỗi, cần bảo hành', 'Đã nhận từ bảo hành',
                'Trả lại KH sau bảo hành', 'Hết thời gian bảo hành'])
        }
        if (localStorage.getItem('role') == 3) {
            setListState(['Tất cả', 'Đang sửa chữa bảo hành', 'Đã bảo hành xong', 'Lỗi, cần trả về nhà máy'])
        }
        if (localStorage.getItem('role') == 4) {
            setListState(['Tất cả', 'Mới sản xuất', 'Lỗi, đã nhận từ bảo hành', 'Lỗi, cần trả về nhà máy'])
        }
    }, [])

    const dispatch = useDispatch()

    const handleChangeSearch = (e) => {
        setSearchText(e.target.value)
    }

    const handleChangeState = (e) => {
        setState(e.target.innerText)
    }

    const handleChangeOffice = (e) => {
        setOffice(e.target.value)
    }

    const clickSearch = () => {
        let filter = {
            searchText: searchText,
            state: state,
            office: office
        }
        dispatch(product.actions.setSearchChange(filter))
    }

    return (
        <div className="right">
            <div className="sticky-top bg-light">
                <div className="title bg-warning bg-opacity-10 d-flex justify-content-between">
                    <h3 className="p-3">Danh sách sản phẩm</h3>
                </div>
                <div className="search">
                    <input type="text" className="input-search bg-light"
                           placeholder="Nhập mã sản phẩm"
                           value={searchText}
                           onChange={handleChangeSearch}
                    />
                    <input type="text" className="input-search bg-light ms-2"
                           placeholder="Nhập tên cơ sở"
                           value={office}
                           onChange={handleChangeOffice}
                    />

                    <DropdownButton variant="outline-secondary" className="dropdown" title={state}>
                        {
                            listState.length ? listState.map((state) => (
                                <Dropdown.Item key={state} onClick={handleChangeState}>{state}</Dropdown.Item>)) : null
                        }
                    </DropdownButton>

                    <Button className="btn-blue" onClick={clickSearch}><FaSearch fontSize='20px'/></Button>
                </div>
            </div>

            <div className={"base-table"}>
                <TableProduct/>
            </div>
        </div>
    )
}

export default ListProduct