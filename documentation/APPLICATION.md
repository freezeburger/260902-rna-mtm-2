# Exercice React Native — Application de consommation de produits

## Objectif général

L’objectif de cet exercice est de réaliser une application mobile React Native permettant de découvrir des produits, d’en ajouter certains en favoris, d’en ignorer d’autres, puis de préparer une commande simple.

L’application sera développée avec **Expo SDK**.

Elle mettra en pratique les notions suivantes :

* création d’une application mobile avec Expo ;
* navigation entre plusieurs écrans ;
* gestion d’un état applicatif simple ;
* manipulation de listes de produits ;
* interactions utilisateur tactiles ;
* validation par appui long avec `LongPressValidation` ;
* persistance minimale de préférences utilisateur ;
* structuration d’un projet React Native.

## Objectif de mise en place :

- Créer un projet React Native avec Expo ;
- Supprimer les fichiers inutiles ;
- Installer les dépendances nécessaires ;
- Créer les composants et écrans de l’application ;
- Implémenter la navigation entre les écrans ;
- Implémenter la logique de gestion des produits, favoris et commandes ;
- Tester l’application sur un émulateur ou un appareil physique.

## Apercu General de l'application:


Voici le résumé de la liste des écrans :

| Écran                | Rôle                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Splash Screen**    | Écran de démarrage de l’application avec logo, nom et transition vers le login.                              |
| **Login / Username** | Écran simple où l’utilisateur renseigne son nom, sans authentification réelle.                               |
| **Discover**         | Écran principal de découverte des produits en mode “Tinder-like” : suivant, favori, ignorer avec appui long. |
| **Favorites**        | Liste des produits ajoutés aux favoris, avec un bouton pour commander un produit.                            |
| **Products**         | Liste complète de tous les produits, avec les produits ignorés affichés en atténué.                          |
| **Orders**           | Écran de préparation de commande : produit, quantité, total calculé et bouton “Place order”.                 |
| **Settings**         | Écran de réglages : nom utilisateur et quantité par défaut pour les commandes.                               |

Donc au total : **7 écrans**, dont **2 écrans d’entrée** et **5 écrans principaux**.

La navigation principale après le login peut être organisée ainsi :

```txt
Tabs
├── Discover
├── Favorites
├── Products
├── Orders
└── Settings
```


---

## Contexte fonctionnel

L’utilisateur ouvre l’application, renseigne son nom, puis accède à une interface composée de plusieurs écrans.

Il peut :

* découvrir des produits un par un ;
* passer au produit suivant ;
* ajouter un produit aux favoris ;
* ignorer un produit avec une validation par appui long ;
* consulter la liste complète des produits ;
* visualiser les produits ignorés ;
* consulter ses produits favoris ;
* préparer une commande ;
* régler son nom utilisateur et une quantité de commande par défaut.

---

## Contraintes techniques

Le projet devra utiliser :

* React Native ;
* Expo SDK ;
* TypeScript recommandé ;
* une navigation entre écrans ;
* un état partagé entre plusieurs écrans ;
* des composants réutilisables ;
* un écran de splash screen ;
* un composant `LongPressValidation`.

La logique backend n’est pas attendue.
Les produits peuvent être fournis par un tableau local ou un fichier JSON local.

---

## Parcours utilisateur attendu

### 1. Splash Screen

Au lancement de l’application, un écran de démarrage doit être affiché.

Cet écran peut contenir :

* le nom de l’application ;
* un logo ou une icône ;
* un court message d’accueil ;
* une transition vers l’écran de renseignement utilisateur.

Exemple :

```txt
Product Swipe
Discover. Like. Order.
```

---

### 2. Écran de renseignement utilisateur

L’utilisateur doit renseigner son nom avant d’accéder à l’application.

Cet écran correspond à un login simplifié, sans authentification réelle.

Champs attendus :

* nom utilisateur.

Action attendue :

* bouton `Start` ou `Continue`.

Règles :

* si le nom est vide, le bouton peut être désactivé ;
* aucune logique de mot de passe n’est demandée ;
* aucune requête serveur n’est attendue.

---

## Écrans principaux

Après le renseignement du nom utilisateur, l’application donne accès aux écrans suivants :

1. `Discover`
2. `Favorites`
3. `Products`
4. `Orders`
5. `Settings`

