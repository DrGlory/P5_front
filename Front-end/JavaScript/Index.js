//I************************************************REQUÊTE VERS L'ADRESS API DU SERVEUR POUR RECUPERATION DE DONNES*************************************
const dataApi = fetch("http://localhost:3000/api/cameras")
dataApi.then(async (resData)=> {
    console.log(resData);
    let res = await resData.json();
    console.log(res);
})
//**********************************************************FIN DE RECUPERATION DE DONNES*************************************

// II-déclaration de variables 
let nom = [];
let price = [];
let description = [];
let _id = [];
let imageUrl = [];
// let lenses = [];
let i = [];
let structureProduits ="";
console.log(nom);

// III-Fonction qui va afficher les produits dans la page web automatiquement
function affichageProduits(resultat){
    //1-Sélection élément du DOM
    const positionElement = document.querySelector(".Vcams-container");

    //2-Boucle for pour afficher tous les objets dans la page web
    for (i = 0 ; i < resultat.length ; i++){

        //3-mettre les données dans les variables
        resultat.forEach((element, i) => {
            nom[i] = element.name;
            price[i] = element.price;
            description[i] = element.description;
            _id[i] = element._id;
            imageUrl[i] = element.imageUrl;
            // lenses[i] = element.lenses;
        });
            //4-afficher tous les objets sur la page web
            // Ci-dessous on fait une récurssivité de la variable à chaque tour de boucle pour afaire appaître les autre éléments
        structureProduits = structureProduits +`
        <a href="./PageProduit.html?id=${_id[i]}" class="link">
            <div class="card">
                <img src="${imageUrl[i]}" class="card-img-top lsimg">
                <div class="card-body">
                    <h5 class="card-title">${nom[i]}<span>${price[i]/100}€</span></h5>
                    <p class="card-text">${description[i]}</p>
                </div>
            </div>
        </a>`;

        //5-injection html
        positionElement.innerHTML = structureProduits;
    }
}
//Affichage produits en temps reel en appelant la fonction (resultat) 
affichageProduits(resultat);
