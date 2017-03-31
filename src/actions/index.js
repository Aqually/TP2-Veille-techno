//les actions pour faire des modification à l'application

//fonction pour faire les requetes ajax
import {requeteAJAX} from "../helpers/httpRequest"

//les actions
export const FETCH_TOUS_LES_POSTS = "FETCH_TOUS_LES_POSTS";
export const FETCH_UN_POST = "FETCH_UN_POST";
export const CREER_POST = "CREER_POST";
export const DETRUIRE_POST = "DETRUIRE_POST";
export const RECHERCHER_POST = "RECHERCHER_POST";
export const MODIFIER_POST = "MODIFIER_POST";

//récupérer tous les articles
export function fetchTousLesPosts(ordre = -1, data = {}){
    const request = requeteAJAX("POST", "/requetes/afficher_les_posts/" + ordre, data);
    return {
        type: FETCH_TOUS_LES_POSTS,
        payload: request
    };
};

//récupéré un artcile
export function fetchUnPost(permalien){
    const request = requeteAJAX("GET", "/requetes/afficher_un_post/" + permalien);
    return {
        type: FETCH_UN_POST,
        payload: request
    }
}

//créer un article
export function creeUnPost(data){
    const request = requeteAJAX("POST", "/requetes/ajouter_un_post", data);
    return {
        type: CREER_POST,
        payload: request
    }
}

//recherche un article selon des paramètres
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

//détruire un article
export function detruirePost(permalien){
    const request = requeteAJAX("GET", "/requetes/detruire/" + permalien);
    return {
        type: DETRUIRE_POST,
        payload: request
    }
}

//modifier un article
export function modifierPost(data){
    const request = requeteAJAX("POST", "/requetes/modifier/", data);
    return {
        type: MODIFIER_POST,
        payload: request
    }
}
