import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {useDispatch} from "react-redux";
import {apiGetWarranty, apiOffice, apiProduct, apiProductLine} from "../url";
import product from "../../redux/reducer/product";
import productline from "../../redux/reducer/productline";

function ProductForm(props) {
    const [listState, setListState] = useState([])
    const [newState, setNewState] = useState('')
    const [listAgent, setListAgent] = useState('')
    const [listWarranty, setListWarranty] = useState('')
    const [warranty, setWarranty] = useState('')
    const [status, setStatus] = useState('')
    const [show, setShow] = useState(false)


    useEffect(() => {
        axios.get(apiGetWarranty)
            .then(response => {
                console.log(response.data)
                setListWarranty(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        axios.get(apiGetWarranty)
            .then(response => {
                console.log(response.data)
                setListAgent(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        if (props.info.warranty) {
            setWarranty(props.info.warranty.name)
        } else {
            setWarranty('')
        }
        let currentState = props.info.state.trim()
        if (localStorage.getItem('role') === '2') {
            switch (currentState) {
                case 'Đã nhận từ cơ sở sản xuất':
                case 'Đã bán':
                case 'Đã nhận từ bảo hành':
                case 'Đã bảo hành xong':
                case 'Trả lại KH sau bảo hành':
                    document.getElementById('state').disabled = false
                    break
                default:
                    document.getElementById('state').disabled = true
                    break
            }
        }
        if (localStorage.getItem('role') === '3') {
            switch (currentState) {
                case 'Đang sửa chữa bảo hành':
                    document.getElementById('state').disabled = false
                    break
                default:
                    document.getElementById('state').disabled = true
                    break
            }
        }
        if (localStorage.getItem('role') === '4') {
            switch (currentState) {
                case 'Lỗi, cần trả về nhà máy':
                    document.getElementById('state').disabled = false
                    break
                default:
                    document.getElementById('state').disabled = true
                    break
            }
        }
        if (document.getElementById('state').disabled === true) {
            document.getElementById('btn-submit').disabled = true
        }

        switch (currentState) {
            case 'Đã nhận từ cơ sở sản xuất':
                setListState(['Đã bán'])
                break
            case 'Đã bán':
                setListState(['Lỗi, cần bảo hành'])
                break
            case 'Trả lại KH sau bảo hành':
                setListState(['Lỗi, cần bảo hành'])
                break
            case 'Lỗi, cần bảo hành':
                setListState(['Đang sửa chữa bảo hành'])
                break
            case 'Đang sửa chữa bảo hành':
                setListState(['Đã bảo hành xong', 'Lỗi, cần trả về nhà máy'])
                break
            case 'Lỗi, cần trả về nhà máy':
                setListState(['Lỗi, đã nhận từ bảo hành'])
                break
            case 'Đã bảo hành xong':
                setListState(['Đã nhận từ bảo hành'])
                break
            case 'Lỗi, đã nhận từ bảo hành':
                setListState(['Trả lại KH sau bảo hành'])
                break
            default:
                setListState([])
                break
        }
    }, [])

    const changeState = (e) => {
        e.target.value.trim()
        setNewState(e.target.value)
        if (e.target.value === 'Lỗi, cần bảo hành' && props.info.warranty_id === null) {
            document.getElementById('warranty').disabled = false
        } else {
            if (localStorage.getItem('role') !== '3') {
                document.getElementById('warranty').disabled = true
                document.getElementById('warranty').value = props.info.warranty.name || ''
            }
        }
    }

    const changeWarranty = (e) => {
        setWarranty(e.target.value)
    }

    const clickSubmit = (e) => {
        let success = true
        if (newState === '') {
            success = false
            document.getElementById("state-warning").innerText = 'Chưa chọn trạng thái mới'
        } else {
            document.getElementById("state-warning").innerText = ''
        }
        if (newState === 'Lỗi, cần bảo hành') {
            if (warranty === '') {
                success = false
                document.getElementById("warranty-warning").innerText = 'Chưa chọn cơ sở bảo hành'
            } else {
                document.getElementById("warranty-warning").innerText = ''
            }

        }

        if (success) {
            let form = {}
            if (newState === 'Lỗi, cần bảo hành' && props.info.warranty_id !== null) {
                form = {
                    'state': newState,
                    'agent_id': 'no',
                    'warranty_id': warranty
                }
            } else {
                form = {
                    'state': newState,
                    'agent_id': 'no',
                    'warranty_id': 'no'
                }
            }
            console.log(form)
            if (success) {
                axios.put(apiProduct + "/" + props.info.product_id, form)
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
                            setStatus("Sửa trạng thái thành công!")
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

    const dispatch = useDispatch()
    useEffect(() => {
        axios.get(apiProduct)
            .then(response => {
                dispatch(product.actions.setListProduct(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [status])

    const clickCancel = (e) => {
        props.show(false)
    }

    const handleClose = (e) => {
        setShow(false)
    }

    return (
        <Form>
            <Form.Group className={"mb-3"}>
                <Form.Label>Mã sản phẩm</Form.Label>
                <Form.Control value={props.info.product_id} disabled/>
            </Form.Group>
            <Form.Group className={"mb-3"}>
                <Form.Label>Trạng thái hiện tại</Form.Label>
                <Form.Control value={props.info.state} disabled/>
            </Form.Group>
            <Form.Group className={"mb-3"}>
                <Form.Label>Trạng thái mới</Form.Label>
                <select id={'state'} className="form-select" aria-label="Trạng thái" value={newState} onChange={changeState}>
                    <option value={''}></option>
                    {
                        listState.length ? listState.map((state) => (
                            <option key={state} value={state}>{state}</option>)) : null
                    }
                </select>
                <Form.Text id={"state-warning"} className="text-danger"/>
            </Form.Group>
            {
                localStorage.getItem('role') !== '2' &&
                <Form.Group className={"mb-3"}>
                    <Form.Label>Cơ sở đại lý</Form.Label>
                    <Form.Control value={
                        props.info.agent &&
                        props.info.agent.name
                    } disabled/>
                </Form.Group>
            }
            {
                localStorage.getItem('role') !== '3' &&
                <Form.Group className={"mb-3"}>
                    <Form.Label>Cơ sở bảo hành</Form.Label>
                    <select id={'warranty'} className="form-select" value={warranty} onChange={changeWarranty} disabled>
                        {
                            !props.info.warranty && <option value={''}></option>
                        }
                        {
                            listWarranty.length ? listWarranty.map((e) => (
                                <option key={e.name} value={e.name}>{e.name}</option>)) : null
                        }
                    </select>
                    <Form.Text id={"warranty-warning"} className="text-danger"/>
                </Form.Group>
            }

            <div className={"d-flex flex-row-reverse"}>
                <Button
                    className={"ms-1"}
                    onClick={clickCancel}
                >Cancel</Button>
                <Button
                    id={'btn-submit'}
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

export default ProductForm