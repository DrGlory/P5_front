 // Déclaration de la variable "produitEnregistrerDansLocalStorage" dans laquelle on met les key et les values qui sont dans le local storage
// JSON.parse c'est pour convertir les données au format JSON qui sont dans le local storage en objet javascript
let produitEnregistrerDansLocalStorage =JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistrerDansLocalStorage);

//---------------------------AFFICHAGE DES PRODUITS DU PANIER-------------------------------
// Sélection de la class où je vais injecter le code html
const positionElement4 = document.querySelector("#Vcams-container-panier");
console.log(positionElement4)

// Si le panier est vide : afficher le panier est vide 
if(produitEnregistrerDansLocalStorage === null || produitEnregistrerDansLocalStorage == 0 ){
const panierVide = `
<div class="container-panier-vide text-white"
    <div>Le panier est vide</div>
</div>`;
positionElement4.innerHTML = panierVide; 
// Si le panier n'est pas vide il faut afficher les produits dans le localStorage
}else{
    let structureProduitPanier = [];
    for(k = 0; k < produitEnregistrerDansLocalStorage.length; k++){
        structureProduitPanier =  structureProduitPanier + `
        <div class="container-recapitulatif text-white">
            <div> Quantité : ${produitEnregistrerDansLocalStorage[k].quantite}- ${produitEnregistrerDansLocalStorage[k].nom} Lens :${produitEnregistrerDansLocalStorage[k].option_produit} </div>
            <div>${produitEnregistrerDansLocalStorage[k].price} € - <button class="btn-supprimer"> supprimer </button></div>
        </div> `;
    }
        
        if(k == produitEnregistrerDansLocalStorage.length){
        // injection html dans la page panier
        positionElement4.innerHTML =  structureProduitPanier; 
    }
}
// --------------------------------------------FIN de l'affichage des produits panier---------------------------------------

// -------------------------------------------Gestion du boutton supprimer l'article-----------------------------------------
// Sélection des références de tous les boutons btn-supprimer

let btnSupprimer = document.querySelectorAll(".btn-supprimer");
console.log(btnSupprimer)


for(let l = 0 ; l < btnSupprimer.length ; l++){
    btnSupprimer[l].addEventListener("click" , (e) => {
        e.preventDefault();

    // Sélection de l'id qu va être supprimé en cliquant sur le boutton
    let idSelectionSuppression = produitEnregistrerDansLocalStorage[l].id_ProduitSelection;
    console.log(idSelectionSuppression)

    // Avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément où le btn suppr a été cliqué
    produitEnregistrerDansLocalStorage = produitEnregistrerDansLocalStorage.filter(el => el.id_ProduitSelection !== idSelectionSuppression);
    console.log(produitEnregistrerDansLocalStorage)
     // On envoie la variable dans le localStorage
      // Code ci-dessous : transformation en format JSON et envoie dans la key "produit" du localStorage
      localStorage.setItem("produit", JSON.stringify(produitEnregistrerDansLocalStorage));
    //   Alert pour avertir que le produit a été supprimé et rechargement de la page
    alert("Ce produit a été supprimé du panier ")
    window.location.href = "PagePanier.html";
    })
}

// ************************************************BOUTON POUR VIDER ENTIEREMENT LE PANIER***********************************
// Le code html du bouton à afficher dans la page
const btnToutSupprPanierHtml = `
<button class="btn-tout-supprimer-panier  text-white"> Vider le panier </button>
`;
console.log(positionElement4)
// Insertion du boutton dans le html du panier
positionElement4.insertAdjacentHTML("beforeend" , btnToutSupprPanierHtml); 

// La sélection de la référence du boutton "btn-tout-supprimer-panier"
const btnToutSupprimerPanier = document.querySelector(".btn-tout-supprimer-panier");
console.log(btnToutSupprimerPanier);

//------Suppression de la key produit du localStorage pour vider entièrement le panier 
btnToutSupprimerPanier.addEventListener("click" , (e) => {
e.preventDefault();

    //.removeItem pour vider le localStorage
    localStorage.removeItem("produit");
    // alert du panier vidé au click
    alert("Le panier a été vidé");
    // rechargement de la page panier
    window.location.href = "PagePanier.html";

});
// -------------------------------------FIN BOUTON POUR VIDER ENTIEREMENT LE PANIER-------------------------------------


