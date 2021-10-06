/* Ensemble de fonctions permettant de rendre des éléments, de les afficher */
import { formattedPrice, addColorToElt } from "./utils.js";

// Variables
let divProducts = document.querySelector('#products');
let cart = localStorage.getItem('panier');
let ulElt = document.querySelector('.list-group');


/**
 * Affiche les Teddies dans la page index
 * @param teddies Un tableau de teddie
 */
 function renderTeddies(teddies) {

     //Parcours du tableau de teddies
     teddies.forEach(teddie => {
        // Afficher chaque teddies dans un élément article dans la section#products
        divProducts.innerHTML += `
            <article class="main__item--product col-12 col-md col-lg col-xl mb-3">
                <a href="./product.html?id=${teddie._id}">
                    <div class="product__item d-flex flex-column align-items-center">
                        <img class="product__item--img"
                            src="${teddie.imageUrl}"
                            alt="Peluche nommé ${teddie.name}"
                            width="275"
                            height="202"
                        >
                    <a href="./product.html?id=${teddie._id}" class="btn my-3">
                        Plus d'infos
                    </a>
                    </div>
                </a>
            </article>`;
    });
}

/**
 * Permet de créer les options de la balise select du produit à afficher
 * @param {*} options 
 */
 function createOptions(options) {
    
    // Sélection du select où l'on crée les options
    let selectElt = document.querySelector('#colors');
    // Parcourt du tableau options[]
    for (let i = 0; i <= options.length + 2; i++)
    {
        //Récupère la couleur correspondant à l'indice i
        let color = options.shift();
        //Création de l'élément option 
        let opt = new Option(color, color.toLowerCase().replace(' ', '-'));
        //Ajout de l'elément dans la balise select en tant qu'enfant
        selectElt.appendChild(opt);
    }
}

/**
 * Permet d'afficher le  produit Teddie dans la page produit.html
 * @param {Object} teddie
 */
 async function renderOneTeddie(teddie) {

    //Récupération du tableau de couleur du produit
    let colors = teddie.colors;
    
    //Modification du lien actif dans le menu
    let navActive = document.querySelector('.active');
    navActive.innerHTML = `${teddie.name}`;

    //Récupération de la section qui recevra l'affichage du produit
    let sectionProduct = document.querySelector('#product');

    //Ajout du produit dans la section de la page produit.html
    sectionProduct.innerHTML = `
        <article class="main__item--product row">
            <div class="product__item col-md-6 p-3 d-flex justify-content-center align-items-center">
                <img class="product__item--img rounded"
                     src="${teddie.imageUrl}"
                     alt="peluche"
                     width="275"
                     height="202"
                >
            </div>
            <div class="col-md-6 p-3">
                <p class="fw-bold fs-4">${teddie.name}</p>
                <p>${formattedPrice(teddie.price)} €</p>
                <p class="fs-6">
                    ${teddie.description}
                </p>
                <div class="w-75">
                    <select id="colors" class="form-select" aria-label="Sélection de la couleur de la peluche">
                        
                    </select>
                </div>
            </div>
            <div class="col-12 col-md-12 d-flex justify-content-center">
                <a id="btn-add" href="cart.html" class="btn product__item--btn my-3">
                    <span class="fs-5">Ajouter au panier</span> 
                </a>
            </div>
        </article>`;

    createOptions(colors);
}

/**
 * Permet de créer un élément "li" à insérer dans le DOM
 * @param {Object} product 
 * @returns {HTMLLIElement}
 */
function createProduct(product) {
    let cartElt = '';
    cartElt = `
        <li class="list-group-item d-flex justify-content-between product__item">
            <div class="d-flex">
                <img class="mr-3" src="${product.imageUrl}" alt="image d'une peluche" width="105" height="70">
                <p class="fs-6 infos__product mt-1 mb-0">
                    <span id="product-name" class="fw-bold">${product.name}</span> <br>
                    Prix : <span id="product-price">${formattedPrice(product.price)}</span> € <br>
                    <span id="product-color" class="infos__product--color">${product.color}</span>
                </p>
            </div>
            <div class="infos__product--qte mx-3 py-2">
                <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group-sm mr-2 d-none d-sm-block" role="group" aria-label="First group">
                    <button id="btn-moins" type="button" class="btn-cart btn-secondary">-</button>
                    </div>
                    <div class="input-group-sm product__qte--input">
                    <input id="input-qte" type="text" data-qty=${product.qty} class="form-control" value="${product.qty}">
                    </div>
                    <div class="btn-group-sm mr-2 d-none d-sm-block" role="group" aria-label="First group">
                        <button id="btn-plus" type="button" class="btn-cart btn-secondary">+</button>
                    </div>
                </div>
            </div>
            <div class="py-2 mx-2 info-product-price">
                <span id="cart-price">${(parseFloat(formattedPrice(product.price)) * product.qty).toFixed(2).replace('.', ',')}</span><span class="d-none d-sm-inline"> €</span>
            </div>
            <p class="py-2 product__delete" title="supprimer l'article">
            X
            </p>
        </li>`;
    
    return cartElt;
}

/**
 * Permet d'afficher les produits du panier dans l'élément "ul"  
 * de la page cart.html
 */
function renderCart() {

    let li = '';
    if (cart !== null) {
        let productsInCart = JSON.parse(cart);
        productsInCart.forEach(product => {
            li += createProduct(product);
        });
    }

    ulElt.innerHTML = li;
    addColorToElt();
}


export { renderTeddies, createOptions, renderOneTeddie, renderCart, createProduct };