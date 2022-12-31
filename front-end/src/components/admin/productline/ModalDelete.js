import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FaRegTrashAlt} from "react-icons/fa";
import axios from "axios";
import {apiProductLine} from "../../url";
import {useDispatch} from "react-redux";
import productline from "../../../redux/reducer/productline";

function ModalDelete(props) {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState("Bạn muốn xóa dòng sản phẩm " + props.id + "?")

    const dispatch = useDispatch()

    const handleModalShow = () => {
        setShow(true)
    }

    const handleModalHide = () => {
        setShow(false)
        axios.get(apiProductLine)
            .then(response => {
                dispatch(productline.actions.setListProductLine(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }

    const clickDelete = () => {
        axios.delete(apiProductLine + "/" + props.id)
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
                    <Modal.Title>Xóa dòng sản phẩm</Modal.Title>
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