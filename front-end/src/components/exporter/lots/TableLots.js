import {useEffect, useState} from "react";
import {Button, ButtonToolbar, Table} from "react-bootstrap";
import axios from "axios";
import {FaPaperPlane, FaRegEdit} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {listLotsRemainingSelector} from "../../../redux/selector";
import {apiLots} from "../../url";
import lots from "../../../redux/reducer/lots";
import Modal from "./Modal";
import ModalLots from "./Modal";
import LotSendForm from "./LotSendForm";


function TableLots() {
    const listlots = useSelector(listLotsRemainingSelector)
    const [status, setStatus] = useState('Gửi')

    const dispatch = useDispatch()

    useEffect(() => {
        axios.get(apiLots)
            .then(response => {
                console.log(response.data)
                dispatch(lots.actions.setListLots(response.data))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const clickSend = (e) => {
        let form = {
            'exporter_id': localStorage.getItem('office_id')
        }
        axios.put(apiLots + "/" + e.target.value, form)
            .then(response => {
                if (response.status === 201) {
                    console.log(response)
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
                    // document.getElementById(e.target.value).disabled = true
                    e.target.disabled = true
                    setStatus('Đã gửi')
                } else {
                    setStatus(data.status)
                }
            })
            .catch(error => {
                console.log(error)
                setStatus(error.message)
            })
    }

    return (
        <Table responsive striped>
        <thead className="bg-dark text-white">
        <tr>
            <th width='10%'>STT</th>
            <th width='15%'>Mã lô</th>
            <th width="15%">Thời gian sản xuất</th>
            <th width="30%">Dòng sản phẩm</th>
            <th width="10%">Số lượng</th>
            <th width='10%'>Sửa</th>
        </tr>
        </thead>
        <tbody>
        {
            listlots.length ? listlots.map((lot, i) => (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{lot.lot_id}</td>
                    <td>{lot.date_export}</td>
                    <td>{lot.productline_id}</td>
                    <td>{lot.amount}</td>
                    <td>
                        <ModalLots element={<LotSendForm lotId={lot.lot_id}/>} title={"Gửi đến đại lý"}/>
                    </td>
                </tr>)) : null
        }
        </tbody>
    </Table>)
}

export default TableLots