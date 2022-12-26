import {Component, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FaRegTrashAlt} from "react-icons/fa";
import axios from "axios";
import {apiEmployee} from "../url";
import {useDispatch} from "react-redux";
import employee from "../../redux/reducer/employee";

function ModalDelete(props) {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState("Bạn muốn xóa sinh viên có mã " + props.id + "?")

    const dispatch = useDispatch()

    const handleModalShow = () => {
        setShow(true)
    }

    const handleModalHide = () => {
        setShow(false)
        axios.get(apiEmployee)
            .then(response => {
                dispatch(employee.actions.setListEmployee(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }

    const clickDelete = () => {
        axios.delete(apiEmployee + "/" + props.id)
            .then(response => {
                setStatus(response.data.status)
            })
    }

    return (
        <>
            <div>
                <Button
                    onClick={handleModalShow}
                    variant={"link"}
                >
                    <FaRegTrashAlt/>
                </Button>
            </div>
            <Modal
                show={show}
                onHide={handleModalHide}
                backdrop={"static"}
                dialogClassName="modal-80w"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa sinh viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {status}
                </Modal.Body>
                <Modal.Footer>
                    {
                        status.startsWith("Bạn muốn xóa") ?
                            <>
                                <Button onClick={clickDelete}>Delete</Button>
                                <Button onClick={handleModalHide}>Cancel</Button>
                            </> :
                            <Button id={"okDelete"} onClick={handleModalHide}>OK</Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDelete