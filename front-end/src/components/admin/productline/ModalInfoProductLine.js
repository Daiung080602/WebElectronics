import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import ProductLineForm from "./ProductLineForm";
import {useDispatch} from "react-redux";
import productline from "../../../redux/reducer/productline";

function ModalInfoProductLine(props) {
    const [show, setShow] = useState(false);

    const dispatch = useDispatch()

    const clickButton = (e) => {
        setShow(true)
        if (props.type === "add") {
            dispatch(productline.actions.formChange({
                productline_id: '',
                image: [],
                type: 'iphone',
                date_warranty: '',
                details: '',
                active: true,
            }))
        } else {
            dispatch(productline.actions.formChange(props.info))
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
                    <ProductLineForm
                        info={props.info}
                        type={props.type}
                        show={setShow}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalInfoProductLine