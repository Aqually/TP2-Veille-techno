import React,{Component,PropTypes} from 'react';
import {creeUnPost} from '../actions/index';
import {connect} from "react-redux";
import Form from "./form";
import {Link} from "react-router";

class NouveauPost extends Component {

    static contextTypes ={
        router: PropTypes.object
    };

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillMount(){
        this.setState({
            titre: "",
            auteur: "",
            permalien: "",
            categories: "",
            appercu : "",
            contenu: ""
        })
    }

    //lorsque on submit le form
    handleFormSubmit(e){
        e.preventDefault()
        const data = {
            titre : this.state.titre,
            auteur: this.state.auteur,
            permalien: this.state.permalien,
            categories: this.state.categories,
            appercu: this.state.appercu,
            contenu: this.state.contenu
        }
        //créer un post
        this.props.creeUnPost(data)
            .then( () =>{
                //redirige l'utilisateur sur la page d'accueil
                this.context.router.push("/");
        })
    }

    //gerer les changements, mettre à jour le state de la class avec les données du formulaire
    handleChange(e){
        this.setState( {[e.target.name]: e.target.value} )
    }

    //revenir sur la page d'accueil
    handleCancel(){
        this.context.router.push("/");
    }

    //render la page
    render(){
        return(

            <main>
                <h1>Nouvel article</h1>
                <Form
                    onHandleFormSubmit={this.handleFormSubmit}
                    onHandleChange = { this.handleChange }
                    onHandleModifier = { this.handleCancel }
                    data = {
                        {titre: this.state.titre, permalien: this.state.permalien, auteur: this.state.auteur,
                        categories: this.state.categories, appercu: this.state.appercu, contenu: this.state.contenu}
                    }
                />
            </main>
        )
    }
}

export default connect(null,{creeUnPost})(NouveauPost);
