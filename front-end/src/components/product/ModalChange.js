import {Component, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {FaRegEdit} from "react-icons/fa";
import ProductForm from "./ProductForm";

function ModalChange(props) {
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
                    variant={"link"}
                >
                    <FaRegEdit/>
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
                        Sửa trạng thái sản phẩm
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductForm
                        info={props.info}
                        show={setShow}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalChange