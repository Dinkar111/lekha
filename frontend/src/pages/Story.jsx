import * as React from 'react';
import Header from '../components/Header';
import Axios from 'axios';
import { API_URL } from '../utils/Constants';
import { AlertError } from '../utils/Alert';
import Footer from '../components/Footer';
import Comment from '../components/Comment';
import { Link } from 'react-router-dom';
export default class Story extends React.Component {
    state = {
        loading: true,
        blog: {},
        comment: "",
        comments: [],
        likes: 0
    }
    onchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getLike = async () => {
        try {

            const id = this.props.match.params.id;
            const response = await Axios.request({
                url: `${API_URL}/api/like/article/${id}`,
                method: "get"
            });
            if (response.data.count) {

                this.setState({
                    likes: response.data.count,
                })
            }
        } catch (e) {
            AlertError('Oopps')
        }
    }
    getComment = async () => {
        try {

            const id = this.props.match.params.id;
            const response = await Axios.request({
                url: `${API_URL}/api/comment/article/${id}`,
                method: "get"
            });
            debugger;
            this.setState({
                comments: response.data,
            })
        } catch (e) {
            AlertError('Oopps')
        }
    }
    async componentDidMount() {
        try {

            const id = this.props.match.params.id;
            const response = await Axios.request({
                url: `${API_URL}/api/article/${id}`,
                method: "get"
            });
            this.getComment();
            this.getLike();
            this.setState({
                blog: response.data,
                loading: false
            })
        } catch (e) {
            AlertError('Oopps')
        }
    }

    onPostComment = async () => {
        const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        const article_id = this.props.match.params.id;
        const user_id = userInfo._id;
        const description = this.state.comment;

        try {
            const response = await Axios.request({
                url: `${API_URL}/api/comment`,
                method: "post",
                data: {
                    article_id,
                    user_id,
                    description
                }
            });
            this.setState({
                comment: ""
            })
            this.getComment();


        } catch (e) {
            AlertError('Oopps')
        }
    }

    likArticle = async () => {
        const article_id = this.props.match.params.id;
        const isLogin = window.localStorage.getItem("userInfo");
        if (isLogin) {

            try {
                const response = await Axios.request({
                    url: `${API_URL}/api/like/article/${article_id}`,
                    method: "put",
                    data: {
                        article_id,
                        count: this.state.likes + 1
                    }
                });
                this.setState({
                    likes: this.state.likes + 1
                })


            } catch (e) {
                AlertError('Oopps')
            }
        } else {
            AlertError('please login to like')
        }
    }

