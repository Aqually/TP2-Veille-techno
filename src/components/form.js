import React, { Component } from 'react';
//le formulaire pour créer un nouvel article et modifier
export default class Form extends Component {
  render() {

    return (
        <form onSubmit={ this.props.onHandleFormSubmit }>
            <label>Titre</label>
            <input name="titre" onChange={ this.props.onHandleChange } type="text" value={this.props.data.titre} required />

            <label>Permalien</label>
            <input name="permalien" onChange={ this.props.onHandleChange } type="text" value={this.props.data.permalien} required />

            <label>Auteur</label>
            <input name="auteur" onChange={ this.props.onHandleChange } type="text" value={this.props.data.auteur} required />

            <label>Categorie</label>
            <input name="categories" onChange={ this.props.onHandleChange } type="text" value={this.props.data.categories} required />

            <label>Apperçu</label>
            <textarea name="appercu" onChange={ this.props.onHandleChange } type="text" value={this.props.data.appercu} required />

            <label>Contenu</label>
            <textarea name="contenu" onChange={ this.props.onHandleChange } type="textarea" value={this.props.data.contenu} required />
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={ this.props.onHandleModifier }>Cancel</button>
        </form>
    );
  }
}
