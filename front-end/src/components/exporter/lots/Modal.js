import {Component, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {FaPlus, FaRegEdit} from "react-icons/fa";
import LotForm from "./LotForm";

function ModalLots(props) {
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()

    const clickButton = (e) => {
        setShow(true)
    }

    const handleClose = (e) => {
        setShow(false)
    }

    return (
        <>
            <div>
                <Button
                    onClick={clickButton}
                >
                    {props.title}
                </Button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop={"static"}
                dialogClassName="modal-80w"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/*<LotForm*/}
                    {/*    show={setShow}*/}
                    {/*/>*/}
                    {props.element}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalLots