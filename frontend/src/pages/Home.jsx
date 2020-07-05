import * as React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'

import Axios from 'axios';
import { API_URL } from '../utils/Constants';
import { AlertError } from '../utils/Alert';
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
    state = {
        articles: []
    }
    async componentDidMount() {
        try {
            const response = await Axios.request({
                url: `${API_URL}/api/article`,
                method: "get"
            });
            debugger
            this.setState({
                articles: response.data
            })
        } catch (e) {
            AlertError('oops')
        }
    }
    render() {
        return (
            <>
                <Header {...this.props} />
                <div className="home" style={{ minHeight: "400px" }}>
                    <section className="left">
                        {this.state.articles.map((article) => {

                            return <div className="block">
                                <div className="info">
                                    <p className="title" ><Link style={{ fontFamily: "devnagari", color: "#000" }} to={`/story/${article._id}`}>{article.title}</Link></p>
                                    {/* <p className="description">{article.description.slice(0.50)}</p> */}
                                    <span className="writername" style={{ fontFamily: "devnagari", fontSize: "19px" }}>{article.user_id.fullname}</span>
                                    <span style={{ fontSize: "13px" }}>{new Date(article.created_date).toLocaleString()}</span>

                                </div>
                                <div className="picture">
                                    <img src={article.picture ? article.picture : "https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg"} />
                                </div>
                            </div>
                        })}


                    </section>
                    <section className="right">
                        <div className="recommendation-block">
                            <span className="recommend-text">तपै लाइ मन्पर्नसक्ने</span>
                            <span><img src="/recommend.svg" /></span>
                        </div>
                    </section>
                </div>
                <Footer />
            </>
        )
    }
}