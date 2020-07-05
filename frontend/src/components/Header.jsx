import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    state = {
        isLoggedIn: window.localStorage.getItem("token"),
        userInfo: window.localStorage.getItem("userInfo") ? JSON.parse(window.localStorage.getItem("userInfo")) : null,
        searchQuery: ""
    }
    logout = () => {
        window.localStorage.clear();
        this.setState({
            isLoggedIn: false
        })
        window.location.reload();
    }
    onChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        })
    }
    search = () => {
        console.log(this.props);
        this.props.history.push(`/search/${this.state.searchQuery}`)
    }

    render() {
        return (
            <header>
                <Link to="/"><div className="logo">  <img src="/logo.png" /></div></Link>
                <nav className="nav">
                    <div className="search" style={{ position: "relative" }}>
                        <input onChange={this.onChange} placeholder="रचना खोज्नुहोस" style={{ padding: "6px 34px 6px 6px" }} value={this.state.searchQuery} />
                        <svg onClick={this.search} xmlns="http://www.w3.org/2000/svg" width="22" height="21" fill="none" style={{ position: "absolute", right: "7px", cursor: "pointer" }}>
                            <path
                                d="M14.808 8.126c-.025 2.616-1.655 5.074-4.146 5.968a6.462 6.462 0 0 1-7.16-1.945c-1.705-2.045-1.87-5.066-.505-7.326 1.366-2.26 4.105-3.476 6.696-2.938a6.439 6.439 0 0 1 5.115 6.241c.008 1.068 1.664 1.068 1.656 0A8.123 8.123 0 0 0 11.158.577C8.046-.573 4.354.437 2.268 3.02.15 5.635-.181 9.367 1.574 12.264c1.747 2.89 5.157 4.354 8.46 3.717 3.716-.712 6.406-4.114 6.43-7.863.009-1.052-1.647-1.06-1.655.008z"
                                fill="#000" />
                            <path
                                d="M13.327 13.382l5.67 5.67.81.81c.754.754 1.93-.413 1.168-1.166l-5.67-5.67-.811-.811c-.753-.753-1.92.414-1.167 1.167z"
                                fill="#000" /></svg>
                    </div>
                    {
                        this.state.isLoggedIn ?
                            <div className="dropdown">
                                <div className="dropdown__title">

                                    <img width="32" height="29" className="profile-picture"
                                        src={this.state.userInfo.picture ? this.state.userInfo.picture : "https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg"} />

                                </div>
                                <div className="dropdown__menu">
                                    <ul>
                                        <li>
                                            <div style={{ flex: 1 }}>
                                                <img width="52" height="49" className="profile-picture"
                                                    src={this.state.userInfo.picture ? this.state.userInfo.picture : "https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg"} />
                                            </div>
                                            <div style={{ flex: 2 }}>
                                                <p style={{ fontFamily: "devnagari", fontSize: "15px" }} >{this.state.userInfo.fullname}</p>
                                                <p>{this.state.userInfo.email}</p>

                                            </div>
                                        </li>
                                        <li><Link to="/my-story" >रचनाहरु</Link></li>
                                        <li><Link to="/new-story" >नया रचना लेख्नुहोस्</Link></li>
                                        {/* <li>तथ्याङ्क</li> */}
                                        <li><Link to={`/profile/${this.state.userInfo._id}`} > सेटिङ</Link></li>
                                        <li onClick={this.logout}>साइन आउत्</li>
                                    </ul>
                                </div>
                            </div>
                            :
                            <div className="get-started">
                                <button onClick={() => { window.location.href = "/signin" }}>सुरु गर्नुस्</button>
                            </div>
                    }



                </nav>

            </header >
        )
    }
}