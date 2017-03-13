import React, { Component } from 'react';

export default class Form extends Component {
  render() {

    return (
        <form onSubmit={ this.props.onHandleFormSubmit }>
            <label>Titre</label>
            <input name="titre" onChange={ this.props.onHandleChange } type="text" value={this.props.data.titre} />

            <label>Permalien</label>
            <input name="permalien" onChange={ this.props.onHandleChange } type="text" value={this.props.data.permalien} />

            <label>Auteur</label>
            <input name="auteur" onChange={ this.props.onHandleChange } type="text" value={this.props.data.auteur} />

            <label>Categorie</label>
            <input name="categories" onChange={ this.props.onHandleChange } type="text" value={this.props.data.categories} />

            <label>Apperçu</label>
            <input name="appercu" onChange={ this.props.onHandleChange } type="text" value={this.props.data.appercu} />

            <label>Contenu</label>
            <input name="contenu" onChange={ this.props.onHandleChange } type="textarea" value={this.props.data.contenu} />
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={ this.props.onHandleModifier }>Cancel</button>
        </form>
    );
  }
}
