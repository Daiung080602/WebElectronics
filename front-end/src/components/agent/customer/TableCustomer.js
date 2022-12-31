import {useEffect} from "react";
import {Table} from "react-bootstrap";
import axios from "axios";
import {apiCustomer, apiProductLine} from "../../url";
import {useDispatch, useSelector} from "react-redux";
import {listCustomerRemainingSelector} from "../../../redux/selector";
import customer from "../../../redux/reducer/customer";
import ModalInfoCustomer from "./ModalInfoCustomer";
import {FaRegEdit} from "react-icons/fa";

function TableCustomer () {
    const customers = useSelector(listCustomerRemainingSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(apiCustomer)
            .then(response => {
                dispatch(customer.actions.setListCustomer(response.data))
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
                <th width='15%'>Mã khách hàng</th>
                <th width='25%'>Tên khách hàng</th>
                <th width='15%'>Số điện thoại</th>
                <th width='30%'>Địa chỉ</th>
            </tr>
            </thead>
            <tbody>
            {
                customers.length ?
                    customers.map((customer, i) => (
                        <tr key={i}>
                            <td>
                                <ModalInfoCustomer
                                    element={<FaRegEdit/>}
                                    title={"Sửa thông tin dòng sản phẩm"}
                                    variant={"link"}
                                    info={customer}
                                    type={"edit"}
                                />
                            </td>
                            <td>{i + 1}</td>
                            <td>{customer.customer_id}</td>
                            <td>{customer.fullname}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                        </tr>
                    )) : null
            }
            </tbody>
        </Table>
    )
}
export default TableCustomer