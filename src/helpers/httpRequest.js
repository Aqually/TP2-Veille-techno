//fichier d'aide pour faire des requêtes HttpRequest

//fonction pour faire une requete AJAX avec XMLHttpRequest
export function requeteAJAX (method, requete, data = null) {
    //on retourne une promise
    return new Promise( (resolve, reject) => {
        //initie la requete
        const xhr = new XMLHttpRequest();
        //on ouvre la requete avec la méthode et la requete reçuent
        xhr.open(method, requete, true);
        xhr.setRequestHeader('Content-type', 'application/json');
        //quand la requete load ...
        xhr.onload = () => {
            //si prêt et pas d'erreur, on retourne les données
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve( {data: JSON.parse(xhr.responseText)} );
            } else {
                //sinon, on rejete la promise
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        //si une erreur
        xhr.onerror = () => {
            //on rejete
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        //si c'est une methode post, on envoie l'information en param
        if(method === "POST"){
            xhr.send(JSON.stringify(data));
        }else{
            xhr.send()
        }
    });
}
