//mapping des URLs de l'application
import React from "react";
import {Route, IndexRoute} from "react-router";

import App from "./components/app";
import BlogIndex from "./components/blog_index";
import NouveauPost from "./components/nouveau_post";
import AfficherPost from "./components/afficher_post";

export default(
    <Route path="/" component={App}>
        <IndexRoute component={BlogIndex}/>
        <Route path="posts/nouveau" component={NouveauPost}/>
        <Route path="article/:permalien">
            <IndexRoute component={AfficherPost}/>
        </Route>
    </Route>
);