// *********************************************CALCUL DES PRIX DU PANIER ***********************************
// Déclaration de la variable pour pouvoir y mettre les prix qui sont présents dans le panier
let prixTotalCalcul = [];

// Aller chercher les prix dans le panier

for (let m = 0 ; m < produitEnregistrerDansLocalStorage.length ; m++){
let prixProduitsDansLePanier = produitEnregistrerDansLocalStorage[m].price

// Mettre les prix du panier dans la variable prixTotalCalcul
prixTotalCalcul.push(prixProduitsDansLePanier)
console.log(prixTotalCalcul)
}

// Addition des prix totaux disponibles dans la variable prixTotalCalcul avec la méthode .reduce
const reducer = (accumulator, currentvalue) => accumulator + currentvalue ;
const prixTotal = prixTotalCalcul.reduce(reducer, 0);
console.log(prixTotal);

// Le code HTML du prix total à afficher 
const affichagePrixHtml = `
<div class="affichage-prix-html text-white">Le prix total est de : ${prixTotal} € </div>`;

// Injection html dans la page panier
positionElement4.insertAdjacentHTML("beforeend" , affichagePrixHtml);

// -------------------------------------FIN CALCUL DES PRIX DU PANIER -------------------------------------



// *******************************CONSTRUCTION ET INJECTION DU FORMULAIRE SUR LA PAGE PANIER***********************


const afficherFormulaireHTML = () =>{
    // Sélection de l'élément du DOM pour afficher formulaire
    const positionElement4 = document.querySelector("#Vcams-container-panier");

    const structureFormulaire = ` 
    <!--Le formualaire dans le html  -->
    <section class="formulaire">
        <div id="formulaireCommande">
            <h2 class="text-white">Remplissez le formulaire pour valider la commande</h2>
            <form class="text-white">
                <label for="firstName"> Prenom : </label>
                <input type="text" id ="firstName" name="firstName" required>

                <label for="lastName"> Nom : </label>
                <input type="text" id ="lastName" name="lastName" required>
                
                <label for="address"> Adresse : </label>
                <textarea id ="address" name="address" required></textarea>

                <label for="city"> Ville : </label>
                <input type="text" id ="city" name="city" required>


                <label for="email"> E-mail: </label>
                <input type="text" id ="email" name="email" required>

                <button id="envoyer-formulaire" type="submit" name="envoyerformulaire"> Confirmation de la Commande </button>
            </form>
        </div>
    </section>`;

    // Injection de l'élément html
    positionElement4.insertAdjacentHTML("afterend", structureFormulaire);
};
// Affichage du formulaire
afficherFormulaireHTML();
// selection du boutton envoyer formulaire 
const btnEnvoyerFormulaire = document.querySelector("#envoyer-formulaire");
console.log(btnEnvoyerFormulaire)

// -------------------------------addeventlistener----------------------
    btnEnvoyerFormulaire.addEventListener("click", (e) => {
        e.preventDefault();
        
    //     if(produitEnregistrerDansLocalStorage < 1){
    //         console.log("le localStorage a pour valeur null");

    //         alert("Vous devez choisir des produits à commander avant de valider !")

    //     }else{
    //         for (let m = 0 ; m < produitEnregistrerDansLocalStorage.length ; m++){
    //         let prixProduitsDansLePanier = produitEnregistrerDansLocalStorage[m].price
    //         // Mettre les prix du panier dans la variable prixTotalCalcul
    //         prixTotalCalcul.push(prixProduitsDansLePanier)
    //         console.log(prixTotalCalcul)
    //     }
    // }
    
    // Création / Définition d'une classe pour fabriquer l'objet dans lequel iront les values du formulaire
    class Formulaire{
        constructor(){
            this.firstName = document.querySelector("#firstName").value;
            this.lastName = document.querySelector("#lastName").value;
            this.address = document.querySelector("#address").value;
            this.city = document.querySelector("#city").value;
            // this.codepostal = document.querySelector("#codepostal").value;
            this.email = document.querySelector("#email").value;
        }
    }
    // Appel de l'instance de class Formulaire pour créer l'objet formulaireValues 
    const contact = new Formulaire();
    console.log("contact")
    console.log(contact)

//*****************************************GESTION VALIDATION DU FORMULAIRE********************************************
const textAlert = (value) => {
    return `${value} : Les chiffres et les symboles ne sont pas autorisés \n Ne pas dépasser 20 caractères, minimum 3 caractères`
}

// Ci-dessous regx pour Prenom et Nom
const regExPrenomNomVille = (value) => {
return /^([A-Z a-z]{3,15})?([-]{0,1}?([A-Z a-z]{3,15}))$/.test(value);
}
// Ci-dessous regx pour la ville
const regExVille = (value) => {
return /^([A-Z a-z]{3,19})?([-]{0,1}?([A-Z a-z]{3,15}))?([-]{0,1}?([A-Z a-z]{3,15}))$/.test(value);
}
// Ci-dessous regx pour code postal
// const regExCodePostal = (value) => {
//     return /^[0-9]{5}$/.test(value);
//     }
// Ci-dessous regx pour l'Email
const regExEmail= (value) => {
return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}
// Ci-dessous regx pour l'adresse
const regExAdresse= (value) => {
return /^([0-9]{1,4})?([A-Z a-z]{5,50})$/.test(value);
}

function prenomControle(){
    // Contrôle du prenom
    const lePrenom = contact.firstName;

    if(regExPrenomNomVille(lePrenom)){
        return true;
    }else{
        alert (textAlert("PRENOM"));
        return false;
    };
}
function nomControle(){
    // Contrôle du prenom
    const leNom = contact.lastName;

    if(regExPrenomNomVille(leNom)){
        return true;
    }else{
        alert (textAlert("NOM"));
        return false;
    };
}
// function codePostalControle(){
//     // Contrôle du code postal
//     const leCodePostal = formulaireValues.codepostal;

//     if(regExCodePostal(leCodePostal)){
//         return true;
//     }else{
//         alert ("CODE POSTAL : Ne doit être composé que de 5 chiffres");
//         return false;
//     };
// }
function emailControle(){
    // Contrôle de la validité de l'email
    const leEmail = contact.email;

    if(regExEmail(leEmail)){
        return true;
    }else{
        alert ("L'email n'est pas valide");
        return false;
    };
}
function villeControle(){
    // Contrôle de la validité de la ville
    const laVille = contact.city;

    if(regExVille(laVille)){
        return true;
    }else{
        alert ("Rentrez correctement le nom de votre ville");
        return false;
    };
};
function AdresseControle(){
    // Contrôle de la validité de l'adresse
    const lAdresse = contact.address;

    if(regExAdresse(lAdresse)){
        return true;
    }else{
        alert ("Rettapez correctement votre adresse");
        return false;
    };
};

// Contrôle de validité formulaire avant envoie dans le localStorage
    if(prenomControle() && nomControle() && emailControle() && AdresseControle() && villeControle()){
        // Mettre "formulaireValues" dans le localStorage
        localStorage.setItem("contact", JSON.stringify(contact));
        localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
        console.log("prenomControle");
        }else{
            alert("Vueillez bien remplir le formulaire s'il vous plaît");
        };


//-----------------------------------------FIN GESTION VALIDATION DU FORMULAIRE-----------------------------------------

    //  Récupération des valeurs du formulaire 
    // const formulaireValues = {
    //     prenom : document.querySelector("#prenom").value,
    //     nom : document.querySelector("#nom").value,
    //     adresse : document.querySelector("#adresse").value,
    //     ville : document.querySelector("#ville").value,
    //     codepostal : document.querySelector("#codepostal").value,
    //     email : document.querySelector("#email").value,
    // }

    // // Récupération des valeurs du formulaire pour les mettre dans le localStorage
    // localStorage.setItem("prenom", document.querySelector("#prenom").value);
    // localStorage.setItem("nom", document.querySelector("#nom").value);
    // localStorage.setItem("adresse", document.querySelector("#adresse").value);
    // localStorage.setItem("ville", document.querySelector("#ville").value);
    // localStorage.setItem("codepostal", document.querySelector("#codepostal").value);
    // localStorage.setItem("email", document.querySelector("#email").value);



    // // Mettre les values du formulaire dans un objet
    // const formulaire = {
    //     prenom : localStorage.getItem("prenom"),
    //     nom : localStorage.getItem("nom"),
    //     adresse : localStorage.getItem("adresse"),
    //     ville : localStorage.getItem("ville"),
    //     codepostal : localStorage.getItem("codepostal"),
    //     email : localStorage.getItem("email"),
    // }
    // console.log("formulaire")
    // console.log(formulaire)
    
    // Faire .map du contenu des produits
let products = produitEnregistrerDansLocalStorage.map((produitEnregistrerDansLocalStorage) => produitEnregistrerDansLocalStorage.id_ProduitSelection);

// Mettre les values du formulaire et mettre les produits sélectionnés dans un objet à envoyer vers le serveur 
    const aEnvoyer = {
    products,
    contact,
    prixTotal,
    };
    console.log("aEnvoyer")
    console.log(aEnvoyer)
  
    // Envoie de l'objet "aEnvoyer" vers le serveur
    const promise01 = fetch("http://localhost:3000/api/cameras/order", {
        
        method : "POST",
        headers: {
            "Content-Type" : "application/json",
         },
         body : JSON.stringify(aEnvoyer),
         
    });
        console.log("promise01");
        console.log(promise01);

        // Pour voir le résultat du serveur dans la console
        promise01.then(async(response)=> {
            try{
                console.log("response");
                console.log(response);
                const contenu = await response.json();
                console.log("contenu")
                console.log(contenu)

            if(response.ok){
                console.log(`Resultat de response.ok : ${response.ok}`);
                // Récupération de l'id de la response du serveur
                console.log("id de response");
                console.log(contenu.orderId);

                // Mettre le orderId dans le local storage
                localStorage.setItem("responseOrderId",contenu.orderId);

                // Aller vers la page confirmation-commande
                window.location = "Confirmation.html";
            }else{
                console.log(`Reponse du serveur : ${response.status}`)
                alert(`Problème avec le serveur : erreur ${response.status}`)
            };


            }catch(e){
                console.log(e)
            }
        })
        
        // Pour voir ce qu'il y a réellement dans le serveur
        // const promise02 = fetch("http://localhost:3000/api/cameras",)
        // promise02.then(async(response)=>{
        //     try{
        //         console.log("promise02")
        //         console.log(promise02)
        //         const donneesSurServeur = await response.json();
        //         console.log("donneesSurServeur")
        //         console.log(donneesSurServeur)
        //     }catch(e){
        //         console.log(e);
        //     }
        // })






// ------------------------------------------Mettre le contenu du loclaStorage dans les champs du formulaire------------------------
// Prendre la key dans le localStorage et la mettre dans une variable
const dataLocalStorage = localStorage.getItem("formulaireValues");

// convertir la chaîne de caractère en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage)

// Fonction pour que le champ du formulaire soit rempli par les données du local si elle existe ---Mettre les values du localStorage dans les champs du formulaire(2em méthode ci-dessous)
function remplirChampInputDepuisLocalStorage(input){
    if(dataLocalStorageObjet == null){
        console.log("LocalStorage null")
    }else{
        document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
    }

}
remplirChampInputDepuisLocalStorage("firstName")
remplirChampInputDepuisLocalStorage("lastName")
remplirChampInputDepuisLocalStorage("address")
remplirChampInputDepuisLocalStorage("city")
// remplirChampInputDepuisLocalStorage("codepostal")
remplirChampInputDepuisLocalStorage("email")


// // Mettre les values du localStorage dans les champs du formulaire(première méthode)
// document.querySelector("#prenom").setAttribute('value', dataLocalStorageObjet.prenom);
// document.querySelector("#nom").setAttribute('value', dataLocalStorageObjet.nom);
// // Mettre les values du localStorage dans les champs du formulaire(2em méthode ci-dessous)
// document.querySelector("#adresse").value = dataLocalStorageObjet.adresse;
// document.querySelector("#ville").value = dataLocalStorageObjet.ville;
// document.querySelector("#codepostal").value = dataLocalStorageObjet.codepostal;
// document.querySelector("#email").value = dataLocalStorageObjet.email;
console.log("dataLocalStorage")
console.log(dataLocalStorage)



    })
