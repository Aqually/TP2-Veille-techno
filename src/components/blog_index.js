import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchTousLesPosts} from "../actions/index";
import { Link } from "react-router";
import BoutonTriOrdre from "./bouton_trier_ordre";

const rechercheDefault = {$exists : true}
const initialState = { categories: rechercheDefault, auteur: rechercheDefault, ordre:-1};

class BlogIndex extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        this.changerOrdre = this.changerOrdre.bind(this);
    }

    //appeler avant que le component est render pour la première fois
    componentWillMount(){
        this.props.fetchTousLesPosts();
    }

    rechercherPost(categories = { rechercheDefault }, auteur = { rechercheDefault }, ordre = -1){
        this.setState({ categories,ordre,auteur })
        this.props.fetchTousLesPosts(ordre, {categories ,auteur});
    }

    enleverRecherche(rechercheType){
        let categories = this.state.categories
        let auteur = this.state.auteur
        rechercheType  === "categories" ? categories = rechercheDefault : auteur = rechercheDefault;
        this.rechercherPost(categories, auteur, this.state.ordre);
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
                    <h2><Link to={'/' + post.permalien}>{post.titre}</Link></h2>
                    <article>
                        <h3>{post.date} par <span onClick={ () =>{this.rechercherPost(this.state.categories, post.auteur, this.state.ordre)}} > {post.auteur}</span></h3>
                        <p>{post.appercu}</p>
                        <p onClick={ () =>{this.rechercherPost(post.categories, this.state.auteur, this.state.ordre)} } >{post.categories}</p>
                    </article>
                </li>
            )
        })
    }

    changerOrdre(){
        this.rechercherPost(this.state.categories, this.state.auteur, this.state.ordre * -1)
    }

    render(){
        return (
            <div>
                <div>
                    <Link to="/posts/nouveau">
                        Nouveau message
                    </Link>
                </div>

                { this.renderFiltre(this.state.categories, "categories") }
                { this.renderFiltre(this.state.auteur, "auteur") }

                <BoutonTriOrdre changerTri={this.changerOrdre} ordre={this.state.ordre} />

                <h1>Les articles</h1>
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
