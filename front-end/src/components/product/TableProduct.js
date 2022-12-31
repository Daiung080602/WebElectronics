import {useEffect} from "react";
import {Table} from "react-bootstrap";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {listProductRemainingSelector} from "../../redux/selector";
import {apiProduct} from "../url";
import product from "../../redux/reducer/product";
import ModalChange from "./ModalChange";

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


    return (
        <Table responsive striped>
            <thead className="bg-dark text-white">
            <tr>
                <th width='5%'>Sửa</th>
                <th width='5%'>STT</th>
                <th width='5%%'>Mã sản phẩm</th>
                <th width='10%'>Số lô</th>
                <th width='15%'>Trạng thái</th>
                <th width='13%'>Đại lý</th>
                <th width='13%'>Cơ sở sản xuất</th>
                <th width='14%'>Cơ sở bảo hành</th>
                <th width='5%'>Số lần bảo hành</th>
                <th width='20%'>Khách hàng</th>
            </tr>
            </thead>
            <tbody>
            {
                products.length ?
                    products.map((product, i) => (
                        <tr key={i}>
                            <td>
                                <ModalChange
                                    info={product}
                                    />
                            </td>
                            <td>{i+1}</td>
                            <td>{product.product_id}</td>
                            <td>{product.lot_id}</td>
                            <td>{product.state}</td>
                            <td>
                                {
                                    product.agent &&
                                    product.agent.name
                                }
                            </td>
                            <td>{product.lot.office.name}</td>
                            <td>
                                {
                                    product.warranty &&
                                    product.warranty.name
                                }
                            </td>
                            <td>{product.warranty_times}</td>
                            <td>
                                {
                                    product.transaction &&
                                    product.transaction.customer.fullname
                                }
                            </td>
                        </tr>
                    )) : null
            }
            </tbody>
        </Table>
    )
}
export default TableProduct