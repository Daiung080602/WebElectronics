import {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import axios from "axios";
import {FaRegEdit} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {listOfficeRemainingSelector} from "../../../redux/selector";
import ModalInfoOffice from "./ModalInfoOffice";
import ModalDelete from "./ModalDelete";
import {apiOffice} from "../../url";
import office from "../../../redux/reducer/office";

function TableOffice() {
    const offices = useSelector(listOfficeRemainingSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(apiOffice)
            .then(response => {
                console.log(response.data)
                dispatch(office.actions.setListOffice(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (<Table responsive striped>
            <thead className="bg-dark text-white">
            <tr>
                <th width='5%'>Sửa</th>
                <th width='5%'>STT</th>
                <th width='10%'>Mã cơ sở</th>
                <th width='20%'>Tên cơ sở</th>
                <th width="12%">Số điện thoại</th>
                <th width="25%">Địa chỉ</th>
                <th width='13%'>Chức vụ</th>
                <th width='10%'>Hoạt động</th>
            </tr>
            </thead>
            <tbody>
            {
                offices.length ? offices.map((office, i) => (
                    <tr key={office.office_id}>

                        <td>
                            <ModalInfoOffice
                                element={<FaRegEdit/>}
                                title={"Sửa thông tin cơ sở"}
                                variant={"link"}
                                info={office}
                                type={"edit"}
                                />
                        </td>
                        <td>{i + 1}</td>
                        <td>{office.office_id}</td>
                        <td>{office.name}</td>
                        <td>{office.phone}</td>
                        <td>{office.address}</td>
                        <td>
                            {office.role === 1 && 'Admin'}
                            {office.role === 2 && 'Đại lý'}
                            {office.role === 3 && 'Cơ sở bảo hành'}
                            {office.role === 4 && 'Cơ sở sản xuất'}
                        </td>
                        <td>
                            <input type={'checkbox'}
                                   checked={office.active} disabled/>

                        </td>
                    </tr>)) : null
            }
            </tbody>
        </Table>)
}

export default TableOffice