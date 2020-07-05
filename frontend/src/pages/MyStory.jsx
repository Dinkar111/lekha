import * as React from 'react';
import Axios from 'axios';
import { AlertError } from '../utils/Alert';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/Constants';
import Footer from '../components/Footer';

export default class MyBlogs extends React.Component {

    state = {
        articles: []
    }

    async componentDidMount() {
        const user = JSON.parse(window.localStorage.getItem('userInfo'));
        try {
            const response = await Axios.request({
                url: `${API_URL}/api/article/user/${user._id}`,
                method: "get"
            })

            this.setState({
                articles: response.data
            });

        } catch (e) {
            AlertError('Opps!')
        }

    }

    render() {
        return (
            <>
                <Header {...this.props} />

                <div className="my-stories">
                    <div className="head">

                        <h2>तपाईको रचनाहरु</h2>
                        <Link to="/new-story" className="button-new-story">नया रचना लेख्नुहोस्</Link>
                    </div>
                    {this.state.articles.map((article) => {
                        return <><div className="block">
                            <Link to={`/story/${article._id}`} className="title" style={{ fontFamily: "devnagari" }}>{article.title}</Link>
                            <p style={{ fontSize: "12px" }}>{new Date(article.created_date).toISOString().slice(0, 10)}</p>
                        </div>

                        </>
                    }
                    )}
                </div>
                <Footer />
            </>
        )
    }
}