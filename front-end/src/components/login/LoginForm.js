import React, {Component, useState} from 'react'
import '../../assets/css/login-styles.css'
import { FaUser, FaLock } from 'react-icons/fa'
import axios from "axios";
import {apiLogin} from "../url";
import {useDispatch, useSelector} from "react-redux";


function LoginForm(props) {
    const [form, setForm] = useState({
        office_id: '',
        password: ''
    })

    const clickInput = event => {
        event.target.placeholder = "";
        event.target.parentNode.style.borderBottom = "2px solid dimgray"
        event.target.parentNode.firstElementChild.firstElementChild.style.color = "dimgray"
    }

    const blurInput = event => {
        if (event.target.value === "") {
            if (event.target.type === "password") {
                event.target.placeholder = "Type your password"
            } else {
                event.target.placeholder = "Type your username"
            }
            event.target.parentNode.style.borderBottom = "2px solid darkgray"
            event.target.parentNode.firstElementChild.firstElementChild.style.color = "darkgray"
        }
    }

    const changeInput = event => {
        if (event.target.id === "username") {
            setForm({
                ...form,
                office_id: event.target.value
            })
        } else {
            setForm({
                ...form,
                password: event.target.value
            })
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        axios.post(apiLogin , form)
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    window.open('/', '_self')
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('role', response.data.role)
                    localStorage.setItem('office_id', form.office_id)
                    switch (response.data.role) {
                        case 1:
                            window.open('/admin/offices', '_self')
                            break
                        case 2:
                            window.open('/agent/productlines', '_self')
                            break
                        case 3:
                            window.open('/warranty/productlines', '_self')
                            break
                        case 4:
                            window.open('/exporter/productlines', '_self')
                            break
                    }
                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    return (
        <div className="body-login">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="title-login">Login</div>
                    <div className="item">
                        <div>
                            <label>Username</label>
                        </div>
                        <div className="item-input">
                            <i><FaUser className="icon" size="1.2em" /></i>
                            <input id="username" type="text" placeholder="Type your username"
                                   value={form.office_id}
                                   onClick={clickInput}
                                   onChange={changeInput}
                                   onBlur={blurInput}
                                   required />
                        </div>
                    </div>
                    <div className="item">
                        <div>
                            <label>Password</label>
                        </div>
                        <div className="item-input">
                            <i><FaLock className="icon" size="1.2em" /></i>
                            <input id="password" type="password" placeholder="Type your password"
                                   value={form.password}
                                   onClick={clickInput}
                                   onChange={changeInput}
                                   onBlur={blurInput}
                                   required />
                        </div>
                    </div>
                    <div className="item button">
                        <button type="submit" className="btn-hover color-9">SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default LoginForm