import * as React from 'react';


export default class Comment extends React.Component {
    render() {
        return (
            <>
                <div class="write-comment__two">
                    <div class="new">
                        <div class="image">
                            <img width="32" height="29" src={this.props.comment.user_id.picture ? this.props.comment.user_id.picture : "https://34yigttpdc638c2g11fbif92-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/default-user-img.jpg"} />
                        </div>
                        <div class="info">
                            <span class="username">{this.props.comment.user_id.fullname}</span>
                        </div>

                    </div>
                    <div class="write">
                        <p>{this.props.comment.description}</p>

                    </div>
                </div>
            </>
        )
    }
}