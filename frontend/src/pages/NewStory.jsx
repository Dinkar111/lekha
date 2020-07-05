import * as React from 'react';
import Header from '../components/Header';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios';
import { AlertError, AlertSuccess } from '../utils/Alert';
import { API_URL } from '../utils/Constants';
import Footer from '../components/Footer';
let user = JSON.parse(window.localStorage.getItem('userInfo'));

export default class NewStory extends React.Component {
    state = { description: "", title: "", picture: "", user_id: user._id }

    handleChange = (value) => {
        this.setState({ description: value })
    }
    onInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onPublish = async () => {
        try {
            const response = await Axios.request({
                url: `${API_URL}/api/article`,
                method: "post",
                data: this.state
            });
            debugger
            AlertSuccess('Published Successfully');

            window.location.href = `/story/${response.data._id}`;

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
    render() {
        return (
            <>
                <Header {...this.props} />

                <div className="write-blog">
                    <input placeholder="सिर्शक्" onChange={this.onInputChange} id="title" name="title" value={this.state.title} />
                    {
                        this.state.picture ?
                            <div style={{ maxHeight: "300px", overflow: "hidden", position: "relative", marginBottom: "10px" }}>
                                <img src={this.state.picture} width="100%" />
                            </div>
                            :

                            <div class="picture-upload">
                                <label >
                                    तस्बिर राख्नुहोस
                            <input onChange={this.onFileChange} type="file" />
                                </label>
                            </div>
                    }
                    <div id="editor">

                        <ReactQuill value={this.state.description}
                            onChange={this.handleChange} />
                    </div>
                    <button className="button-publish" onClick={this.onPublish}>प्रकाशित गर्नुस्</button>
                </div>
                <Footer />
            </>
        )
    }
}