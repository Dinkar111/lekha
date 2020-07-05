import * as React from 'react';
import Axios from 'axios';
import { API_URL } from '../utils/Constants';
import { AlertSuccess, AlertError } from '../utils/Alert';
import { Redirect } from 'react-router-dom'

export default class Login extends React.Component {
    state = {
        fullname: "",
        email: "",
        address: "",
        password: "",
    }

    onChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    register = async () => {
        try {
            const response = await Axios.request({
                url: `${API_URL}/api/user/signup`,
                method: "post",
                data: this.state
            });

            AlertSuccess('You have Successfully registerd');
            setTimeout(() => {
                window.location.href = "/signin"
            }, 1000);
        } catch (e) {
            AlertError('Something is worng.')
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
                            पुरा नाम
                        </label>
                        <input style={{ fontFamily: "devnagari" }} type="text" onChange={this.onChangeInput} value={this.state.fullname} name="fullname" placeholder="l8Gs/ dxh{g" />

                        <label>
                            ठेगाना
                        </label>
                        <input style={{ fontFamily: "devnagari" }} type="text" onChange={this.onChangeInput} value={this.state.address} name="address" placeholder="sf7dfGbf}" />
                        <label>
                            ईमेल
                        </label>
                        <input type="text" onChange={this.onChangeInput} value={this.state.email} name="email" placeholder="email" />
                        <label>
                            पासवर्द
                        </label>
                        <input type="password" onChange={this.onChangeInput} value={this.state.password} name="password" placeholder="*******" />
                        <button className="btn sign-in" onClick={this.register}>खाता खोल्नुहोस्</button>
                    </div>

                </div>

            </div>
        )
    }
}