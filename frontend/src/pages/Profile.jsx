import * as React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Axios from 'axios';
import { API_URL } from '../utils/Constants';
import { AlertError, AlertSuccess } from '../utils/Alert';

export default class Profile extends React.Component {
    state = {
        isCurrentUser: false,
        userInfo: "",
        fullname: "",
        email: "",
        address: "",
        picture: ""

    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    save = async () => {
        try {
            const response = await Axios.request({
                url: `${API_URL}/api/user/${this.state.userInfo._id}`,
                method: "put",
                data: {
                    fullname: this.state.fullname,
                    email: this.state.email,
                    address: this.state.address,
                    picture: this.state.picture
                }

            });
            // debugger
            window.localStorage.setItem("userInfo", JSON.stringify(response.data));
            window.location.reload();
            AlertSuccess('Edit Successfully');
        } catch (e) {
            AlertError('Oops! something went worng')
        }
    }
    onFileChange = async (event) => {
        try {

            const files = Array.from(event.target.files);
            const formData = new FormData();
            formData.append('image', files[0]);
            const response = await Axios.request({
                url: `${API_URL}/api/picture`,
                method: "post",
                data: formData
            })
            //repose will give id and url of picture
            this.setState({
                picture: `${API_URL}/${response.data.url}`
            })
        } catch (e) {
            AlertError('Opps!')
        }
    }
    async componentDidMount() {
        const currentUser = JSON.parse(window.localStorage.getItem("userInfo"));
        let isCurrentUser = false;
        try {
            const id = this.props.match.params.id;
            const response = await Axios.request({
                url: `${API_URL}/api/user/${id}`,
                method: "get"
            });
            if (response.data._id === currentUser._id) {
                isCurrentUser = true
            }
            this.setState({
                userInfo: response.data,
                fullname: response.data.fullname,
                email: response.data.email,
                address: response.data.address,
                picture: response.data.picture,
                isCurrentUser
            })
        } catch (e) {
            AlertError('oops');
        }
    }
    render() {
        const { userInfo, isCurrentUser } = this.state
        return (
            <>
                <Header {...this.props} />
                <div className="home">
                    {userInfo ?



                        <div class="write-comment__two profile-edit">

                            <img
                                style={{
                                    height: "164px",
                                    float: "left",
                                    marginRight: "42px"
                                }}
                                src={this.state.picture ? this.state.picture : "https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg"} />
                            {
                                isCurrentUser ?
                                    <div>
                                        <input type="file" onChange={this.onFileChange} /><br />
                                        <input style={{ fontFamily: "devnagari" }} type="text" name="fullname" onChange={this.onChange} value={this.state.fullname} /><br />
                                        <input type="text" disabled name="email" onChange={this.onChange} value={this.state.email} /><br />
                                        <input style={{ fontFamily: "devnagari" }} type="text" name="address" onChange={this.onChange} value={this.state.address} /><br />

                                    </div>
                                    :
                                    <>
                                        <p style={{ fontFamily: "devnagari" }} >{this.state.fullname}</p>
                                        <p>{this.state.email}</p>
                                        <p style={{ fontFamily: "devnagari" }} >{this.state.address}</p>
                                    </>
                            }

                            {
                                isCurrentUser ?
                                    <div className="write-blog" style={{ margin: 0 }}>
                                        <button className="button-publish" onClick={this.save}>Save</button>
                                    </div>
                                    : ""
                            }


                        </div>
                        :
                        ""

                    }
                </div>
                <Footer />
            </>
        )
    }
}