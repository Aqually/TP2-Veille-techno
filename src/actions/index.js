import axios from "axios";

export const FETCH_TOUS_LES_POSTS = "FETCH_POSTS";
export const FETCH_UN_POST = "FETCH_POST";
export const CREER_POST = "CREATE_POST";
export const DETRUIRE_POST = "DELETE_POST";

export function fetchTousLesPosts(){
    const request = axios.get("requetes/afficher_les_posts");
    return {
        type: FETCH_TOUS_LES_POSTS,
        payload: request
    };
};

export function fetchUnPost(id){
    const request = axios.get("requetes/afficher_un_post/" + id);
    return {
        type: FETCH_UN_POST,
        payload: request
    }
}
