import {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import axios from "axios";
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import employee from "../../redux/reducer/employee";
import {listEmployeeRemainingSelector, listEmployeeSelectedSelector} from "../../redux/selector";
import ModalInfoEmployee from "./ModalInfoEmployee";
import ModalDelete from "./ModalDelete";
import {apiEmployee} from "../url";

function TableEmployee() {
    const employees = useSelector(listEmployeeRemainingSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(apiEmployee)
            .then(response => {
                dispatch(employee.actions.setListEmployee(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const clickCheckboxRow = (e) => {
        dispatch(employee.actions.selectedChange(e.target.value))
    }

    const clickCheckboxAll = (e) => {
        dispatch(employee.actions.selectedAll(e.target.checked))
    }

    return (<Table responsive striped>
            <thead className="bg-dark text-white">
            <tr>
                <th width='5%'><input type={'checkbox'} onClick={clickCheckboxAll}/></th>
                <th width='10%'></th>
                <th width='5%'>STT</th>
                <th width='10%'>Mã nhân viên</th>
                <th width='15%'>Tên nhân viên</th>
                <th width="12%">Số điện thoại</th>
                <th width="20%">Địa chỉ</th>
                <th width='13%'>Chức vụ</th>
                <th width='10%'>Trạng thái</th>

            </tr>
            </thead>
            <tbody>
            {employees.length ? employees.map((employee, i) => (<tr key={employee.id}>
                    <td>
                        <input type={'checkbox'}
                               value={employee.id}
                               checked={employee.selected}
                               onClick={clickCheckboxRow}/>
                    </td>
                    <td>
                        <ModalDelete id={employee.id} />
                        <ModalInfoEmployee
                            element={<FaRegEdit/>}
                            title={"Sửa thông tin nhân viên"}
                            variant={"link"}
                            info = {employee}
                            type = "edit"
                            />
                    </td>
                    <td>{i + 1}</td>
                    <td>{employee.id}</td>
                    <td>{employee.fullname}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.office}</td>
                    <td>{employee.role}</td>
                    <td>{employee.status ? "Hoạt động" : "Không hoạt động"}</td>

                </tr>)) : null}
            </tbody>
        </Table>)
}

export default TableEmployee