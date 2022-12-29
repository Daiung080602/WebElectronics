import {Component} from "react";
import {Table} from "react-bootstrap";
import axios from "axios";
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {listOfficeRemainingSelector} from "../../redux/selector";
import {useEffect} from "react";
import {apiOffice} from "../url";
import office from "../../redux/reducer/office";
import ModalDelete from "./ModalDelete";
import ModalInfoOffice from "./ModalInfoOffice";

function TableOffice() {
    const offices = useSelector(listOfficeRemainingSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(apiOffice)
            .then(response => {
                dispatch(office.actions.setListOffice(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const clickCheckboxRow = (e) => {
        dispatch(office.actions.selectedChange(e.target.value))
    }

    const clickCheckboxAll = (e) => {
        dispatch(office.actions.selectedAll(e.target.checked))
    }

    return (
        <Table responsive striped>
            <thead className="bg-dark text-white">
            <tr>
                <th width='5%'><input type={'checkbox'} onChange={clickCheckboxAll}/></th>
                <th width='5%'>Sửa</th>
                <th width='5%'>Xóa</th>
                <th width='5%'>STT</th>
                <th width='8%'>Mã cơ sở</th>
                <th width='15%'>Tên cơ sở</th>
                <th width="12%">Số điện thoại</th>
                <th width="20%">Địa chỉ</th>
                <th width='15%'>Người quản lý</th>
                <th width='10%'>Loại cơ sở</th>
            </tr>
            </thead>
            <tbody>
            {
                offices.length ?
                    offices.map((office, i) => (
                        <tr key={i}>
                            <td>
                                <input type={'checkbox'}
                                       value={office.id}
                                       checked={office.selected}
                                       onChange={clickCheckboxRow}/>
                            </td>
                            <td>
                                <ModalInfoOffice
                                    element={<FaRegEdit/>}
                                    title={"Sửa thông tin cơ sở"}
                                    variant={"link"}
                                    info={office}
                                    type={"edit"}
                                />
                            </td>
                            <td>
                                <ModalDelete id={office.id}/>
                            </td>
                            <td>{i}</td>
                            <td>{office.id}</td>
                            <td>{office.name}</td>
                            <td>{office.phone}</td>
                            <td>{office.address}</td>
                            <td>{office.manager}</td>
                            <td>{office.type}</td>

                        </tr>
                    )) : null
            }
            </tbody>
        </Table>
    )
}

export default TableOffice