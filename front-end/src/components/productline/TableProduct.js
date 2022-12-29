import {useEffect} from "react";
import {Table} from "react-bootstrap";
import axios from "axios";
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import {apiProduct} from "../url";
import {useDispatch, useSelector} from "react-redux";
import {listProductRemainingSelector} from "../../redux/selector";
import product from "../../redux/reducer/product";
import ModalInfoProduct from "./ModalInfoProduct";
import ModalDelete from "./ModalDelete";

function TableProduct () {
    const products = useSelector(listProductRemainingSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(apiProduct)
            .then(response => {
                dispatch(product.actions.setListProduct(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const clickCheckboxRow = (e) => {
        dispatch(product.actions.selectedChange(e.target.value))
    }

    const clickCheckboxAll = (e) => {
        dispatch(product.actions.selectedAll(e.target.checked))
    }

    return (
        <Table responsive striped>
            <thead className="bg-dark text-white">
            <tr>
                <th width='5%'><input type={'checkbox'} onChange={clickCheckboxAll}/></th>
                <th width='5%'>Sửa</th>
                <th width='5%'>Xóa</th>
                <th width='5%'>STT</th>
                <th width='30%'>Tên sản phẩm</th>
                <th width='20%'>Hình ảnh</th>
                <th width='10%'>Danh mục</th>
                <th width='20%'>Thời gian bảo hành</th>
            </tr>
            </thead>
            <tbody>
            {
                products.length ?
                    products.map((product, i) => (
                        <tr key={i}>
                            <td>
                                <input type={'checkbox'}
                                       value={product.name}
                                       checked={product.selected}
                                       onChange={clickCheckboxRow}
                                    />
                            </td>
                            <td>
                                <ModalInfoProduct
                                    element={<FaRegEdit/>}
                                    title={"Sửa thông tin dòng sản phẩm"}
                                    variant={"link"}
                                    info={product}
                                    type={"edit"}
                                />
                            </td>
                            <td>
                                <ModalDelete id={product.name} />
                            </td>
                            <td>{i + 1}</td>
                            <td>{product.name}</td>
                            <td><img className="img" src={product.image[0]} /></td>
                            <td>{product.catalog}</td>
                            <td>{product.warrantyPeriod}</td>
                        </tr>
                    )) : null
            }
            </tbody>
        </Table>
    )
}
export default TableProduct