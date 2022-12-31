import {useEffect, useState} from "react";
import {Button, Dropdown, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from "react-redux";
import {
    infoCustomerSelector,
    listCustomerSelector
} from "../../../redux/selector";
import axios from "axios";
import {apiCustomer, apiOffice} from "../../url";
import customer from "../../../redux/reducer/customer";

function CustomerForm(props) {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState('')
    const [form, setForm] = useState({})

    const initForm = useSelector(infoCustomerSelector)
    const listOffice = useSelector(listCustomerSelector)

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

    const changeCustomerId = (e) => {
        setForm({
            ...form,
            customer_id: e.target.value
        })

    }

    const changeName = (e) => {
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

    const changeAddress = (e) => {
        setForm({
            ...form,
            address: e.target.value
        })
    }

    function checkId() {
        let id = form.customer_id
        if (id.length === 0) {
            return "Bạn chưa nhập mã nhân viên"
        }
        if (props.type === "add") {
            let office = listOffice.find(function (e) {
                return e.id === id
            })
            if (office !== undefined) {
                return "Mã nhân viên này đã tồn tại"
            }
        }
        return "Yes"
    }

    function checkName() {
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

        if (success) {
            console.log(form)
            if (props.type === "add") {
                axios.post(apiCustomer, form)
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
                            setStatus("Đã thêm khách hàng mới thành công!")
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
                axios.put(apiCustomer + "/" + form.id, form)
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
        axios.get(apiCustomer)
            .then(response => {
                dispatch(customer.actions.setListCustomer(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [status])

    return (
        <Form>
            <Form.Group className={"mb-3"}>
                <Form.Label>Mã khách hàng</Form.Label>
                <Form.Control
                    id={"id"}
                    type={"text"}
                    value={form.customer_id}
                    onChange={changeCustomerId}
                />
                <Form.Text id={"id-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Tên khách hàng</Form.Label>
                <Form.Control
                    type={"text"}
                    value={form.fullname}
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

export default CustomerForm