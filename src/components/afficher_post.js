import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {fetchUnPost} from "../actions/index";
import {Link} from "react-router";

class PostsShow extends Component{

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount(){
        this.props.fetchUnPost(this.props.params.id);
    }

    /*
    onDeleteClick(){
        this.props.deletePost(this.props.params.id)
            .then(() =>{
            console.log("test");
            //blog post créer
            //naviger le user vers "/"
            //en appelant this.context.router.push avec le chemin
            this.context.router.push("/");
        });
    }
    */

    render(){
        if(!this.props.post){
            return (<div>Loading...</div>)
        }
        console.log(this.props)
        return (
            <div>

                <Link to="/">Back to Index</Link>
                <h3>{this.props.post.titre}</h3>
                <h6>Categories: {this.props.post.categories}</h6>
                <p>{this.props.post.contenu}</p>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {post: state.posts.post};
}

export default connect(mapStateToProps,{fetchUnPost})(PostsShow);
