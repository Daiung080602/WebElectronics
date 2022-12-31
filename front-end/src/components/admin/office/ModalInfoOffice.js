import {Component, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import OfficeForm from "./OfficeForm";
import {useDispatch} from "react-redux";
import office from "../../../redux/reducer/office";

function ModalInfoOffice(props) {
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()

    const clickButton = (e) => {
        setShow(true)
        if (props.type === "add") {
            dispatch(office.actions.formChange({
                office_id: '',
                password: '',
                name: '',
                phone: '',
                address: '',
                role: 'Admin',
                active: true
            }))
        } else {
            dispatch(office.actions.formChange(props.info))
        }
    }

    const handleClose = (e) => {
        setShow(false)
    }

    return (
        <>
            <div>
                <Button
                    className={props.styleButton}
                    onClick={clickButton}
                    variant={props.variant}
                >
                    {props.element}
                    {props.buttonContent}
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
                    <OfficeForm
                        info={props.info}
                        type={props.type}
                        show={setShow}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalInfoOffice