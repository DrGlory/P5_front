// 1-Récupération de la chaîne de requête dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);
// Méthode 1 : pour extraire juste l'id
// Enfait slice vous permet de couper comme son nom l'indique qlq chose, pour récupérer les clé = valeurs après le point d'interro ?
const leId =  queryString_url_id.slice(4);
// console.log(_id);
// Méthode 2 : pour extaraire l'id
// const urlSearchParams = new URLSearchParams(queryString_url_id);
// console.log(urlSearchParams);

// const leSecondId = urlSearchParams.get ("id")
// console.log(leSecondId);


// Affcihage du produit (de l'objet) qui a été sélectionné par l'id
// ------------------2 méthodes possibles--------------

// Méthode 1 : avec Fetch et en mettant la valeur de l'id à la fin de l'url
// fetch("http://localhost:3000/api/cameras/061")
// let rep = await fetch('http://localhost:3000/api/cameras/${id}');

// Méthode 2 : utilisation de la méthod .find()
console.log(resultat);
const idProduitSelection = resultat.find((element)=>element._id === leId);
console.log(idProduitSelection);


//2- Sélection de la classe où je vais injecter le code HTML
const positionElement2 = document.querySelector(".Vcams-container")
console.log(positionElement2);

// La structure html pour l'affichage du produit sélectionné
const structureProduit2 = `
            <div class="card">
                <img src="${idProduitSelection.imageUrl}" class="card-img-top lsimg">
                <div class="card-body">
                    <h5 class="card-title">${idProduitSelection.name}<span>${idProduitSelection.price/100}€</span></h5>
                    <p class="card-text">${idProduitSelection.description}</p>
                    <form >
                        <div class="q">
                            <label for="option_produit"> Choix de lentille </label>
                            <select name="option_produit" id="option_produit">
                            </select>
                        </div>

                        <div class="q">
                            <label for="quantite_produit"> Quantité </label>
                            <select name="quantite_produit" id="quantite_produit">
                            </select>
                        </div>
                    </form>
                    <button id="btn-envoyer" type="submit" name="btn-envoyer">Ajouter l'article au panier</button>
                </div>
            </div> `;


// Adaption du formulaire au nombre d'option
const optionQuantite = idProduitSelection.lenses;
let structureLenses =[];
console.log("optionQuantite")
console.log(optionQuantite)


// la boucle for pour afficher toutes les options du produit
for (let j = 0; j < optionQuantite.length; j++){
    structureLenses = structureLenses + `
    <option value="${optionQuantite[j]}">${optionQuantite[j]}</option>
    `;
}

// Injection html dans la page produit 
positionElement2.innerHTML = structureProduit2;

// Injection html dans la page produit pour le choix des options dans le formulaire
const positionElement3 = document.querySelector("#option_produit");
positionElement3.innerHTML = structureLenses;
console.log(positionElement3)

// QUANTITE : choisir la quantité de produits (cameras) possible
const structureQuantite = `
<option value ="1">1</option>
<option value ="2">2</option> 
<option value ="3">3</option>`;
// QUANTITE : Afficher la quantité de produits (cameras) possible structureQuantite dans le formulaire
const positionElementQuantite = document.querySelector("#quantite_produit");
positionElementQuantite.innerHTML = structureQuantite; 



// II----------------------------------------LA GESTION DU PANIER-------------------------------------------
// La récupération des données sélectionnées par l'utilisateur et envoie du panier
// Sélection de l'id du formulaire 
const idForm = document.querySelector("#option_produit");
console.log(idForm);

// Sélection du boutton Ajouter l'article au panier 
const btnEnvoiePanier = document.querySelector("#btn-envoyer");
console.log(btnEnvoiePanier)

// Ecouter le boutton et savoir ce qui se passe si un click ou autre et envoyer le panier
btnEnvoiePanier.addEventListener("click",(e)=>{
    e.preventDefault();

    // Mettre le choix de l'utilisteur dans une variable
    const choixLens = idForm.value
    console.log(choixLens)

    // QUANTITE : Mettre la quantité dans une variable
    const choixQuantite = positionElementQuantite.value

    // Récupération des valeurs du formulaire
    let optionsProduit = {
    nom : idProduitSelection.name,
    id_ProduitSelection : idProduitSelection._id,
    option_produit : choixLens,
    quantite : choixQuantite,
    price : (idProduitSelection.price * choixQuantite) / 100,

    };
    console.log("optionsProduit")
    console.log(optionsProduit)



    // -----------------------------Le local Storage-------------------------------
    // --------------Stocker la récupération des valeurs du formulaire dans le local storage----

    // Déclaration de la variable "produitEnregistrerDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
    // JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet javascript
    let produitEnregistrerDansLocalStorage =JSON.parse(localStorage.getItem("produit"));
    console.log(produitEnregistrerDansLocalStorage);

    // fonction fenêtre pop up 
    const popupConfirmation = () =>{
        if(window.confirm(`${idProduitSelection.name} option: ${choixLens} a bien été ajouté au panier. 
    Pour consulter le panier cliquez sur : OK 
    Pour rester sur cette page cliquez sur : ANNULER`)){
    window.location.href = "PagePanier.html";
        }else{
    window.location.href = "";       
    // enfait la page produit n'existe que grâce au clic sur les images de la page accueil. donc one peut naviguer correctement sur les pages avec du simple html
        }
    }

    // Fonction ajouter un produit séléctionné dans le localStorage
    
    const ajoutProduitLocalStorage = () => {
        // Ajout dans le tableau de l'objet avec les values choisies par l'utilisateur code ci-dessous
        produitEnregistrerDansLocalStorage.push(optionsProduit);
        // Code ci-dessous : transformation en format JSON et envoie dans la key "produit" du localStorage
        localStorage.setItem("produit", JSON.stringify(produitEnregistrerDansLocalStorage));
    }
   
    // s'l y a dejà des produits enregistré dans le local storage
    if(produitEnregistrerDansLocalStorage){
        ajoutProduitLocalStorage();
        console.log(produitEnregistrerDansLocalStorage);
        popupConfirmation();
    
    }
    // s'l n'y pas de produits enregistré dans le local storage
    else{
        produitEnregistrerDansLocalStorage = [];
        ajoutProduitLocalStorage();
        console.log(produitEnregistrerDansLocalStorage);
        popupConfirmation();
    }

});

// Ceci en bas c'est du JSON dans le local storage
// [{"nom":"Hirsch 400DTS","id_ProduitSelection":"5be1ef211c9d44000030b062","option_produit":"0","quantite":1,"price":3099}]
