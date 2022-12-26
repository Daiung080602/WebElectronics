import {useEffect, useState} from "react";
import {Button, Dropdown, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from "react-redux";
import {infoEmployeeSelector, listEmployeeSelector} from "../../redux/selector";
import employee from "../../redux/reducer/employee";
import axios from "axios";
import {apiEmployee} from "../url";

function EmployeeForm(props) {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState('')
    const [form, setForm] = useState({})

    const initForm = useSelector(infoEmployeeSelector)
    const listEmployee = useSelector(listEmployeeSelector)
    const listRole = ['Admin', 'Quản lý đại lý', 'Quản lý cơ sở sản xuất', 'Quản lý cơ sở bảo hành', 'Nhân viên']

    const dispatch = useDispatch()

    function handleClose() {
        setShow(false)
    }

    useEffect(() => {
        setForm(initForm)
        if (props.type !== "add") {
            document.getElementById("id").disabled = true
        }
    }, [])

    const changeMSV = (e) => {
        if (props.type === "add") {
            setForm({
                ...form,
                id: e.target.value
            })
        }
    }

    const changeFullname = (e) => {
        setForm({
            ...form,
            fullname: e.target.value
        })
    }

    const changePhone = (e) => {
        setForm({
            ...form,
            phone: e.target.value
        })
    }

    const changeOffice = (e) => {
        setForm({
            ...form,
            office: e.target.value
        })
    }

    const changeActive = (e) => {
        setForm({
            ...form,
            status: e.target.checked
        })
    }

    function checkId() {
        let id = form.id
        if (id.length === 0) {
            return "Bạn chưa nhập mã nhân viên"
        }
        if (id.length !== 8 || isNaN(id)) {
            return "Mã nhân viên phải là 8 chữ số"
        }
        if (props.type === "add") {
            let employee = listEmployee.find(function (e) {
                return e.id === id
            })
            if (employee !== undefined) {
                return "Mã nhân viên này đã tồn tại"
            }
        }
        return "Yes"
    }

    function checkFullname() {
        if (form.fullname.length === 0) {
            return "Bạn chưa nhập họ tên"
        }
        if (form.fullname.length > 100) {
            return "Họ tên không được có độ dài quá 100 ký tự"
        }
        return "Yes"
    }

    function checkPhone() {
        if (form.phone.length === 0) {
            return "Bạn chưa nhập số điện thoại"
        }
        if (form.phone.length !== 10 || isNaN(form.phone)) {
            return "Số điện thoại phải gồm 10 chữ số"
        }
        return "Yes"
    }

    function checkOffice() {
        if (form.office.length === 0) {
            return "Bạn chưa nhập địa chỉ"
        }
        if (form.office.length > 100) {
            return "Địa chỉ không được có độ dài quá 100 ký tự"
        }
        return "Yes"
    }

    const clickSubmit = (e) => {
        let success = true
        if (checkId() !== "Yes") {
            success = false
            document.getElementById("id-warning").innerText = checkId()
        } else {
            document.getElementById("id-warning").innerText = ""
        }
        if (checkFullname() !== "Yes") {
            success = false
            document.getElementById("fullname-warning").innerText = checkFullname()
        } else {
            document.getElementById("fullname-warning").innerText = ""
        }
        if (checkPhone() !== "Yes") {
            success = false
            document.getElementById("phone-warning").innerText = checkPhone()
        } else {
            document.getElementById("phone-warning").innerText = ""
        }
        if (checkOffice() !== "Yes") {
            success = false
            document.getElementById("office-warning").innerText = checkOffice()
        } else {
            document.getElementById("office-warning").innerText = ""
        }

        if (success) {
            let token = localStorage.getItem('token')
            console.log(form)
            if (props.type === "add") {
                axios.post(apiEmployee, form)
                    .then(response => {
                        if (response.status === 201) {
                            console.log(response)
                            return response.data
                        } else {
                            let error = new Error('Error ' + response.status + ': '
                                + response.statusText)
                            error.response = response
                            throw error
                        }
                    })
                    .then(data => {
                        if (data.status === "success") {
                            setStatus("Đã thêm nhân viên mới thành công!")
                        } else {
                            setStatus(data.status)
                        }
                        setShow(true)
                    })
                    .catch(error => {
                        setStatus(error.message)
                        setShow(true)
                    })
            } else {
                axios.put(apiEmployee + "/" + form.id, form)
                    .then(response => {
                        if (response.status === 200) {
                            console.log(response)
                            return response.data
                        } else {
                            let error = new Error('Error ' + response.status + ': '
                                + response.statusText)
                            error.response = response
                            throw error
                        }
                    })
                    .then(data => {
                        if (data.status === "success") {
                            setStatus("Sửa thông tin thành công!")
                        } else {
                            setStatus(data.status)
                        }
                        setShow(true)
                    })
                    .catch(error => {
                        setStatus(error.message)
                        setShow(true)
                    })
            }
        }
    }

    const clickCancel = () => {
        setForm(initForm)
    }

    useEffect(() => {
        axios.get(apiEmployee)
            .then(response => {
                dispatch(employee.actions.setListEmployee(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [status])

    return (
        <Form>
            <Form.Group className={"mb-3"}>
                <Form.Label>Mã nhân viên</Form.Label>
                <Form.Control
                    id={"id"}
                    type={"text"}
                    placeholder={"8 chữ số"}
                    value={form.id}
                    onChange={changeMSV}
                />
                <Form.Text id={"id-warning"} className="text-danger"></Form.Text>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control
                    type={"text"}
                    value={form.fullname}
                    onChange={changeFullname}
                />
                <Form.Text id={"fullname-warning"} className="text-danger"></Form.Text>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                    type={"number"}
                    value={form.phone}
                    onChange={changePhone}
                />
                <Form.Text id={"phone-warning"} className="text-danger"></Form.Text>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                    type={"text"}
                    value={form.office}
                    onChange={changeOffice}
                />
                <Form.Text id={"office-warning"} className="text-danger"></Form.Text>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Chức vụ</Form.Label>
                <select className="form-select" aria-label="Chức vụ">
                    {
                        listRole.length ? listRole.map((role) => (
                            <option key={role} value={role}>{role}</option>)) : null
                    }
                </select>
            </Form.Group>


            <Form.Group className={"mb-3"}>
                <Form.Check type={"checkbox"} label={"active"} checked={form.status} onClick={changeActive}/>
            </Form.Group>

            <div className={"d-flex flex-row-reverse"}>
                <Button
                    className={"ms-1"}
                    onClick={clickCancel}
                >Cancel</Button>
                <Button
                    className={"ms-1"}
                    onClick={clickSubmit}
                >
                    Cập nhật
                </Button>
            </div>
            <div id={"noti"}>
                <Modal
                    show={show}
                    onHide={handleClose}
                    className={"noti"}
                    size={"sm"}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {status}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Form>
    )
}

export default EmployeeForm