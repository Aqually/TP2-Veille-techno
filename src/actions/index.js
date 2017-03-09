import axios from "axios";

export const FETCH_TOUS_LES_POSTS = "FETCH_TOUS_LES_POSTS";
export const FETCH_UN_POST = "FETCH_UN_POST";
export const CREER_POST = "CREER_POST";
export const DETRUIRE_POST = "DETRUIRE_POST";

export function fetchTousLesPosts(ordre = -1, data = {}){
    const request = axios.post("requetes/afficher_les_posts/" + ordre, data);
    return {
        type: FETCH_TOUS_LES_POSTS,
        payload: request
    };
};

export function fetchUnPost(permalien){
    const request = axios.get("requetes/afficher_un_post/" + permalien);
    return {
        type: FETCH_UN_POST,
        payload: request
    }
}

export function creeUnPost(data){
    const request = axios.post("/requetes/ajouter_un_post", data)
    return {
        type: CREER_POST,
        payload: request
    }
}

export function detruirePost(permalien){
    const request = axios.get("requetes/detruire/" + permalien);
    return {
        type: DETRUIRE_POST,
        payload: request
    }
}
