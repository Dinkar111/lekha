 import * as React from 'react';
import { AlertError, AlertSuccess } from '../utils/Alert';
import Axios from 'axios';
import { API_URL } from '../utils/Constants';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
export default class Dinkar extends React.Component {
    state = {
        articles: []
    }

    async componentDidMount() {
        try {
            const response = await Axios.request({
                url: `${API_URL}/api/article/search/${this.props.match.params.query}`,
                method: "get"
            });

            this.setState({
                articles: response.data
            })

        } catch (e) {
            AlertError('Something is worng.')
        }
    }
    render() {
        return (
            <>
                <Header {...this.props} />
                <div style={{ padding: "3rem 9rem" }}>
                    <h2> रचनाहरु</h2>
                    <hr />
                </div>
                <div className="home">
                    <section className="left">
                        {this.state.articles.map((article) => {

                            return <div className="block">
                                <div className="info">
                                    <p className="title" style={{ fontFamily: "devnagari" }}><Link to={`/story/${article._id}`}>{article.title}</Link></p>
                                    {/* <p className="description">{article.description.slice(0.50)}</p> */}
                                    <span className="writername" style={{ fontFamily: "devnagari", fontSize: "19px" }}>{article.user_id.fullname}</span>
                                    <span>{article.created_date}</span>

                                </div>
                                <div className="picture">
                                    <img src={article.picture ? article.picture : "https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg"} />
                                </div>
                            </div>
                        })}


                    </section>

                </div>
                <Footer />
            </>
        )
    }
}
