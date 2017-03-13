import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {fetchUnPost,detruirePost} from "../actions/index";
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
            }
        );
    }

    initialiseLeState(){
        this.setState({
            titre: this.props.post.titre,
            auteur: this.props.post.auteur,
            permalien: this.props.post.permalien,
            categories: this.props.post.auteur,
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

    handleModifier(e){
        e.preventDefault();
        this.setState({ edit: !this.state.edit })
        this.initialiseLeState();
    }

    handleFormSubmit(e){
        e.preventDefault()
        const data = {
            titre : this.state.titre,
            auteur: this.state.auteur,
            permalien: this.state.permalien,
            categories: this.state.categories,
            appercu: this.state.appecu,
            contenu: this.state.contenu
        }
    }

    handleChange(e){
        this.setState( {[e.target.name]: e.target.value} )
    }

    render(){
        if(!this.props.post){
            return (<div>Loading...</div>)
        }

        if(!this.state.edit){
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
                    <button onClick={this.handleModifier}>Modifier l'article</button>
                </div>
            )
        }

        return(
            <div>
                <Link to="/">Back to Index</Link>
                <button onClick={this.onDeleteClick.bind(this)}>
                    Delete post
                </button>

                <form onSubmit={ this.handleFormSubmit }>
                    <label>Titre</label>
                    <input name="titre" onChange={ this.handleChange } type="text" value={this.state.titre} />

                    <label>Permalien</label>
                    <input name="permalien" onChange={ this.handleChange } type="text" value={this.state.permalien} />

                    <label>Auteur</label>
                    <input name="auteur" onChange={ this.handleChange } type="text" value={this.state.auteur} />

                    <label>Categorie</label>
                    <input name="categories" onChange={ this.handleChange } type="text" value={this.state.categories} />

                    <label>Apperçu</label>
                    <input name="appercu" onChange={ this.handleChange } type="text" value={this.state.appercu} />

                    <label>Contenu</label>
                    <input name="contenu" onChange={ this.handleChange } type="textarea" value={this.state.contenu} />
                    <button type="submit">Enregistrer</button>
                </form>
                <button onClick={this.handleModifier}>Cancel</button>
            </div>


        )
    }
}

function mapStateToProps(state){
    return {post: state.posts.post};
}

export default connect(mapStateToProps,{fetchUnPost,detruirePost})(AfficherPost);
