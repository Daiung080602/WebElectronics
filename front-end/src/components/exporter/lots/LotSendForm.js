import {Button, Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {useEffect, useState} from "react";
import axios from "axios";
import {apiGetAgent, apiGetWarranty, apiLots, apiProductLine} from "../../url";

function LotSendForm(props) {
    const [lotId, setLotId] = useState('')
    const [agentId, setAgentId] = useState('')
    const [listAgent, setListAgent] = useState([])
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState('')

    const changeAgentID = (e) => {
        setAgentId(e.target.value)
    }

    const clickSubmit = (e) => {
        let success = true
        if (agentId === '') {
            success = false
            document.getElementById('agent-warning').innerText = "Chưa nhập số lượng"
        } else {
            document.getElementById('agent-warning').innerText = ""
        }
        if (success) {
            let form = {
                'agent_id': agentId
            }
            axios.put(apiLots + "/" + props.lotId, form)
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
                        setStatus("Đã gửi thành công!")
                    } else {
                        setStatus(data.status)
                    }
                    setShow(true)
                })
                .catch(error => {
                    console.log(error)
                    setStatus(error.response.data.message)
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

    useEffect(() => {
        axios.get(apiGetAgent)
            .then(response => {
                console.log(response.data)
                setListAgent(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <Form>
            <Form.Group className={"mb-3"}>
                <Form.Label>Mã lô</Form.Label>
                <Form.Control type={"number"} value={props.lotId} disabled/>
                <Form.Text id={"lotid-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Đại lý</Form.Label>
                <select className="form-select" value={agentId} onChange={changeAgentID}>
                    <option value={''}/>
                    {
                        listAgent.length ? listAgent.map((agent) => (
                            <option key={agent.office_id} value={agent.office_id}>{agent.name}</option>)) : null
                    }
                </select>
                <Form.Text id={"agent-warning"} className="text-danger"/>
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
export default LotSendForm