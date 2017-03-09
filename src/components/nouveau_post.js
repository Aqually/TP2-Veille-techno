import React,{Component,PropTypes} from 'react';
import { reduxForm} from 'redux-form';
import {creeUnPost} from '../actions/index';
import {Link} from "react-router";

class PostsNew extends React.Component {

    static contextTypes ={
        router: PropTypes.object
    };

    onSubmit(props){
        this.props.creeUnPost(props)
            .then(() =>{
                //blog post créer
                //naviger le user vers "/"
                //en appelant this.context.router.push avec le chemin
                this.context.router.push("/");
            });
    }

    render(){
        const {fields:{titre,categories,contenu, auteur, appercu, permalien}, handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h1>Créer une nouvelle article</h1>
                <div>
                    <label>Titre</label>
                    <input type="text" {...titre} />
                    <div>{titre.touched ? titre.error : ""}</div>
                </div>

                <div>
                    <label>Auteur</label>
                    <input type="text" {...auteur} />
                    <div>{auteur.touched ? auteur.error : ""}</div>
                </div>

                <div>
                    <label>Permalien</label>
                    <input type="text" {...permalien} />
                    <div>{permalien.touched ? permalien.error : ""}</div>
                </div>

                <div>
                    <label>Categories</label>
                    <input type="text" {...categories} />
                    <div>{categories.touched ? categories.error : ""}</div>
                </div>

                <div>
                    <label>Apperçu</label>
                    <input type="text" {...appercu} />
                    <div>{appercu.touched ? appercu.error : ""}</div>
                </div>

                <div>
                    <label>Contenu</label>
                    <textarea {...contenu} />
                    <div>{contenu.touched ? contenu.error : ""}</div>
                </div>

                <button type="submit">Submit</button>
                <Link to="/">Cancel</Link>
            </form>
        );
    }
}

function validate(values){
    const errors = {};
    if(!values.titre){
        errors.titre = "Entrer un titre pour l'article";
    }

    if(!values.auteur){
        errors.auteur = "Entrer le nom de l'auteur";
    }

    if(!values.permalien){
        errors.permalien = "Entrer le lien de l'article";
    }

    if(!values.appercu){
        errors.appercu = "Entrer un apperçu de l'article";
    }

    if(!values.categories){
        errors.categories = "Enter la catégorie de l'article";
    }

    if(!values.contenu){
        errors.contenu = "Enter le contenu de l'article";
    }

    return errors
}


export default reduxForm({
    form:'PostNewForm',
    fields:['titre','categories','contenu', "auteur", "appercu", "permalien"],
    validate
},null,{creeUnPost})(PostsNew);
