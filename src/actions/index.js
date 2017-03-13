import axios from "axios";
import {requeteAJAX} from "../helpers/httpRequest"

export const FETCH_TOUS_LES_POSTS = "FETCH_TOUS_LES_POSTS";
export const FETCH_UN_POST = "FETCH_UN_POST";
export const CREER_POST = "CREER_POST";
export const DETRUIRE_POST = "DETRUIRE_POST";
export const RECHERCHER_POST = "RECHERCHER_POST";
export const MODIFIER_POST = "MODIFIER_POST";

export function fetchTousLesPosts(ordre = -1, data = {}){
    const request = requeteAJAX("POST", "/requetes/afficher_les_posts/" + ordre, data);
    return {
        type: FETCH_TOUS_LES_POSTS,
        payload: request
    };
};

export function fetchUnPost(permalien){
    const request = requeteAJAX("GET", "/requetes/afficher_un_post/" + permalien);
    return {
        type: FETCH_UN_POST,
        payload: request
    }
}

export function creeUnPost(data){
    const request = requeteAJAX("POST", "/requetes/ajouter_un_post", data);
    return {
        type: CREER_POST,
        payload: request
    }
}

export function rechercherDesPosts(data){
    const recherche = {
        categories: data.categories,
        auteur: data.auteur,
        ordre: data.ordre
    }
    return {
        type: RECHERCHER_POST,
        payload: recherche
    }
}

export function detruirePost(permalien){
    const request = requeteAJAX("GET", "/requetes/detruire/" + permalien);
    return {
        type: DETRUIRE_POST,
        payload: request
    }
}

export function modifierPost(data){
    const request = requeteAJAX("POST", "/requetes/modifier/", data);
    return {
        type: MODIFIER_POST,
        payload: request
    }
}
