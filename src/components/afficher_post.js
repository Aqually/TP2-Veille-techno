import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {fetchUnPost,detruirePost} from "../actions/index";
import {Link} from "react-router";

class AfficherPost extends Component{

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount(){
        this.props.fetchUnPost(this.props.params.permalien);
    }

    onDeleteClick(){
        this.props.detruirePost(this.props.params.permalien)
            .then(() =>{
            //blog post détruit
            //naviger le user vers "/"
            //en appelant this.context.router.push avec le chemin
            this.context.router.push("/");
        });
    }

    render(){
        if(!this.props.post){
            return (<div>Loading...</div>)
        }
        return (
            <div>
                <Link to="/">Back to Index</Link>
                <button onClick={this.onDeleteClick.bind(this)}>
                    Delete post
                </button>
                <h1>{this.props.post.titre}</h1>
                <h2>{this.props.post.date} par {this.props.post.auteur}</h2>
                <h3>Categorie: {this.props.post.categories}</h3>
                <p>{this.props.post.contenu}</p>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {post: state.posts.post};
}

export default connect(mapStateToProps,{fetchUnPost,detruirePost})(AfficherPost);
