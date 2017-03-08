import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchTousLesPosts} from "../actions/index";
import { Link } from "react-router";

class BlogIndex extends Component {

    //appeler avant que le component est render pour la première fois
    componentWillMount(){
        this.props.fetchTousLesPosts();
    }

    renderPosts(){
        console.log(this.props.posts);
        return this.props.posts.map((post) => {
            return (
                <li key={post.id}>
                    <Link to={'/' + post.id}>
                        <span>{post.categories}</span>
                        <strong>{post.titre}</strong>
                    </Link>
                </li>
            )
        })
    }

    render(){
        return (
            <div>
                <div>
                    <Link to="/posts/nouveau">
                        Nouveau message
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul>
                    {this.renderPosts()}
                </ul>
            </div>
        );
    };
};

function mapStateToProps(state){
    return {posts:state.posts.all}
}

export default connect(mapStateToProps,{fetchTousLesPosts})(BlogIndex);