    render() {
        const { blog } = this.state
        const isLogin = window.localStorage.getItem("userInfo");
        const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        return (
            <>
                <Header {...this.props} />

                {
                    this.state.loading ?
                        'loading .... '
                        :
                        <div className="blog" style={{ fontFamily: "devnagari" }}>
                            <div className="like" onClick={this.likArticle}>
                                <svg width="30" height="28" viewBox="0 0 50 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M45.959 4.73424C43.3422 2.17398 39.8314 0.733137 36.1705 0.717003C33.9632 0.717003 31.8875 1.22056 29.8929 2.23186C27.9517 3.20141 26.2733 4.62508 25 6.38197C23.7263 4.62436 22.0468 3.20058 20.1043 2.23186C18.1639 1.23246 16.0122 0.712982 13.8295 0.717003C10.1689 0.732764 6.65845 2.17369 4.04241 4.73424C1.56661 7.18066 0 10.7433 0 14.4934C0 17.0727 0.548312 19.5779 1.22531 21.462C1.55961 22.395 2.06457 23.409 2.74017 24.4399C3.42136 25.4834 4.04101 26.3548 4.57254 27.0472C5.10547 27.7368 5.86499 28.604 6.88748 29.5986C7.69839 30.3927 8.52285 31.1728 9.36049 31.9387C9.97315 32.4982 10.9047 33.3234 12.1258 34.3865C13.5358 35.6104 14.5415 36.521 15.1849 37.1001C16.1099 37.947 17.0229 38.8068 17.9237 39.6794C20.3463 41.9929 22.1214 44.1233 23.8027 46.5669C24.116 47.0243 24.5202 47.2327 25 47.2327C25.5036 47.2327 25.9428 47.0271 26.2505 46.5669C27.3904 44.8479 28.6525 43.2132 30.0271 41.6754C31.4944 40.0319 32.7183 38.7548 33.6975 37.8428C34.685 36.9197 36.1103 35.6328 37.9525 33.9865C39.0911 32.9696 39.9989 32.2058 40.6115 31.6491C41.2242 31.0896 42.0215 30.3189 43.0062 29.3328C43.9881 28.3495 44.7672 27.5032 45.3184 26.8066C45.8835 26.0933 46.4821 25.2316 47.1549 24.2021C48.5299 22.0928 49.13 20.4255 49.6265 18.084C49.8755 16.9146 50 15.7159 50 14.4934C50 10.7433 48.4292 7.18066 45.9576 4.73424H45.959ZM46.8094 17.207C46.2961 20.1569 44.7533 23.0524 42.1795 25.903C41.0577 27.1465 38.996 29.1272 35.9844 31.8058C34.7072 32.9394 33.4394 34.0836 32.1812 35.2383C31.2231 36.1168 30.0453 37.3057 28.6424 38.8024C27.3361 40.186 26.1195 41.6516 25 43.1903C23.8233 41.6842 22.5624 40.2459 21.2234 38.8821C19.7812 37.3994 18.6692 36.2748 17.8467 35.5307C17.0215 34.7851 15.7668 33.6759 14.0421 32.1527L12.207 30.5301L10.534 29.0139C9.80669 28.3565 9.24719 27.8249 8.88351 27.4193C8.52963 27.0276 8.05825 26.5157 7.47496 25.8751C6.89028 25.2372 6.43848 24.6777 6.14475 24.2259C5.53489 23.2957 4.4998 21.904 4.12214 20.743L3.51228 18.8547C3.06608 17.4769 2.9248 16.0614 2.9248 14.4934C2.9248 11.5154 3.98926 8.96128 6.11677 6.86175C8.27226 4.73424 10.8278 3.66978 13.8295 3.66978C15.9333 3.66978 17.8719 4.22649 19.6567 5.37067C21.4374 6.51485 22.8123 8.02132 23.6992 9.91663C23.9551 10.4691 24.3915 10.7419 25 10.7419C25.6127 10.7419 26.0868 10.4873 26.3568 9.91663C27.2562 8.0395 28.5389 6.51485 30.3195 5.37067C32.0624 4.24568 34.0961 3.65449 36.1705 3.66978C39.1764 3.66978 41.7305 4.73284 43.8581 6.83377C45.987 8.93471 47.05 11.4874 47.05 14.4934C47.0466 15.4031 46.9661 16.3108 46.8094 17.207V17.207Z"
                                        fill="#48A97C" />
                                </svg>
                                <div className="likecount" style={{ fontFamily: "fantasy" }} > {this.state.likes}</div>
                            </div>
                            <section className="blog--title">
                                <h1 style={{ fontFamily: "devnagari" }}>{blog.title}</h1>
                                <Link to={`/profile/${blog.user_id._id}`}>
                                    <div className="blog--title--profile" >
                                        <img src={blog.user_id.picture ? blog.user_id.picture : "https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg"} />
                                        <div className="info">
                                            <span >{blog.user_id.fullname}</span>
                                            <span style={{ fontFamily: "fantasy" }}> {new Date(blog.created_date).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </Link>
                            </section>

                            <section className="blog--image">
                                <img src={blog.picture} />
                            </section>

                            <section className="blog--description" dangerouslySetInnerHTML={{ __html: blog.description }} style={{ "overflow-wrap": " break-word" }}>
                            </section>
                            {
                                isLogin ?

                                    <div class="write-comment" style={{ marginTop: "50px" }}>

                                        <div class="new">
                                            <div class="image">
                                                <img width="32" height="29" src={userInfo.picture ? userInfo.picture : "https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg"} />
                                            </div>
                                            <div class="info">
                                                <span class="message">कमेन्त गर्नुहोस</span>
                                                <span class="username">{userInfo.fullname}</span>
                                            </div>

                                        </div>
                                        <div class="write">
                                            <textarea value={this.state.comment} name="comment" onChange={this.onchange}></textarea>
                                            <button onClick={this.onPostComment}>पोस्त गर्नुहोस </button>
                                        </div>
                                    </div>


                                    : ""
                            }
                            {
                                this.state.comments.map((comment) => {
                                    return <Comment comment={comment} />
                                })
                            }

                        </div>
                }
                <Footer />
            </>
        )
    }
}