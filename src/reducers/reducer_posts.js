import { FETCH_TOUS_LES_POSTS, FETCH_UN_POST } from "../actions/index";

//all = array de blog posts
//post = un post individuel (null par defaut)
const INITIAL_STATE = { all:[], post: null };

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case FETCH_TOUS_LES_POSTS:
            return { ...state, all: action.payload.data };
        case FETCH_UN_POST:
            return {...state, post: action.payload.data};
        default:
            return state;
    }
}