Une navigation par onglets est recommandée.

---

# 1. Écran Discover

## Objectif

L’écran `Discover` permet à l’utilisateur de découvrir les produits un par un, dans une logique proche de Tinder.

Un seul produit est affiché à la fois.

## Contenu affiché

Pour chaque produit, afficher au minimum :

* image du produit ;
* nom du produit ;
* description courte ;
* prix ;
* catégorie éventuelle.

## Actions utilisateur

L’utilisateur peut effectuer trois actions :

### Action gauche : produit suivant

L’action vers la gauche permet de passer au produit suivant sans autre effet.

Exemple :

```txt
Left / Next
```

Le produit n’est ni ajouté aux favoris, ni ignoré.

---

### Action droite : ajouter aux favoris

L’action vers la droite ajoute le produit courant à la liste des favoris.

Exemple :

```txt
Right / Favorite
```

Une fois ajouté aux favoris, l’application passe au produit suivant.

---

### Action longue : ignorer le produit

L’action `Ignore` doit être protégée par un composant `LongPressValidation`.

L’utilisateur ne doit pas ignorer un produit par simple clic rapide.

Il doit maintenir son appui pendant une durée définie pour valider l’action.

Exemple de comportement :

```txt
Appui court : rien ne se passe
Appui long : le produit est marqué comme ignoré
```

Une fois ignoré, le produit reste visible dans la liste complète des produits, mais avec un affichage atténué.

---

# 2. Écran Favorites

## Objectif

L’écran `Favorites` affiche la liste des produits ajoutés aux favoris.

## Contenu affiché

Pour chaque produit favori :

* nom du produit ;
* image ;
* prix ;
* quantité par défaut éventuelle ;
* bouton de commande.

## Action principale

Chaque produit favori doit proposer un bouton :

```txt
Order
```

Ce bouton permet d’envoyer le produit vers l’écran `Orders`.

## Cas vide

Si aucun produit n’est en favori, afficher un message clair.

Exemple :

```txt
No favorite products yet.
Go to Discover to add some products.
```

---

# 3. Écran Products

## Objectif

L’écran `Products` affiche la liste complète des produits disponibles.

Contrairement à l’écran `Discover`, tous les produits sont visibles dans une liste classique.

## Contenu affiché

Pour chaque produit :

* nom ;
* image ;
* description courte ;
* prix ;
* statut éventuel : favori ou ignoré.

## Règle d’affichage des produits ignorés

Les produits ignorés doivent rester visibles, mais avec un style atténué.

Exemples de rendu possible :

* opacité réduite ;
* texte grisé ;
* badge `Ignored` ;
* bouton désactivé.

Exemple :

```txt
[Ignored] Wireless Headphones
```

## Objectif pédagogique

Cet écran permet de vérifier que les actions réalisées dans `Discover` modifient bien l’état global de l’application.

---

# 4. Écran Orders

## Objectif

L’écran `Orders` permet de préparer une commande à partir d’un produit sélectionné.

## Contenu attendu

L’écran doit afficher :

* le produit sélectionné ;
* son prix unitaire ;
* une quantité modifiable ;
* le total calculé ;
* un bouton de validation de commande.

## Calcul attendu

Le total doit être calculé ainsi :

```txt
Total = prix du produit × quantité
```

Exemple :

```txt
Product: Coffee Mug
Unit price: 12 €
Quantity: 3
Total: 36 €
```

## Action attendue

Un bouton doit permettre de simuler la commande :

```txt
Place order
```

Aucune requête backend n’est attendue.

Après validation, l’application peut :

* afficher un message de confirmation ;
* vider le produit sélectionné ;
* ajouter la commande à une liste locale ;
* revenir à l’écran `Favorites`.

---

# 5. Écran Settings

## Objectif

L’écran `Settings` permet à l’utilisateur de modifier ses préférences simples.

## Champs attendus

L’écran doit contenir :

### Username

L’utilisateur peut modifier son nom.

```txt
Username: Renaud
```

### Default order quantity

L’utilisateur peut choisir une quantité par défaut pour les commandes.

```txt
Default order quantity: 1
```

Cette quantité par défaut doit être utilisée lors de l’ouverture de l’écran `Orders`.

---

## Modèle de données proposé

