import * as React from 'react';
import Axios from 'axios';
import { API_URL } from '../utils/Constants';
import { AlertSuccess, AlertError } from '../utils/Alert';
import { Link } from 'react-router-dom'

export default class Login extends React.Component {
    state = {
        email: "",
        password: "",
    }
    componentDidMount() {
        const token = window.localStorage.getItem("token");
        if (token) {
            window.location.href = "/"
        }
    }
    onChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    login = async () => {
        try {
            const response = await Axios.request({
                url: `${API_URL}/api/user/login`,
                method: "post",
                data: this.state
            });
            const token = response.data.token;
            const userInfo = response.data.userInfo;
            window.localStorage.setItem("token", JSON.stringify(token));
            window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
            AlertSuccess('You have Successfully loggedin');
            setTimeout(() => {
                window.location.href = "/"
            }, 1000);
        } catch (e) {
            AlertError(e.response.data)
        }
    }

    render() {
        return (
            <div className="login">
                <div className="section">
                    <img src="/login-back.jpg" />
                </div>
                <div className="section">
                    <div className="section-input">
                        <div className="logo"> <img width="50" src="/logo.png" /></div>
                        <label>
                            ईमेल
                        </label>
                        <input type="text" onChange={this.onChangeInput} value={this.state.email} name="email" placeholder="email" />
                        <label>
                            पासवर्द
                        </label>
                        <input type="password" onChange={this.onChangeInput} value={this.state.password} name="password" placeholder="*******" />
                        <button className="btn sign-in" onClick={this.login}>साइन इन​ </button>
                        <hr />
                        <div style={{ textDecoration: "underline", textAlign: "center" }}><Link to="/signup">खाता खोल्नुहोस्</Link></div>
                    </div>

                </div>

            </div>
        )
    }
}