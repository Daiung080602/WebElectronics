import {useEffect, useState} from "react";
import {Form, InputGroup, Modal, Table} from "react-bootstrap";
import axios from "axios";
import {apiProductLine} from "../url";
import {useDispatch, useSelector} from "react-redux";
import {listProductLineRemainingSelector} from "../../redux/selector";
import productline from "../../redux/reducer/productline";
import ProductLineForm from "../admin/productline/ProductLineForm";

function TableProductLine () {
    const productlines = useSelector(listProductLineRemainingSelector)
    const dispatch = useDispatch()


    useEffect(() => {
        axios.get(apiProductLine)
            .then(response => {
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
                <th width='5%'>STT</th>
                <th width='20%'>Tên dòng sản phẩm</th>
                <th width='40%'>Hình ảnh</th>
                <th width='10%'>Danh mục</th>
                <th width='15%'>Thời gian bảo hành</th>
                <th width='10%'>Hoạt động</th>
            </tr>
            </thead>
            <tbody>
            {
                productlines.length ?
                    productlines.map((productline, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{productline.productline_id}</td>
                            <td>
                                {
                                    productline.image.length > 1 &&
                                    <>
                                        <img className="img mx-1" src={productline.image[0]} />
                                        <img className="img mx-1" src={productline.image[1]} />
                                    </>

                                }
                            </td>
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