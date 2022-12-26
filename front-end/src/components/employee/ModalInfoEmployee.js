import {Component, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import EmployeeForm from "./EmployeeForm";
import {useDispatch} from "react-redux";
import employee from "../../redux/reducer/employee";

function ModalInfoEmployee(props) {
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()

    const clickButton = (e) => {
        setShow(true)
        if (props.type === "add") {
            dispatch(employee.actions.formChange({
                id: '',
                password: '',
                fullname: '',
                phone: '',
                office: '',
                role: 'Admin',
                status: true
            }))
        } else {
            dispatch(employee.actions.formChange(props.info))
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
                    <EmployeeForm
                        info={props.info}
                        type={props.type}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalInfoEmployee