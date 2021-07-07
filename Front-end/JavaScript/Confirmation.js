// Récupération de l'id de la commande provenant du serveur dans le localStorage
const responseOrderId = localStorage.getItem("responseOrderId");
console.log(`responseOrderId : ${responseOrderId}`);

// Récupération du prix total de la commande
const prixTotal = localStorage.getItem("prixTotal");
console.log(prixTotal)

// La structure HTML de la page commande produit confirmation
// Sélection élément du DOM pour positionnement 
const positionElement5 = document.querySelector("#container-recap-commande");

const structureConfirmationCommande = `
<h2 class="text-white">Récapitulatif de votre commande</h2>
            <div class="recapCommande">
                <p class="">Merci pour votre commande</p>
                <p class="text-white">Votre commande numéro : <span class="gras-one">${responseOrderId}</span> a bien été pris en compte</p>
                <p class="text-white">Le montant de votre commande est de : <span class="gras">${prixTotal}€</span></p>
                <p class="text-white">Au plaisir de vous revoir !</p>
            </div>`;

// Injection HTML
positionElement5.insertAdjacentHTML("afterbegin", structureConfirmationCommande); 

// Effacer tout le local storage sauf le formulaire
function enleverCleLocalStorage(key){
localStorage.removeItem(key); 
};

enleverCleLocalStorage("prixTotal");
enleverCleLocalStorage("produit");
enleverCleLocalStorage("responseOrderId");