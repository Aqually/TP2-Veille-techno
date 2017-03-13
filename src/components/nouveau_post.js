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
        this.props.creeUnPost(data)
            .then( () =>{
                this.context.router.push("/");
        })
    }

    handleChange(e){
        this.setState( {[e.target.name]: e.target.value} )
    }

    handleCancel(){
        this.context.router.push("/");
    }

    render(){
        return(
            <Form
                onHandleFormSubmit={this.handleFormSubmit}
                onHandleChange = { this.handleChange }
                onHandleModifier = { this.handleCancel }
                data = {
                    {titre: this.state.titre, permalien: this.state.permalien, auteur: this.state.auteur,
                    categories: this.state.categories, appercu: this.state.appercu, contenu: this.state.contenu}
                }
            />
        )
    }
}

export default connect(null,{creeUnPost})(NouveauPost);
