import {Button, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiGetWarranty, apiLots, apiOffice, apiProductLine} from "../../url";
import office from "../../../redux/reducer/office";
import {useDispatch} from "react-redux";
import lots from "../../../redux/reducer/lots";

function LotForm(props) {
    const [lotId, setLotId] = useState('')
    const [amount, setAmount] = useState('')
    const [pl, setPl] = useState('')
    const [listPL, setListPL] = useState([])
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState('')

    const changeLotId = (e) => {
        setLotId(e.target.value)
    }

    const changeAmount = (e) => {
        setAmount(e.target.value)
    }

    const changePL = (e) => {
        setPl(e.target.value)
    }

    const clickSubmit = (e) => {
        let success = true
        if (lotId === '') {
            success = false
            document.getElementById('lotid-warning').innerText = "Chưa nhập mã lô"
        } else {
            document.getElementById('lotid-warning').innerText = ""
        }
        if (amount === '') {
            success = false
            document.getElementById('amount-warning').innerText = "Chưa nhập số lượng"
        } else {
            document.getElementById('amount-warning').innerText = ""
        }
        if (pl === '') {
            success = false
            document.getElementById('pl-warning').innerText = "Chưa chọn dòng sản phẩm"
        } else {
            document.getElementById('pl-warning').innerText = ""
        }
        if (success) {
            let date = new Date()
            let date_export = date.getFullYear() + "-" + (date.getMonth() + 1) + "-"
                + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes()
                + ":" + date.getSeconds()
            console.log(date_export)
            let form = {
                'lot_id': lotId,
                'amount': amount,
                'productline_id': pl,
                'exporter_id': localStorage.getItem('office_id'),
                'date_export': date_export
            }
            axios.post(apiLots, form)
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
                        setStatus("Thêm lô hàng thành công!")
                    } else {
                        setStatus(data.status)
                    }
                    setShow(true)
                })
                .catch(error => {
                    console.log(error)
                    setStatus(error.response.data.error)
                    setShow(true)
                })
        }
    }

    const clickCancel = (e) => {
        props.show(false)
    }

    const handleClose = (e) => {
        setShow(false)
    }

    const dispatch = useDispatch()
    useEffect(() => {
        axios.get(apiLots)
            .then(response => {
                dispatch(lots.actions.setListLots(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [status])

    useEffect(() => {
        axios.get(apiProductLine)
            .then(response => {
                console.log(response.data)
                setListPL(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <Form>
            <Form.Group className={"mb-3"}>
                <Form.Label>Mã lô</Form.Label>
                <Form.Control type={"number"} value={lotId} onChange={changeLotId}/>
                <Form.Text id={"lotid-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Số lượng</Form.Label>
                <Form.Control type={'number'} value={amount} onChange={changeAmount}/>
                <Form.Text id={"amount-warning"} className="text-danger"/>
            </Form.Group>
            <Form.Group className={"mb-3"}>
                <Form.Label>Dòng sản phẩm</Form.Label>
                <select id={'pl'} className="form-select" value={pl} onChange={changePL}>
                    <option value={''}/>
                    {
                        listPL.length ? listPL.map((pl) => (
                            <option key={pl.productline_id} value={pl.productline_id}>{pl.productline_id}</option>)) : null
                    }
                </select>
                <Form.Text id={"pl-warning"} className="text-danger"/>
            </Form.Group>

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
export default LotForm