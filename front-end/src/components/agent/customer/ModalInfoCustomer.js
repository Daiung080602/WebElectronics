import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import customer from "../../../redux/reducer/customer";
import CustomerForm from "./CustomerForm";

function ModalInfoCustomer(props) {
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()

    const clickButton = (e) => {
        setShow(true)
        if (props.type === "add") {
            dispatch(customer.actions.formChange({
                customer_id: '',
                fullname: '',
                phone: '',
                address: ''
            }))
        } else {
            dispatch(customer.actions.formChange(props.info))
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
                    <CustomerForm
                        info={props.info}
                        type={props.type}
                        show={setShow}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalInfoCustomer