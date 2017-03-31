import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Form from "./form";
import {fetchUnPost,detruirePost, modifierPost} from "../actions/index";
import {Link} from "react-router";

//pour afficher un article/post
class AfficherPost extends Component{

    //avoir accès au route de React router
    static contextTypes = {
        router: PropTypes.object
    }

    //initier les variables et bind les function
    constructor(props){
        super(props);
        this.state = { edit: false }
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleModifier = this.handleModifier.bind(this);
    }

    //lorsque le componenet démarre, on récupère les informations du post
    componentWillMount(){
        this.props.fetchUnPost(this.props.params.permalien)
            .then( () => {
                this.initialiseLeState();
            }
        );
    }

    //initialiser le state avec les informations de l'article (pour pouvoir les modifier et mettre à jour)
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

    //por détruire le post
    handleDetruire(){
        //détruire
        this.props.detruirePost(this.props.params.permalien)
            .then(() =>{
            //blog post détruit
            //naviger le user vers "/"
            //en appelant this.context.router.push avec le chemin
            this.context.router.push("/");
        });
    }

    //si on modifie l'article ou non
    handleModifier(){
        this.setState({ edit: !this.state.edit })
        this.initialiseLeState();
    }

    //valider les modifications
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

        //on modifie les données
        this.props.modifierPost(data)
            .then( () =>{
                //si le permalien à changer, on redirige l'utilisateur vers la nouvelle page
                if(data.permalien != this.props.post.permalien){
                    this.context.router.push("/article/" + data.permalien);
                }
                this.setState({ edit: false })
                this.props.fetchUnPost(this.state.permalien);
        })
    }

    //pour modifier les valeurs de l'article dans le state de la classe
    handleChange(e){
        this.setState( {[e.target.name]: e.target.value} )
    }

    //faire apparaitre l'article
    renderArticle(){
        return (
            <article className="post">
                <h1>{this.props.post.titre}</h1>
                <h2>{this.props.post.date} par {this.props.post.auteur}</h2>
                <h3>Categorie: {this.props.post.categories}</h3>
                <p>{this.props.post.contenu}</p>
                <button onClick={ this.handleModifier }>Modifier l'article</button>
            </article>
        )
    }

    //faire apparaitre le form si on modifie
    renderForm(){
        return(
            <Form
                className="post"    
                onHandleFormSubmit= { this.handleFormSubmit }
                onHandleChange = { this.handleChange }
                onHandleModifier = { this.handleModifier }
                data = {
                    {titre: this.state.titre, permalien: this.state.permalien, auteur: this.state.auteur,
                    categories: this.state.categories, appercu: this.state.appercu, contenu: this.state.contenu}
                }
            />
        )
    }

    //pour render la page
    render(){
        //si les données ne sont récupérées
        if(!this.props.post){
            return (<div></div>)
        }
        //si les données sont chargées
        return (
            <main>
                <Link to="/">Retour à la page d'accueil</Link>
                <button onClick={this.handleDetruire.bind(this)}>
                    Delete post
                </button>
                { this.state.edit ? this.renderForm() : this.renderArticle() }
            </main>
        )
    }
}

function mapStateToProps(state){
    return {post: state.posts.post};
}

export default connect(mapStateToProps,{fetchUnPost,detruirePost, modifierPost})(AfficherPost);
