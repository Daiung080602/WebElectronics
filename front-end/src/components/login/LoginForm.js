import React, { Component } from 'react'
import '../../assets/css/login-styles.css'
import { FaUser, FaLock } from 'react-icons/fa'
import axios from "axios";
import {apiLogin} from "../url";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    clickInput = event => {
        event.target.placeholder = "";
        event.target.parentNode.style.borderBottom = "2px solid dimgray"
        event.target.parentNode.firstElementChild.firstElementChild.style.color = "dimgray"
    }

    blurInput = event => {
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

    changeInput = event => {
        if (event.target.id === "username") {
            this.setState({
                username: event.target.value
            })
        } else {
            this.setState({
                password: event.target.value
            })
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.state)
        axios.post(apiLogin , this.state)
            .then(response => {
                console.log(response)
                if (response.data.login) {
                    window.open('/', '_self')
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('role', response.data.role)
                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    render() {
        const {username, password} = this.state
        return (
            <div className="body-login">
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="title-login">Login</div>
                        <div className="item">
                            <div>
                                <label>Username</label>
                            </div>
                            <div className="item-input">
                                <i><FaUser className="icon" size="1.2em" /></i>
                                <input id="username" type="text" placeholder="Type your username"
                                       value={username}
                                       onClick={this.clickInput}
                                       onChange={this.changeInput}
                                       onBlur={this.blurInput}
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
                                       value={password}
                                       onClick={this.clickInput}
                                       onChange={this.changeInput}
                                       onBlur={this.blurInput}
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
}

export default LoginForm