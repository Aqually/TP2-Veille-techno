import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Form from "./form";
import {fetchUnPost,detruirePost, modifierPost} from "../actions/index";
import {Link} from "react-router";

class AfficherPost extends Component{

    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props){
        super(props);
        this.state = { edit: false }
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleModifier = this.handleModifier.bind(this);
    }

    componentWillMount(){
        this.props.fetchUnPost(this.props.params.permalien)
            .then( () => {
                this.initialiseLeState();
                console.log(this.props.post);
            }
        );
    }

    initialiseLeState(){
        this.setState({
            titre: this.props.post.titre,
            auteur: this.props.post.auteur,
            permalien: this.props.post.permalien,
            categories: this.props.post.categories,
            appercu :this.props.post.appercu,
            contenu: this.props.post.contenu
        })
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

    handleModifier(){
        this.setState({ edit: !this.state.edit })
        this.initialiseLeState();
    }

    handleFormSubmit(e){
        e.preventDefault()
        const data = {
            _id: this.props.post._id,
            titre : this.state.titre,
            auteur: this.state.auteur,
            permalien: this.state.permalien,
            categories: this.state.categories,
            appercu: this.state.appercu,
            contenu: this.state.contenu
        }
        console.log(data);
        this.props.modifierPost(data)
            .then( () =>{
                if(data.permalien != this.props.post.permalien){
                    this.context.router.push("/article/" + data.permalien);
                }
                this.setState({ edit: false })
                this.props.fetchUnPost(this.state.permalien);
            })
    }

    handleChange(e){
        this.setState( {[e.target.name]: e.target.value} )
    }

    renderArticle(){
        return (
            <article>
                <h1>{this.props.post.titre}</h1>
                <h2>{this.props.post.date} par {this.props.post.auteur}</h2>
                <h3>Categorie: {this.props.post.categories}</h3>
                <p>{this.props.post.contenu}</p>
                <button onClick={ this.handleModifier }>Modifier l'article</button>
            </article>
        )
    }

    renderForm(){
        return(
            <Form
                onHandleFormSubmit={this.handleFormSubmit}
                onHandleChange = { this.handleChange }
                onHandleModifier = { this.handleModifier }
                data = {
                    {titre: this.state.titre, permalien: this.state.permalien, auteur: this.state.auteur,
                    categories: this.state.categories, appercu: this.state.appercu, contenu: this.state.contenu}
                }
            />
        )
    }

    render(){
        if(!this.props.post){
            return (<div>Chargement...</div>)
        }

        return (
            <div>
                <Link to="/">Back to Index</Link>
                <button onClick={this.onDeleteClick.bind(this)}>
                    Delete post
                </button>
                { this.state.edit ? this.renderForm() : this.renderArticle() }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {post: state.posts.post};
}

export default connect(mapStateToProps,{fetchUnPost,detruirePost, modifierPost})(AfficherPost);
