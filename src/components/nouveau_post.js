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
        const {fields:{titre,categories,contenu, auteur, permalien}, handleSubmit } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create A New Post</h3>
                <div className={`form-group ${titre.touched && titre.invalid ? 'has-danger': '' }`}>
                    <label>Titre</label>
                    <input type="text" className="form-control" {...titre} />
                    <div className="text-help">{titre.touched ? titre.error : ""}</div>
                </div>

                <div className={`form-group ${auteur.touched && auteur.invalid ? 'has-danger': '' }`}>
                    <label>Auteur</label>
                    <input type="text" className="form-control" {...auteur} />
                    <div className="text-help">{auteur.touched ? auteur.error : ""}</div>
                </div>

                <div className={`form-group ${permalien.touched && permalien.invalid ? 'has-danger': '' }`}>
                    <label>Permalien</label>
                    <input type="text" className="form-control" {...permalien} />
                    <div className="text-help">{permalien.touched ? permalien.error : ""}</div>
                </div>

                <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger': '' }`}>
                    <label>Categories</label>
                    <input type="text" className="form-control" {...categories} />
                    <div className="text-help">{categories.touched ? categories.error : ""}</div>
                </div>

                <div className={`form-group ${contenu.touched && contenu.invalid ? 'has-danger': '' }`}>
                    <label>Contenu</label>
                    <textarea className="form-control" {...contenu} />
                    <div className="text-help">{contenu.touched ? contenu.error : ""}</div>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values){
    const errors = {};
    if(!values.titre){
        errors.titre = "Enter a name";
    }

    if(!values.auteur){
        errors.auteur = "Enter a auteur";
    }

    if(!values.permalien){
        errors.permalien = "Enter a permalien";
    }

    if(!values.categories){
        errors.categories = "Enter atleast one category";
    }

    if(!values.contenu){
        errors.contenu = "Enter contenu";
    }

    return errors
}


export default reduxForm({
  form:'PostNewForm',
  fields:['titre','categories','contenu', "auteur", "permalien"],
  validate
},null,{creeUnPost})(PostsNew);
