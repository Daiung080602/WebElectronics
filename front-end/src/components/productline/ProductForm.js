import {useEffect, useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from "react-redux";
import {infoProductSelector, listProductSelector} from "../../redux/selector";
import product from "../../redux/reducer/product";
import axios from "axios";
import {apiProduct} from "../url";

function ProductForm(props) {
    const catalog = ['iphone', 'ipad', 'laptop', 'PC']

    const [show, setShow] = useState(false)
    const [status, setStatus] = useState('')
    const [form, setForm] = useState({})
    const [images, setImages] = useState([])
    const [imagesFile, setImagesFile] = useState([])
    const [loading, setLoading] = useState(false)

    const initForm = useSelector(infoProductSelector)
    const listEmployee = useSelector(listProductSelector)

    const dispatch = useDispatch()

    // cloudinary.config({
    //     cloud_name: 'dnyy9glo6',
    //     api_key: '937578929118168',
    //     api_secret: 'Wx05lt4Ky9ZBABoRMjad8uOtW1Q'
    // })

    function handleClose() {
        setShow(false)
    }

    useEffect(() => {
        setForm(initForm)
        setImages(initForm.image)
        if (props.type !== "add") {
            document.getElementById("name").disabled = true
        }
    }, [])

    const changeName = (e) => {
        setForm({
            ...form,
            name: e.target.value
        })
    }

    const changeImage = async e => {
        const files = Array.from(e.target.files)
        if (files.length > 5) {
            document.getElementById("image-warning").innerText = "Không được chọn quá 5 file"
        } else {
            document.getElementById("image-warning").innerText = ""
            setImagesFile(files)
            let images = []
            files.map((file) => {
                let reader = new FileReader()
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        images.push(reader.result)
                        setImages(images)
                    }
                }
                reader.readAsDataURL(file)
            })

        }

    }

    const changeCatalog = (e) => {
        setForm({
            ...form,
            catalog: e.target.value
        })
    }

    const changeWarrantyPeriod = (e) => {
        setForm({
            ...form,
            warrantyPeriod: e.target.value
        })
    }

    const changeMota = (e) => {
        setForm({
            ...form,
            mota: e.target.value
        })
    }

    function checkName() {
        if (form.name.length === 0) {
            return "Bạn chưa nhập tên dòng sản phẩm"
        }
        return "Yes"
    }

    function checkImage() {
        if (imagesFile.length === 0 || imagesFile.length > 5) {
            return "Bạn chưa chọn ảnh hoặc đã chọn quá 5 ảnh"
        }
        return "Yes"

    }

    async function uploadImage() {
        let images = []
        setLoading(true)
        for (let i = 0; i < imagesFile.length; i++) {
            const data = new FormData()
            data.append('file', imagesFile[i])
            data.append('upload_preset', 'product')
            const res = await fetch(
                'https://api.cloudinary.com/v1_1/dnyy9glo6/image/upload',
                {
                    method: 'POST',
                    body: data
                }
            )
            const file = await res.json()
            images.push(file.secure_url)
        }
        setForm({
            ...form,
            image: images
        })

    }
    //     cloudinary.v2.uploader.destroy("1_pmk6jg", function(error,result) {
    //         console.log(result, error) })
    //         .then(resp => console.log(resp))
    //         .catch(_err=> console.log("Something went wrong, please try again later."));
    // }

    function checkWarrantyPeriod() {
        if (form.warrantyPeriod.length === 0) {
            return "Bạn chưa nhập thời gian bảo hành"
        }
        if (form.warrantyPeriod < 1) {
            return "Thời gian bảo hành ít nhất là 1 tháng"
        }
        return "Yes"
    }

    function checkMota() {
        if (form.mota.length === 0) {
            return "Bạn chưa nhập mô tả"
        }
        return "Yes"
    }

    const clickSubmit = async (e) => {
        let success = true
        if (checkName() === "Yes") {
            document.getElementById("name-warning").innerText = ''
        } else {
            success = false
            document.getElementById("name-warning").innerText = checkName()
        }
        if (checkImage() === "Yes") {
            document.getElementById("image-warning").innerText = ''
        } else {
            success = false
            document.getElementById("image-warning").innerText = checkImage()
        }
        if (checkWarrantyPeriod() === "Yes") {
            document.getElementById("wp-warning").innerText = ''
        } else {
            success = false
            document.getElementById("wp-warning").innerText = checkWarrantyPeriod()
        }
        if (checkMota() === "Yes") {
            document.getElementById("mota-warning").innerText = ''
        } else {
            success = false
            document.getElementById("mota-warning").innerText = checkMota()
        }
        if (success) {
            uploadImage()
        }
    }

    useEffect(() => {
        if (loading) {
            postOrPut()
            setLoading(false)
            console.log("ok")
        }
    }, [form.image])

    function postOrPut() {
        if (props.type === "add") {
            axios.post(apiProduct, form)
                .then(response => {
                    if (response.status === 201) {
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
                        setStatus("Đã thêm dòng sản phẩm mới thành công!")
                    } else {
                        setStatus(data.status)
                    }
                    setShow(true)
                })
                .catch(error => {
                    setStatus(error.message)
                    setShow(true)
                })
        } else {
            axios.put(apiProduct + "/" + form.name, form)
                .then(response => {
                    if (response.status === 200) {
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
                        setStatus("Sửa thông tin thành công!")
                    } else {
                        setStatus(data.status)
                    }
                    setShow(true)
                })
                .catch(error => {
                    setStatus(error.message)
                    setShow(true)
                })
        }
    }

    const clickCancel = () => {
        setForm(initForm)
        props.show(false)
    }

    useEffect(() => {
        axios.get(apiProduct)
            .then(response => {
                dispatch(product.actions.setListProduct(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [status])


    return (
        <Form>
            <Form.Group className={"mb-3"}>
                <Form.Label>Tên dòng sản phẩm</Form.Label>
                <Form.Control
                    id={"name"}
                    type={"text"}
                    value={form.name}
                    onChange={changeName}
                />
                <Form.Text id={"name-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Ảnh dòng sản phẩm</Form.Label>
                <Form.Control type={"file"}
                              accept={"image/*"}
                              placeholder={'Upload Image'}
                              onChange={changeImage} multiple/>
                <div className={"img-box"}>
                    {
                        images.length ?
                            images.map((image) => (
                                <img src={image} className={"img-product"}/>
                            )) :
                            <div className={"d-flex align-items-center justify-content-center"}>
                                <img src={"https://res.cloudinary.com/dnyy9glo6/image/upload/v1672170542/product/no-img_f9s39p.png"}/>
                            </div>

                    }
                </div>
                <Form.Text id={"image-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Phân loại</Form.Label>
                <select className={"form-select"} aria-label={"Danh mục"} value={form.catalog} onChange={changeCatalog}>
                    {
                        catalog.map((e) => (
                            <option key={e} value={e}>{e}</option>
                        ))
                    }
                </select>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Thời gian bảo hành</Form.Label>
                <InputGroup>
                    <Form.Control
                        type={"number"}
                        value={form.warrantyPeriod}
                        onChange={changeWarrantyPeriod}
                    />
                    <InputGroup.Text>tháng</InputGroup.Text>
                </InputGroup>
                <Form.Text id={"wp-warning"} className="text-danger"/>
            </Form.Group>

            <Form.Group className={"mb-3"}>
                <Form.Label>Mô tả</Form.Label>
                <textarea className={"form-control"} rows={"4"} value={form.mota} onChange={changeMota}/>
                <Form.Text id={"mota-warning"} className="text-danger"/>
            </Form.Group>

            <div className={"d-flex flex-row-reverse"}>
                {
                    loading ?
                        <>
                            <Button className={"ms-1"} disabled>Cancel</Button>
                            <Button className={"ms-1"} disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </Button>
                        </>
                        :
                        <>
                            <Button className={"ms-1"} onClick={clickCancel}>Cancel</Button>
                            <Button className={"ms-1"} onClick={clickSubmit}>Cập nhật</Button>
                        </>
                }
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

export default ProductForm