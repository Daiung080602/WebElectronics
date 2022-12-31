import {useEffect} from "react";
import {Table} from "react-bootstrap";
import axios from "axios";
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import {apiProductLine} from "../../url";
import {useDispatch, useSelector} from "react-redux";
import {listProductLineRemainingSelector} from "../../../redux/selector";
import productline from "../../../redux/reducer/productline";
import ModalInfoProductLine from "./ModalInfoProductLine";
import ModalDelete from "./ModalDelete";

function TableProductLine () {
    const productlines = useSelector(listProductLineRemainingSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(apiProductLine)
            .then(response => {
                console.log(response.data)
                dispatch(productline.actions.setListProductLine(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <Table responsive striped>
            <thead className="bg-dark text-white">
            <tr>
                <th width='5%'>Sửa</th>
                <th width='5%'>STT</th>
                <th width='30%'>Tên dòng sản phẩm</th>
                <th width='20%'>Hình ảnh</th>
                <th width='10%'>Danh mục</th>
                <th width='20%'>Thời gian bảo hành</th>
                <th width='10%'>Hoạt động</th>
            </tr>
            </thead>
            <tbody>
            {
                productlines.length ?
                    productlines.map((productline, i) => (
                        <tr key={i}>
                            <td>
                                <ModalInfoProductLine
                                    element={<FaRegEdit/>}
                                    title={"Sửa thông tin dòng sản phẩm"}
                                    variant={"link"}
                                    info={productline}
                                    type={"edit"}
                                />
                            </td>
                            <td>{i + 1}</td>
                            <td>{productline.productline_id}</td>
                            <td><img className="img" src={productline.image[0]} /></td>
                            <td>{productline.type}</td>
                            <td>{productline.date_warranty}</td>
                            <td>
                                <input type={'checkbox'}
                                       value={productline.productline_id}
                                       checked={productline.active}
                                       disabled
                                />
                            </td>
                        </tr>
                    )) : null
            }
            </tbody>
        </Table>
    )
}
export default TableProductLine