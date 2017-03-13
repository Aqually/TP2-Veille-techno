import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchTousLesPosts, rechercherDesPosts} from "../actions/index";
import { Link } from "react-router";
import BoutonTriOrdre from "./bouton_trier_ordre";

const rechercheDefault = {$exists : true}

class BlogIndex extends Component {

    constructor(props){
        super(props);
        this.changerOrdre = this.changerOrdre.bind(this);
    }

    //appeler avant que le component est render pour la première fois
    componentWillMount(){
        this.props.rechercherDesPosts({categories:rechercheDefault, auteur:rechercheDefault, ordre: -1});
        this.props.fetchTousLesPosts();
    }

    rechercherPost(categories = { rechercheDefault }, auteur = { rechercheDefault }, ordre = -1){
        this.props.rechercherDesPosts({categories, auteur, ordre});
        this.props.fetchTousLesPosts(ordre, {categories ,auteur});
    }

    changerOrdre(){
        let categories = this.props.recherche.categories;
        let auteur = this.props.recherche.auteur;
        this.rechercherPost(categories, auteur, this.props.recherche.ordre * -1)
    }

    enleverRecherche(rechercheType){
        let categories = this.props.recherche.categories;
        let auteur = this.props.recherche.auteur;
        rechercheType  === "categories" ? categories = rechercheDefault : auteur = rechercheDefault;
        this.rechercherPost(categories, auteur, this.props.recherche.ordre)
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

    renderPosts(){
        if(this.props.posts.length === 0){
            return (<li><h2>Aucune article</h2></li>)
        }

        return this.props.posts.map((post) => {
            return (
                <li key={post._id}>
                    <h2><Link to={'/article/' + post.permalien}>{post.titre}</Link></h2>
                    <article>
                        <h3>{post.date} par <span onClick={ () =>{this.rechercherPost(this.props.recherche.categories, post.auteur, this.props.recherche.ordre)}} > {post.auteur}</span></h3>
                        <p>{post.appercu}</p>
                        <p onClick={ () =>{this.rechercherPost(post.categories, this.props.recherche.auteur, this.props.recherche.ordre)} } >{post.categories}</p>
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

                <BoutonTriOrdre changerTri={this.changerOrdre} ordre={this.props.recherche.ordre} />

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
