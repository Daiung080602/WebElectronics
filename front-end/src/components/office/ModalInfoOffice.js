import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import office from "../../redux/reducer/office";
import OfficeForm from "./OfficeForm";

function ModalInfoOffice(props) {
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()

    const clickButton = (e) => {
        setShow(true)
        if (props.type === "add") {
            dispatch(office.actions.formChange({
                id: '',
                name: '',
                phone: '',
                address: '',
                manager: '',
                type: 'Đại lý'
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