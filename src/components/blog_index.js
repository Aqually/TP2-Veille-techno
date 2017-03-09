import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchTousLesPosts} from "../actions/index";
import { Link } from "react-router";

const rechercheDefault = {$exists : true}
const initialState = {recherche:{ categories: rechercheDefault, auteur: rechercheDefault }, ordre:-1};

class BlogIndex extends Component {

    constructor(props){
        super(props);
        this.state = initialState;
        //this.afficherCategorie = this.afficherCategorie.bind(this);
    }


    //appeler avant que le component est render pour la première fois
    componentWillMount(){
        this.props.fetchTousLesPosts(this.state.ordre, this.state.recherche);
    }

    rechercherPost(categories = { rechercheDefault }, auteur = { rechercheDefault }, ordre = -1){
        const recherche = { categories ,auteur }
        this.setState({ recherche,ordre })
        this.props.fetchTousLesPosts(ordre, recherche);
    }

    renderFiltre(laRecherche){
        if(laRecherche != rechercheDefault){
            return (<span>{laRecherche}</span>)
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
                        <h3>{post.date} par <span onClick={ () =>{this.rechercherPost(this.state.recherche.categories, post.auteur)}} > {post.auteur}</span></h3>
                        <p>{post.appercu}</p>
                        <p onClick={ () =>{this.rechercherPost(post.categories, this.state.recherche.auteur)} } >{post.categories}</p>
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
                { this.renderFiltre(this.state.recherche.categories) }
                { this.renderFiltre(this.state.recherche.auteur) }
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
