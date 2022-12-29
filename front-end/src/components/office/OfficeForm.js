import {useEffect, useState} from "react";
import {Button, Dropdown, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from "react-redux";
import {infoOfficeSelector, listOfficeSelector} from "../../redux/selector";
import axios from "axios";
import {apiOffice} from "../url";
import office from "../../redux/reducer/office";

function OfficeForm(props) {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState('')
    const [form, setForm] = useState({})

    const initForm = useSelector(infoOfficeSelector)
    const listOffice = useSelector(listOfficeSelector)
    const listType = ['Đại lý', 'Cơ sở sản xuất', 'Cơ sở bảo hành']

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

    const changeId = (e) => {
        setForm({
            ...form,
            id: e.target.value
        })
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

    const changeManager = (e) => {
        setForm({
            ...form,
            manager: e.target.value
        })
    }

    const changeType = (e) => {
        setForm({
            ...form,
            type: e.target.value
        })
    }

    function checkId() {
        let id = form.id
        if (id.length === 0) {
            return "Bạn chưa nhập mã cơ sở"
        }
        if (props.type === "add") {
            let office = listOffice.find(function (e) {
                return e.id === id
            })
            if (office !== undefined) {
                return "Cơ sở này đã tồn tại"
            }
        }
        return "Yes"
    }

    function checkName() {
        if (form.name.length === 0) {
            return "Bạn chưa nhập tên cơ sở"
        }
        if (form.name.length > 100) {
            return "Tên cơ sở không được có độ dài quá 100 ký tự"
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

    function checkAddress() {
        if (form.address.length === 0) {
            return "Bạn chưa nhập địa chỉ"
        }
        if (form.address.length > 100) {
            return "Địa chỉ không được có độ dài quá 100 ký tự"
        }
        return "Yes"
    }

    function checkManager() {
        if (form.manager.length === 0) {
            return "Bạn chưa nhập tên người quản lý"
        }
        if (form.manager.length > 100) {
            return "Tên người quản lý không được có độ dài quá 100 ký tự"
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
        if (checkName() !== "Yes") {
            success = false
            document.getElementById("name-warning").innerText = checkName()
        } else {
            document.getElementById("name-warning").innerText = ""
        }
        if (checkPhone() !== "Yes") {
            success = false
            document.getElementById("phone-warning").innerText = checkPhone()
        } else {
            document.getElementById("phone-warning").innerText = ""
        }
        if (checkAddress() !== "Yes") {
            success = false
            document.getElementById("address-warning").innerText = checkAddress()
        } else {
            document.getElementById("address-warning").innerText = ""
        }
        if (checkManager()!== "Yes") {
            success = false
            document.getElementById("manager-warning").innerText = checkManager()
        } else {
            document.getElementById("manager-warning").innerText = ''
        }
        if (success) {
            let token = localStorage.getItem('token')
            console.log(form)
            if (props.type === "add") {
                axios.post(apiOffice, form)
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
                axios.put(apiOffice + "/" + form.id, form)
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
                    value={form.id}
                    onChange={changeId}
                />
                <Form.Text id={"id-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Tên cơ sở</Form.Label>
                <Form.Control
                    type={"text"}
                    value={form.name}
                    onChange={changeName}
                />
                <Form.Text id={"name-warning"} className="text-danger"/>
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
                <Form.Text id={"address-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Tên người quản lý</Form.Label>
                <Form.Control
                    type={"text"}
                    value={form.manager}
                    onChange={changeManager}
                />
                <Form.Text id={"manager-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Loại cơ sở</Form.Label>
                <select className="form-select" aria-label="Loại" value={form.type} onChange={changeType}>
                    {
                        listType.length ? listType.map((type) => (
                            <option key={type} value={type}>{type}</option>)) : null
                    }
                </select>
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