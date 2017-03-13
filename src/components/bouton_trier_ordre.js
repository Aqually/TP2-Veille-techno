import React, { Component } from 'react';

export default class BoutonTri extends Component {

    texteBouton(){
        return this.props.ordre === 1 ? "Le plus anciens en premier" : "Le plus récent en premier";
    }

    render() {
        return (
            <button onClick={this.changerTri}>
                {this.texteBouton()}
            </button>
        );
    }
}
