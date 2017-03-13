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

    componentDidUpdate(prevProps){
        if(prevProps.recherche != this.props.recherche){
            this.props.fetchTousLesPosts(this.props.recherche.ordre, {categories: this.props.recherche.categories, auteur: this.props.recherche.auteur});
        }
    }

    rechercherPost({categories = this.props.recherche.categories, auteur = this.props.recherche.auteur, ordre = this.props.recherche.ordre}){
        this.props.rechercherDesPosts({categories, auteur, ordre})
    }

    changerOrdre(){
        this.rechercherPost({ordre:this.props.recherche.ordre * -1})
    }

    enleverRecherche(rechercheType){
        let categories = this.props.recherche.categories;
        let auteur = this.props.recherche.auteur;
        rechercheType  === "categories" ? categories = rechercheDefault : auteur = rechercheDefault;
        this.rechercherPost({categories, auteur})
    }

    renderFiltre(laRecherche, rechercheType){
        if(laRecherche != rechercheDefault){
            return (
                <span onClick={ ()=>{ this.enleverRecherche(rechercheType) } }>
                    {rechercheType + ": " + laRecherche}
                </span>
            )
        }
    }

    renderBoutonTri(){
        const leTexte = this.props.recherche.ordre === 1 ? "Le plus anciens en premier" : "Le plus récent en premier";
        return (
            <button type="button" onClick={ this.changerOrdre }>
                {leTexte}
            </button>
        );
    }

    renderPosts(){
        if(this.props.posts.length === 0){
            return (<li></li>)
        }

        return this.props.posts.map((post) => {
            return (
                <li key={post._id}>
                    <h2><Link to={'/article/' + post.permalien}>{post.titre}</Link></h2>
                    <article>
                        <h3>{post.date} par <span onClick={ () => {this.rechercherPost({auteur: post.auteur})} } > {post.auteur}</span></h3>
                        <p>{post.appercu}</p>
                        <p onClick={ () => {this.rechercherPost({categories: post.categories})} } >{post.categories}</p>
                    </article>
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

                { this.renderFiltre(this.props.recherche.categories, "categories") }
                { this.renderFiltre(this.props.recherche.auteur, "auteur") }
                { this.renderBoutonTri() }

                <h1>Les articles</h1>
                <ul>
                    {this.renderPosts()}
                </ul>

            </div>
        );
    };
};

function mapStateToProps(state){
    return {posts:state.posts.all, recherche:state.posts.recherche}
}

export default connect(mapStateToProps,{fetchTousLesPosts, rechercherDesPosts})(BlogIndex);
