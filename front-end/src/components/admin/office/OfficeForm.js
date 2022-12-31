import {useEffect, useState} from "react";
import {Button, Dropdown, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from "react-redux";
import {infoOfficeSelector, listOfficeSelector} from "../../../redux/selector";
import axios from "axios";
import {apiOffice} from "../../url";
import office from "../../../redux/reducer/office";

function OfficeForm(props) {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState('')
    const [form, setForm] = useState({})

    const initForm = useSelector(infoOfficeSelector)
    const listOffice = useSelector(listOfficeSelector)
    const listRole = ['Đại lý', 'Cơ sở bảo hành', 'Cơ sở sản xuất']

    const dispatch = useDispatch()

    function handleClose() {
        setShow(false)
    }

    useEffect(() => {
        setForm(initForm)
        if (props.type !== "add") {
            document.getElementById("id").disabled = true
            document.getElementById("password").disabled = true
            document.getElementById('role').disabled = true
        }
    }, [])

    const changeId = (e) => {
        if (props.type === "add") {
            setForm({
                ...form,
                office_id: e.target.value
            })
        }
    }

    const changePassword = (e) => {
        if (props.type === "add") {
            setForm({
                ...form,
                password: e.target.value
            })
        }
    }

    const changeName = (e) => {
        setForm({
            ...form,
            name: e.target.value
        })
    }

    const changePhone = (e) => {
        setForm({
            ...form,
            phone: e.target.value
        })
    }

    const changeAddress = (e) => {
        setForm({
            ...form,
            address: e.target.value
        })
    }

    const changeRole = (e) => {
        setForm({
            ...form,
            role: e.target.value
        })
    }

    const changeActive = (e) => {
        setForm({
            ...form,
            active: e.target.checked
        })
    }

    function checkId() {
        let id = form.office_id
        if (id === '' || id === undefined) {
            return "Bạn chưa nhập mã nhân viên"
        }
        if (id.length !== 8 || isNaN(id)) {
            return "Mã nhân viên phải là 8 chữ số"
        }
        if (props.type === "add") {
            let office = listOffice.find(function (e) {
                return e.office_id === id
            })
            if (office !== undefined) {
                return "Mã nhân viên này đã tồn tại"
            }
        }
        return "Yes"
    }

    function checkPassword() {
        if (props.type === 'edit') {
            return "Yes"
        }
        let password = form.password
        if (password.length === 0) {
            return "Bạn chưa nhập mật khẩu"
        }
        if (password.length < 8) {
            return "Mật khẩu phải gồm tối thiểu 8 ký tự"
        }
        let checkUpperCase = false
        let checkLowerCase = false
        let checkNumber = false
        for (let i = 0; i < password.length; i++) {
            if (!isNaN(password[i])) {
                checkNumber = true
            }
            if (password[i] >= 'A' && password[i] < 'Z') {
                checkUpperCase = true

            }
            if (password[i] >= 'a' && password[i] < 'z') {
                checkLowerCase = true
            }
        }
        if (!(checkNumber && checkUpperCase && checkLowerCase)) {
            return "Mật khẩu phải gồm chữ hoa, chữ thường và số"
        }
        return "Yes"
    }

    function checkName() {
        if (form.name.length === 0) {
            return "Bạn chưa nhập họ tên"
        }
        if (form.name.length > 100) {
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
        if (form.address.length === 0) {
            return "Bạn chưa nhập địa chỉ"
        }
        if (form.address.length > 100) {
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
        if (checkPassword() !== "Yes") {
            success = false
            document.getElementById("password-warning").innerText = checkPassword()
        } else {
            document.getElementById("password-warning").innerText = ''
        }
        if (checkName() !== "Yes") {
            success = false
            document.getElementById("fullname-warning").innerText = checkName()
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
            document.getElementById("officeOLD-warning").innerText = checkOffice()
        } else {
            document.getElementById("officeOLD-warning").innerText = ""
        }

        if (success) {
            if (props.type === "add") {
                axios.post(apiOffice, form)
                    .then(response => {
                        if (response.status === 201) {
                            console.log(response)
                            return response.data
                        } else {
                            console.log(response)
                            let error = new Error('Error ' + response.status + ': '
                                + response.statusText)
                            error.response = response
                            throw error
                        }
                    })
                    .then(data => {
                        if (data.status === "success") {
                            setStatus("Đã thêm cơ sở thành công!")
                        } else {
                            setStatus(data.status)
                        }
                        setShow(true)
                    })
                    .catch(error => {
                        console.log(error)
                        setStatus(error.message)
                        setShow(true)
                    })
            } else {
                axios.put(apiOffice + "/" + form.office_id, form)
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
                        console.log(error)
                        setStatus(error.message)
                        setShow(true)
                    })
            }
        }
    }

    const clickCancel = () => {
        setForm(initForm)
        props.show(false)
    }

    useEffect(() => {
        axios.get(apiOffice)
            .then(response => {
                dispatch(office.actions.setListOffice(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [status])

    return (
        <Form>
            <Form.Group className={"mb-3"}>
                <Form.Label>Mã cơ sở</Form.Label>
                <Form.Control
                    id={"id"}
                    type={"text"}
                    placeholder={"8 chữ số"}
                    value={form.office_id}
                    onChange={changeId}
                />
                <Form.Text id={"id-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                    id={"password"}
                    type={"password"}
                    value={form.password}
                    onChange={changePassword}
                />
                <Form.Text id={"password-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Tên cơ sở</Form.Label>
                <Form.Control
                    type={"text"}
                    value={form.name}
                    onChange={changeName}
                />
                <Form.Text id={"fullname-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                    type={"number"}
                    value={form.phone}
                    onChange={changePhone}
                />
                <Form.Text id={"phone-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                    type={"text"}
                    value={form.address}
                    onChange={changeAddress}
                />
                <Form.Text id={"officeOLD-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Chức vụ</Form.Label>
                <select id={'role'} className="form-select" aria-label="Chức vụ" value={form.role} onChange={changeRole}>
                    {
                        listRole.length ? listRole.map((role,i) => (
                            <option key={role} value={i+2}>{role}</option>)) : null
                    }
                </select>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <input
                    type={"checkbox"}
                    checked={form.active}
                    onChange={changeActive}
                /> Hoạt động
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

export default OfficeForm