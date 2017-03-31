import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchTousLesPosts, rechercherDesPosts} from "../actions/index";
import { Link } from "react-router";

const rechercheDefault = {$exists : true}

class BlogIndex extends Component {

    constructor(props){
        super(props);
        this.changerOrdre = this.changerOrdre.bind(this);
        this.rechercherPost = this.rechercherPost.bind(this);
    }

    //appeler avant que le component est render pour la première fois
    componentWillMount(){
        this.props.rechercherDesPosts({categories: rechercheDefault, auteur: rechercheDefault, ordre: -1});
    }

    //lorsque le props recheche change
    componentDidUpdate(prevProps){
        //si différent
        if(prevProps.recherche != this.props.recherche){
            //on récupère les artciles avec les paramètres de recherche
            this.props.fetchTousLesPosts(this.props.recherche.ordre, {categories: this.props.recherche.categories, auteur: this.props.recherche.auteur});
        }
    }

    //fonction pour mettre à jour les options de recherche
    rechercherPost({categories = this.props.recherche.categories, auteur = this.props.recherche.auteur, ordre = this.props.recherche.ordre}){
        this.props.rechercherDesPosts({categories, auteur, ordre})
    }

    //pour changer l'ordre des post
    changerOrdre(){
        this.rechercherPost({ordre:this.props.recherche.ordre * -1})
    }

    //pour enlever un filtre de recherche
    enleverRecherche(rechercheType){
        let categories = this.props.recherche.categories;
        let auteur = this.props.recherche.auteur;
        rechercheType  === "categories" ? categories = rechercheDefault : auteur = rechercheDefault;
        this.rechercherPost({categories, auteur})
    }

    //pour faire apparaître les filtres de recherche actifs
    renderFiltre(laRecherche, rechercheType){
        if(laRecherche != rechercheDefault){
            return (
                <button onClick={ ()=>{ this.enleverRecherche(rechercheType) } }>
                    {laRecherche}
                </button>
            )
        }
    }

    //fait apparaitre le bouton de tri pour faire changer l'ordre de post (plus vieux au nouveau ou contraire)
    renderBoutonTri(){
        const leTexte = this.props.recherche.ordre === 1 ? "Le plus anciens en premier" : "Le plus récent en premier";
        return (
            <button type="button" onClick={ this.changerOrdre }>
                {leTexte}
            </button>
        );
    }

    //pour faire apparaitre les posts
    renderPosts(){
        if(this.props.posts.length === 0){
            return (<li></li>)
        }

        return this.props.posts.map((post) => {
            return (
                <li key={post._id}>
                    <h2><Link to={'/article/' + post.permalien}>{post.titre}</Link></h2>
                    <article>
                        <h3>{post.date} par <span className="auteur" onClick={ () => {this.rechercherPost({auteur: post.auteur})} } > {post.auteur}</span></h3>
                        <p>{post.appercu}</p>
                        <button onClick={ () => {this.rechercherPost({categories: post.categories})} } >catégorie: {post.categories}</button>
                    </article>
                </li>
            )
        })
    }

    //pour faire apparaitre la page
    render(){
        return (
            <main>
                <header>
                    <h1>MarieMaxime.me</h1>
                    <p>Développeuse web</p>
                </header>

                <section>
                    <Link to="/posts/nouveau">
                        Nouveau message
                    </Link>
                    <div className="filtre">
                        { this.renderBoutonTri() }
                        { this.renderFiltre(this.props.recherche.categories, "categories") }
                        { this.renderFiltre(this.props.recherche.auteur, "auteur") }
                    </div>

                </section>

                <ul>
                    {this.renderPosts()}
                </ul>

            </main>
        );
    };
};

//pour avoir accès au "state" de redux
function mapStateToProps(state){
    return {posts:state.posts.all, recherche:state.posts.recherche}
}

//pour connecter avec redux et avoir accès au fonction du fichier actions/index.js
export default connect(mapStateToProps,{fetchTousLesPosts, rechercherDesPosts})(BlogIndex);