### Product

```ts
type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail?: string;
  category?: string;
};
```

### UserSettings

```ts
type UserSettings = {
  username: string;
  defaultOrderQuantity: number;
};
```

### Order

```ts
type Order = {
  id: string;
  productId: string;
  quantity: number;
  total: number;
  createdAt: string;
};
```

### AppState

```ts
type AppState = {
  username: string;
  products: Product[];
  favoriteProductIds: string[];
  ignoredProductIds: string[];
  selectedProductId?: string;
  defaultOrderQuantity: number;
  orders: Order[];
};
```

---

## Exemple de données produits

```ts
export const products: Product[] = [
  {
    id: "p1",
    title: "Wireless Headphones",
    description: "Comfortable Bluetooth headphones with noise reduction.",
    price: 79,
    thumbnail: "https://example.com/headphones.png",
    category: "Audio",
  },
  {
    id: "p2",
    title: "Coffee Mug",
    description: "A ceramic mug for your daily coffee.",
    price: 12,
    thumbnail: "https://example.com/mug.png",
    category: "Kitchen",
  },
  {
    id: "p3",
    title: "Notebook",
    description: "A simple notebook for ideas and sketches.",
    price: 8,
    thumbnail: "https://example.com/notebook.png",
    category: "Office",
  },
];
```

---

## Composants recommandés

Le projet peut être découpé avec les composants suivants :

```txt
/components
  ProductCard.tsx
  ProductListItem.tsx
  LongPressValidation.tsx
  EmptyState.tsx
  QuantitySelector.tsx

/screens
  SplashScreen.tsx
  LoginScreen.tsx
  DiscoverScreen.tsx
  FavoritesScreen.tsx
  ProductsScreen.tsx
  OrdersScreen.tsx
  SettingsScreen.tsx

/data
  products.ts

/types
  product.ts
  order.ts
  settings.ts
```

---

## Fonctionnalités attendues

## Niveau 1 — Application minimale

L’application doit permettre de :

* afficher un splash screen ;
* renseigner un nom utilisateur ;
* naviguer entre les écrans principaux ;
* afficher une liste de produits ;
* afficher un produit dans l’écran `Discover`.

---

## Niveau 2 — Interactions produit

L’application doit permettre de :

* passer au produit suivant ;
* ajouter un produit aux favoris ;
* ignorer un produit avec un appui long ;
* afficher les favoris ;
* afficher les produits ignorés avec un style atténué.

---

## Niveau 3 — Commande

L’application doit permettre de :

* sélectionner un produit favori ;
* ouvrir l’écran `Orders` ;
* modifier une quantité ;
* calculer le total ;
* simuler une commande avec `Place order`.

---

## Niveau 4 — Paramètres utilisateur

L’application doit permettre de :

* modifier le nom utilisateur ;
* modifier la quantité de commande par défaut ;
* utiliser cette quantité par défaut dans l’écran `Orders`.

---

## Critères de réussite

L’exercice est réussi si :

* l’application démarre correctement avec Expo ;
* le splash screen est visible ;
* l’utilisateur peut renseigner son nom ;
* la navigation entre les écrans fonctionne ;
* les produits peuvent être consultés ;
* un produit peut être ajouté aux favoris ;
* un produit peut être ignoré uniquement avec un appui long ;
* les produits ignorés sont visuellement atténués dans la liste complète ;
* les favoris peuvent être commandés ;
* le total de commande est correctement calculé ;
* les paramètres utilisateur influencent l’application.

---

## Bonus possibles

Pour aller plus loin, il est possible d’ajouter :

* persistance locale avec `AsyncStorage` ;
* animation de swipe ;
* badge visuel pour les favoris ;
* historique des commandes ;
* suppression d’un favori ;
* réinitialisation des produits ignorés ;
* mode sombre ;
* filtres par catégorie ;
* recherche dans les produits ;
* message de confirmation après commande.

---

## Contraintes pédagogiques

Le but de l’exercice n’est pas de produire une application complète de e-commerce.

Le but est de travailler :

* la structuration d’une application React Native ;
* les écrans ;
* la navigation ;
* l’état partagé ;
* les interactions tactiles ;
* la composition de composants ;
* la logique métier simple côté front.

L’application peut rester entièrement locale.
