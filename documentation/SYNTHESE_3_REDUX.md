# Redux Toolkit dans React Native

## Comprendre le modèle, utiliser les slices et maîtriser la complexité

---

# Objectif pédagogique

Redux Toolkit est aujourd'hui la manière officiellement recommandée d'utiliser Redux. Il fournit notamment `configureStore`, `createSlice`, Redux Thunk, Immer et plusieurs outils de contrôle destinés à réduire le code historiquement associé à Redux.

Mais une difficulté demeure :

> **Redux Toolkit réduit la verbosité technique de Redux, sans supprimer son modèle architectural.**

Avant d'utiliser les outils, il est donc préférable de comprendre **pourquoi une donnée devrait entrer dans Redux**.

Ce document suit trois temps :

```text
1. Comprendre
      ↓
   modèle mental

2. Construire
      ↓
   slices + middleware

3. Questionner
      ↓
   pièges + verbosité
```

---

# 1 — Modèle mental simplifié

## 1.1 Le problème que Redux cherche à résoudre

Dans React Native, un état local est parfaitement adapté lorsque l'information appartient à un composant.

```tsx
const [visible, setVisible] = useState(false);
```

Par exemple :

```text
Modal ouverte ?
Champ sélectionné ?
Onglet temporaire ?
Animation active ?
```

Mais certaines informations doivent être partagées entre plusieurs parties de l'application.

Exemple :

```text
Discover
    │
    │ favorite
    ▼
Favorites
    │
    │ order
    ▼
Order
```

Les trois écrans peuvent avoir besoin de connaître :

```text
produits favoris
commande courante
profil utilisateur
préférences globales
```

Sans état partagé, on risque progressivement :

```text
props
 ↓
props
 ↓
props
 ↓
props
```

ou plusieurs copies différentes de la même information.

Redux propose alors :

> **un emplacement central pour l'état réellement global de l'application.**

La documentation Redux insiste d'ailleurs sur un point souvent mal compris : tout l'état d'une application ne doit pas nécessairement être placé dans Redux. Les données locales doivent généralement rester près des composants qui les utilisent.

---

# 1.2 Le Store

Le cœur de Redux est le :

```text
STORE
```

On peut le voir comme :

```text
┌─────────────────────────────┐
│            STORE            │
│                             │
│ user                        │
│ favorites                   │
│ order                       │
│ settings                    │
└─────────────────────────────┘
```

Il contient l'état global Redux.

Dans une application standard, Redux recommande un seul store.

Avec Redux Toolkit :

```ts
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {}
});
```

`configureStore` configure notamment le store, les reducers, Redux Thunk et différents contrôles de développement.

---

# 1.3 React Native accède au Store par le Provider

Dans React, le store est fourni à l'arbre de composants :

```tsx
<Provider store={store}>
  <App />
</Provider>
```

Dans une application Expo Router, ce Provider peut par exemple se trouver au niveau du layout racine :

```tsx
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
```

On obtient conceptuellement :

```text
Provider
   │
   ▼
Application
   │
   ├── Discover
   ├── Favorites
   ├── Order
   └── Settings

Tous peuvent accéder
au même store Redux.
```

---

# 1.4 Redux fonctionne avec des événements

Un composant ne devrait pas dire directement :

```text
store.favorites = [...]
```

Il annonce plutôt :

> **« quelque chose s'est produit ».**

Cette information est représentée par une :

```text
ACTION
```

Par exemple :

```ts
{
  type: "favorites/productAdded",
  payload: product
}
```

Le nom raconte l'événement :

```text
favorites / productAdded
     │           │
     │           └── ce qui s'est produit
     │
     └── domaine concerné
```

---

# 1.5 Dispatch

Pour envoyer l'action au store :

```text
DISPATCH
```

Exemple conceptuel :

```tsx
dispatch(
  productAdded(product)
);
```

Le composant ne modifie pas le store.

Il dit :

```text
« Product 42 vient d'être ajouté
aux favoris »
```

---

# 1.6 Reducer

Le reducer détermine comment l'état doit évoluer en réponse à une action.

```text
état actuel
    +
  action
    ↓
 reducer
    ↓
nouvel état
```

Par exemple :

```ts
productAdded(state, action) {
  state.items.push(action.payload);
}
```

Cette écriture semble modifier directement `state`.

Mais `createSlice` utilise **Immer**, qui transforme cette syntaxe en mise à jour immutable. Redux recommande cette approche pour simplifier les mises à jour immutables.

Il faut donc comprendre :

```text
syntaxe mutative
      ≠
mutation réelle du store
```

---

# 1.7 Selector

Pour récupérer une information :

```text
SELECTOR
```

Par exemple :

```tsx
const favorites = useSelector(
  state => state.favorites.items
);
```

Le selector répond à la question :

> **Quelle partie de l'état m'intéresse ?**

On peut donc distinguer clairement :

```text
dispatch
   ↓
écrire / signaler

selector
   ↓
lire
```

---

# 1.8 La boucle complète Redux

Le modèle mental fondamental peut tenir dans cette boucle :

```text
        UTILISATEUR
             │
             ▼
        COMPOSANT
             │
          dispatch
             │
             ▼
           ACTION
             │
             ▼
        MIDDLEWARE
             │
             ▼
          REDUCER
             │
             ▼
           STORE
             │
          selector
             │
             ▼
        COMPOSANT
             │
             ▼
        UTILISATEUR
```

Exemple :

```text
♥ Press
   │
   ▼
dispatch(productAdded(product))
   │
   ▼
favorites/productAdded
   │
   ▼
favoritesReducer
   │
   ▼
store.favorites
   │
   ▼
useSelector(...)
   │
   ▼
FavoritesScreen se met à jour
```

---

# 1.9 Redux est un flux unidirectionnel

C'est probablement le principe le plus important.

```text
UI
 ↓
Action
 ↓
Reducer
 ↓
State
 ↓
UI
```

On évite :

```text
UI
 ↕
Service
 ↕
Store
 ↕
Autre composant
 ↕
Objet global
```

Le flux est prévisible parce qu'il possède une direction.

---

# 1.10 Le modèle mental minimal

Avant d'apprendre l'API Redux Toolkit, quatre mots suffisent :

| Concept  | Question                      |
| -------- | ----------------------------- |
| Store    | Où se trouve l'état partagé ? |
| Action   | Que vient-il de se produire ? |
| Reducer  | Comment l'état évolue-t-il ?  |
| Selector | Quelle donnée veux-je lire ?  |

On peut ajouter ensuite :

| Concept    | Fonction                           |
| ---------- | ---------------------------------- |
| Dispatch   | envoyer une action                 |
| Middleware | intervenir entre action et reducer |

---

# 2 — Slices et Middleware

# 2.1 Pourquoi les slices ?

Historiquement, Redux pouvait demander de définir séparément :

```text
action type
+
action creator
+
reducer
+
switch
+
state initial
```

Redux Toolkit rassemble ces éléments dans :

```text
createSlice()
```

Une slice représente une **partie fonctionnelle du store**.

Par exemple :

```text
STORE
│
├── user
├── favorites   ← slice
├── order       ← slice
└── settings    ← slice
```

Une slice n'est donc pas :

> un deuxième store.

C'est :

> **une portion du store et la logique Redux qui lui appartient.**

`createSlice` génère automatiquement les action creators et leurs types à partir des reducers déclarés.

---

# 2.2 Exemple : Favorites Slice

```ts
import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';

type Product = {
  id: number;
  name: string;
};

type FavoritesState = {
  items: Product[];
};

const initialState: FavoritesState = {
  items: []
};

const favoritesSlice = createSlice({
  name: 'favorites',

  initialState,

  reducers: {
    productAdded(
      state,
      action: PayloadAction<Product>
    ) {
      state.items.push(action.payload);
    },

    productRemoved(
      state,
      action: PayloadAction<number>
    ) {
      state.items = state.items.filter(
        product => product.id !== action.payload
      );
    }
  }
});
```

Redux Toolkit génère automatiquement :

```text
favorites/productAdded
favorites/productRemoved
```

ainsi que les fonctions :

```ts
favoritesSlice.actions.productAdded
favoritesSlice.actions.productRemoved
```

---

# 2.3 Exporter les actions et le reducer

Une convention fréquente :

```ts
export const {
  productAdded,
  productRemoved
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
```

On obtient deux usages différents :

```text
productAdded
     ↓
dispatch depuis l'application


favoritesSlice.reducer
     ↓
configuration du store
```

---

# 2.4 Ajouter la slice au store

```ts
import { configureStore } from '@reduxjs/toolkit';

import favoritesReducer
  from '../features/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  }
});
```

Cela produit :

```text
store
└── favorites
    └── items
```

Avec plusieurs slices :

```ts
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    order: orderReducer,
    settings: settingsReducer
  }
});
```

`configureStore` combine automatiquement les reducers lorsqu'on lui fournit cet objet.

---

# 2.5 Utiliser une slice dans React Native

## Lire

```tsx
const favorites = useSelector(
  (state: RootState) =>
    state.favorites.items
);
```

## Écrire

```tsx
const dispatch = useDispatch();

const handleFavorite = (
  product: Product
) => {
  dispatch(productAdded(product));
};
```

Le composant reste alors assez lisible :

```tsx
<Pressable
  onPress={() => handleFavorite(product)}
>
  <Text>Favorite</Text>
</Pressable>
```

---

# 2.6 Typage du store

Une configuration TypeScript standard peut dériver les types directement du store :

```ts
export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;
```

Cela évite de maintenir manuellement une deuxième définition de l'état global.

---

# 2.7 Une slice représente un domaine, pas un écran

Il peut être tentant de créer :

```text
discoverScreenSlice
favoritesScreenSlice
orderScreenSlice
settingsScreenSlice
```

Mais les écrans et les domaines métier ne sont pas nécessairement identiques.

On préférera souvent :

```text
products
favorites
orders
user
settings
```

car une même donnée peut être utilisée par plusieurs écrans.

### Mauvaise question

> Quelle slice dois-je créer pour cet écran ?

### Meilleure question

> Quel domaine d'état global suis-je en train de représenter ?

---

# 2.8 Le Middleware

Le middleware se situe entre :

```text
dispatch(action)
       │
       ▼
   MIDDLEWARE
       │
       ▼
    reducer
```

Il peut :

```text
observer l'action
modifier le traitement
déclencher un effet
envoyer une autre action
interrompre certains traitements
```

Le reducer doit rester sans effet de bord. Redux recommande explicitement que les reducers restent purs.

Ainsi :

```text
REDUCER
  ↓
modifier l'état Redux

MIDDLEWARE
  ↓
gérer les effets autour des actions
```

---

# 2.9 Les middleware sont déjà présents

Avec :

```ts
configureStore({
  reducer
});
```

Redux Toolkit configure déjà plusieurs middleware.

En développement, les valeurs par défaut actuelles comprennent notamment :

```text
actionCreatorInvariant
immutableStateInvariant
thunk
serializableStateInvariant
```

En production, Redux Thunk reste ajouté par défaut.

Cela signifie qu'une application simple n'a généralement **aucun middleware à configurer manuellement**.

---

# 2.10 Redux Thunk

Thunk permet notamment de dispatcher une fonction au lieu d'une simple action.

Cela permet :

```text
dispatch
   ↓
fonction async
   ↓
API
   ↓
dispatch
   ↓
action
```

Redux Toolkit installe Redux Thunk par défaut.

---

# 2.11 `createAsyncThunk`

Redux Toolkit propose également `createAsyncThunk` pour représenter une opération asynchrone avec un cycle :

```text
pending
   ↓
fulfilled

ou

rejected
```

Exemple :

```ts
export const loadProducts =
  createAsyncThunk(
    'products/load',
    async () => {
      const response =
        await fetch(API_URL);

      return response.json();
    }
  );
```

La slice peut ensuite réagir aux actions générées :

```ts
extraReducers: builder => {
  builder
    .addCase(
      loadProducts.pending,
      state => {
        state.loading = true;
      }
    )

    .addCase(
      loadProducts.fulfilled,
      (state, action) => {
        state.loading = false;
        state.items = action.payload;
      }
    )

    .addCase(
      loadProducts.rejected,
      state => {
        state.loading = false;
        state.error = true;
      }
    );
}
```

On retrouve notre modèle :

```text
loadProducts()
      │
      ▼
 pending
      │
      ▼
 requête
   ┌──┴───┐
   ▼      ▼
fulfilled rejected
```

---

# 2.12 Middleware personnalisé

Un middleware Redux possède conceptuellement cette forme :

```ts
const middleware =
  store =>
  next =>
  action => {
    // avant

    const result = next(action);

    // après

    return result;
  };
```

Le point important pédagogiquement n'est pas sa syntaxe.

C'est sa position :

```text
ACTION
  │
  ▼
middleware A
  │
  ▼
middleware B
  │
  ▼
REDUCER
```

---

# 2.13 À quoi peut servir un middleware ?

Exemples raisonnables :

```text
analytics
logging
persistence ciblée
synchronisation
gestion d'événements
orchestration asynchrone
```

Par exemple :

```text
orderPlaced
     │
     ├── reducer
     │      ↓
     │   commande validée
     │
     └── middleware
            ↓
        analytics
```

Cela permet de ne pas écrire l'analytics directement dans :

```text
OrderScreen
```

---

# 2.14 Listener Middleware

Redux Toolkit fournit également `createListenerMiddleware`.

Son modèle mental est intéressant :

```text
« Quand cette action arrive,
exécute cet effet. »
```

La documentation Redux Toolkit le compare conceptuellement à un `useEffect` réagissant aux modifications Redux plutôt qu'aux props et états d'un composant.

Exemple conceptuel :

```ts
listenerMiddleware.startListening({
  actionCreator: orderPlaced,

  effect: async (action, api) => {
    await saveOrder(action.payload);
  }
});
```

Cela peut être utile pour découpler :

```text
événement métier
        ↓
effets secondaires
```

---

# 2.15 Qui fait quoi ?

| Outil               | Responsabilité                      |
| ------------------- | ----------------------------------- |
| `createSlice`       | état + reducers + actions           |
| reducer             | calcul du nouvel état               |
| action              | décrit ce qui s'est produit         |
| selector            | lit l'état                          |
| thunk               | exécute une logique async commandée |
| middleware          | intercepte / observe les actions    |
| listener middleware | réagit à des événements Redux       |
| `configureStore`    | assemble l'ensemble                 |

---

# 2.16 Modèle architectural raisonnable

```text
features/
│
├── favorites/
│   ├── favoritesSlice.ts
│   ├── favoritesSelectors.ts
│   └── components/
│
├── orders/
│   ├── ordersSlice.ts
│   └── ordersSelectors.ts
│
└── products/
    ├── productsSlice.ts
    └── productsSelectors.ts

store/
├── store.ts
└── listenerMiddleware.ts
```

Il n'est cependant pas nécessaire de créer tous ces fichiers dès le premier jour.

La structure doit suivre la complexité réelle.

---

# 3 — Pièges et verbosité de Redux Toolkit

# 3.1 Redux Toolkit n'est pas nécessaire partout

C'est le premier piège.

Une modal :

```tsx
const [visible, setVisible] =
  useState(false);
```

n'a probablement aucune raison de devenir :

```text
modalSlice
+
openModal action
+
closeModal action
+
selector
+
dispatch
```

On aurait transformé :

```tsx
setVisible(true);
```

en plusieurs concepts.

---

# 3.2 Comparaison de verbosité

## État local

```tsx
const [quantity, setQuantity] =
  useState(1);

setQuantity(2);
```

## Redux Toolkit

```ts
const orderSlice = createSlice({
  name: 'order',

  initialState: {
    quantity: 1
  },

  reducers: {
    quantityChanged(
      state,
      action
    ) {
      state.quantity =
        action.payload;
    }
  }
});
```

puis :

```tsx
const quantity = useSelector(
  state => state.order.quantity
);

const dispatch = useDispatch();

dispatch(
  quantityChanged(2)
);
```

Redux Toolkit n'est donc pas :

> moins de code que `useState`.

Il est :

> **moins de code que Redux classique pour résoudre un problème d'état global.**

Cette distinction est essentielle.

---

# 3.3 Le coût réel : l'indirection

Avec `useState` :

```text
Button
  ↓
setValue
  ↓
value
```

Avec Redux :

```text
Button
  ↓
dispatch
  ↓
action
  ↓
middleware
  ↓
reducer
  ↓
store
  ↓
selector
  ↓
component
```

Redux ajoute donc une **indirection volontaire**.

Cette indirection devient utile lorsque plusieurs parties de l'application doivent comprendre et modifier le même état.

Elle devient coûteuse lorsqu'elle ne sert qu'à déplacer une variable.

---

# 3.4 Redux Toolkit réduit le boilerplate, pas le vocabulaire

Pour utiliser correctement Redux Toolkit, il faut comprendre :

```text
store
state
dispatch
action
payload
reducer
slice
selector
middleware
thunk
extraReducer
Immer
Provider
```

Puis éventuellement :

```text
listener
entityAdapter
RTK Query
memoized selector
```

Ainsi :

> **Redux Toolkit simplifie l'écriture de Redux mais conserve une charge cognitive importante.**

C'est souvent son principal coût pédagogique.

---

# 3.5 Tout mettre dans Redux

Anti-pattern fréquent :

```text
STORE
│
├── modalVisible
├── keyboardVisible
├── inputText
├── currentAnimation
├── scrollPosition
├── selectedTemporaryTab
├── navigationObject
└── ...
```

Le store devient alors une représentation de chaque détail de l'interface.

La documentation officielle recommande au contraire d'évaluer où chaque état doit vivre et de garder généralement les valeurs locales près de l'UI.

### Règle pratique

Mettre une donnée dans Redux devient intéressant si plusieurs de ces critères sont vrais :

```text
partagée ?
durable ?
utilisée loin de son origine ?
modifiée depuis plusieurs endroits ?
utile au debugging global ?
porteuse de sens métier ?
```

---

# 3.6 Stocker des objets non sérialisables

Redux recommande de ne pas stocker :

```text
functions
Promises
class instances
Map
Set
```

ou autres valeurs non sérialisables dans le state et les actions.

Dans React Native, il faut notamment être prudent avec :

```text
objet navigation
référence de composant
native handle
callback
Promise
instance de classe
```

À éviter :

```ts
state.navigation =
  navigation;
```

ou :

```ts
state.onComplete =
  () => {};
```

---

# 3.7 Pourquoi Redux Toolkit proteste parfois

`configureStore` active en développement un middleware qui vérifie notamment la sérialisabilité du state et des actions.

Ainsi, lorsqu'on voit :

```text
A non-serializable value
was detected...
```

le premier réflexe ne devrait pas être :

```ts
serializableCheck: false
```

mais :

> Pourquoi ai-je placé cette valeur dans Redux ?

Désactiver le contrôle peut masquer le symptôme sans résoudre le problème architectural.

---

# 3.8 L'illusion de mutation avec Immer

Dans un reducer créé par Redux Toolkit :

```ts
state.quantity++;
```

est valide.

Mais cela ne signifie pas :

> « Redux autorise maintenant les mutations partout ».

Ce comportement est rendu possible par Immer à l'intérieur des reducers concernés.

Ainsi :

```ts
state.quantity++;
```

dans un reducer RTK :

```text
OK
```

Mais modifier directement une valeur Redux depuis un composant :

```ts
order.quantity++;
```

reste une erreur conceptuelle.

---

# 3.9 Les reducers ne font pas d'I/O

À éviter :

```ts
reducers: {
  orderPlaced(state, action) {
    fetch('/api/order');
    state.status = 'done';
  }
}
```

Le reducer doit calculer l'état.

Les effets doivent être pris en charge ailleurs :

```text
Thunk
Middleware
Listener Middleware
RTK Query
Service appelé en amont
```

Redux stipule que les reducers ne doivent pas contenir d'effets de bord.

---

# 3.10 `extraReducers` peut devenir une seconde forêt

Au départ :

```ts
extraReducers: builder => {
  builder
    .addCase(load.pending, ...)
    .addCase(load.fulfilled, ...)
    .addCase(load.rejected, ...);
}
```

est très lisible.

Mais multiplier :

```text
loadProducts
refreshProducts
saveProduct
deleteProduct
loadFavorites
syncProducts
...
```

peut créer un bloc important.

La question devient alors :

> Sommes-nous encore en train de gérer de l'état métier, ou sommes-nous en train de reconstruire manuellement une infrastructure de données serveur ?

---

# 3.11 Attention à la donnée serveur

Imaginons :

```text
products
```

provenant exclusivement d'une API.

On peut construire manuellement :

```text
productsSlice
+
createAsyncThunk
+
loading
+
error
+
cache
+
refresh
+
retry
+
invalidation
```

Mais Redux Toolkit contient également **RTK Query**, destiné précisément à la récupération et au cache des données serveur.

RTK Query génère notamment sa propre slice et son middleware de gestion du cache.

Ainsi :

```text
État métier global
      ↓
createSlice

Données serveur / cache
      ↓
RTK Query
      ou
bibliothèque dédiée
```

est souvent une séparation plus pertinente.

---

# 3.12 Les selectors peuvent provoquer des rerenders inutiles

À éviter systématiquement :

```tsx
const data = useSelector(
  state => ({
    favorites:
      state.favorites.items,
    order:
      state.order
  })
);
```

Cette fonction crée potentiellement un nouvel objet à chaque exécution.

Il est souvent préférable de sélectionner directement les valeurs nécessaires :

```tsx
const favorites =
  useSelector(
    state =>
      state.favorites.items
  );

const order =
  useSelector(
    state =>
      state.order
  );
```

et d'utiliser des selectors mémorisés lorsque des calculs dérivés complexes le justifient.

---

# 3.13 Ne pas persister aveuglément tout le store

Sur mobile, il peut sembler séduisant de faire :

```text
STORE
  ↓
AsyncStorage
  ↓
STORE
```

pour absolument tout.

Mais certaines données peuvent être :

```text
obsolètes
volumineuses
sensibles
éphémères
recalculables
issues du serveur
```

On préférera réfléchir par slice ou par donnée :

| Donnée             | Persister ?              |
| ------------------ | ------------------------ |
| thème              | probablement             |
| préférences        | probablement             |
| panier local       | éventuellement           |
| modal ouverte      | non                      |
| position de scroll | rarement                 |
| cache API complet  | pas automatiquement      |
| mot de passe       | non                      |
| token sensible     | stockage sécurisé adapté |

---

# 3.14 Redux peut devenir un Event Bus déguisé

Les actions sont pratiques :

```ts
dispatch(orderPlaced());
```

Puis différents middleware peuvent réagir.

Mais si l'application commence à dispatcher des centaines d'actions uniquement pour faire communiquer des morceaux de code :

```text
ACTION
ACTION
ACTION
ACTION
ACTION
```

sans véritable modification d'état, Redux peut progressivement devenir un bus d'événements généraliste.

Cela peut être pertinent dans certains systèmes.

Mais cela doit être une décision architecturale consciente.

---

# 3.15 Middleware : ne pas résoudre tous les problèmes avec un middleware

Un middleware possède beaucoup de pouvoir :

```text
dispatch
getState
async
intercepter
transformer
redispatcher
```

Cette flexibilité est aussi un danger.

La documentation de `createListenerMiddleware` souligne elle-même que cette liberté est à la fois une force et une faiblesse : elle donne peu de garde-fous.

Avant de créer un middleware, demander :

```text
Est-ce un effet global ?

Est-il déclenché naturellement
par une action Redux ?

Doit-il être indépendant
de l'écran ?

Plusieurs fonctionnalités
doivent-elles y réagir ?
```

Sinon un simple service ou hook peut être plus lisible.

---

# 3.16 L'action doit raconter un événement

Moins expressif :

```ts
dispatch(
  setOrderStatus('done')
);
```

Plus métier :

```ts
dispatch(
  orderPlaced(order)
);
```

Pourquoi ?

Parce que :

```text
setOrderStatus
```

décrit une opération technique.

Alors que :

```text
orderPlaced
```

décrit ce qui s'est passé.

Cela devient particulièrement utile lorsqu'un middleware écoute les actions.

```text
orderPlaced
   ├── reducer → état
   ├── analytics
   ├── persistence
   └── notification
```

---

# 3.17 Éviter les slices géantes

Une slice comme :

```text
appSlice
```

contenant :

```text
user
products
favorites
orders
settings
notifications
theme
```

annule une partie de l'intérêt du découpage.

À l'inverse, créer :

```text
buttonSlice
modalSlice
headerSlice
```

fragmente inutilement le système.

Le bon niveau se situe généralement autour d'un :

> **domaine fonctionnel cohérent.**

---

# 3.18 Tableau des pièges

| Piège                               | Symptôme                  | Réflexe                         |
| ----------------------------------- | ------------------------- | ------------------------------- |
| Tout mettre dans Redux              | énorme store              | garder l'état UI local          |
| Une slice par écran                 | couplage navigation/store | découper par domaine            |
| Une slice globale                   | reducer gigantesque       | séparer les responsabilités     |
| Objet natif dans Redux              | erreur serializable       | stocker des données simples     |
| `serializableCheck: false` immédiat | masque le problème        | comprendre la donnée            |
| Fetch dans reducer                  | effets imprévisibles      | thunk/middleware/service        |
| Beaucoup de `extraReducers`         | code async massif         | questionner RTK Query           |
| Tout persister                      | état obsolète             | persister sélectivement         |
| Middleware partout                  | flux difficile à suivre   | réserver aux effets transverses |
| Selector complexe non mémorisé      | rerenders                 | selector adapté/mémorisé        |
| Redux pour un input                 | surarchitecture           | `useState`                      |
| Redux pour toute donnée serveur     | cache artisanal           | outil de server state           |

---

# 3.19 La question de la verbosité

Redux Toolkit résout une grande partie du boilerplate historique de Redux.

Il évite notamment de répéter manuellement :

```text
ACTION_TYPE
action creator
switch
immutable copy
combineReducers
store configuration
thunk configuration
DevTools configuration
```

C'est précisément l'une des raisons d'être de Redux Toolkit.

Mais il ajoute toujours une structure :

```text
slice
action
dispatch
selector
store
Provider
middleware
```

On peut donc formuler le compromis ainsi :

```text
Redux classique

VERBOSITÉ TECHNIQUE
████████████████████

MODÈLE CONCEPTUEL
████████████


Redux Toolkit

VERBOSITÉ TECHNIQUE
████████

MODÈLE CONCEPTUEL
████████████


useState

VERBOSITÉ TECHNIQUE
██

MODÈLE CONCEPTUEL
██
```

Redux Toolkit diminue surtout la première ligne.

Pas la seconde.

---

# 3.20 Quand Redux Toolkit devient pertinent

Redux Toolkit devient particulièrement intéressant lorsque l'application possède plusieurs caractéristiques comme :

```text
état partagé entre beaucoup d'écrans
+
transitions métier importantes
+
plusieurs sources de modification
+
besoin de traçabilité
+
effets transverses
+
application durable
```

Exemple :

```text
Favorites
Orders
User Session
Permissions métier
Workflow
Synchronisation
```

---

# 3.21 Quand Redux Toolkit est probablement excessif

Application :

```text
3 écrans
+
quelques appels API
+
état principalement local
```

avec :

```text
useState
Context ponctuel
hooks
bibliothèque de server state
```

peut très bien ne pas avoir besoin de Redux.

L'utilisation d'une bibliothèque ne devient pas une bonne pratique simplement parce qu'elle est standardisée.

---

# Tableau de décision

| Besoin                            | Premier choix à considérer      |
| --------------------------------- | ------------------------------- |
| état d'un composant               | `useState`                      |
| logique locale complexe           | `useReducer`                    |
| état partagé dans une petite zone | Context                         |
| état métier global                | Redux Toolkit                   |
| récupération/cache API            | RTK Query ou outil server-state |
| réaction globale à une action     | Listener Middleware             |
| opération async commandée         | Thunk                           |
| préférence persistante            | stockage local                  |
| secret utilisateur                | stockage sécurisé               |

Ce tableau n'est pas une règle absolue.

Il sert à éviter :

```text
Problème
   ↓
Redux
```

et à préférer :

```text
Problème
   ↓
nature du problème
   ↓
outil adapté
```

---

# Synthèse des trois temps

## Temps 1 — Le modèle

```text
UI
 │
dispatch
 │
 ▼
ACTION
 │
 ▼
REDUCER
 │
 ▼
STORE
 │
selector
 │
 ▼
UI
```

À comprendre avant toute API.

---

## Temps 2 — L'outillage

```text
configureStore
     │
     ├── slice
     │    ├── state
     │    ├── reducers
     │    └── actions
     │
     ├── middleware
     │
     └── thunk
```

Redux Toolkit industrialise le modèle Redux.

---

## Temps 3 — Le discernement

La question finale n'est pas :

> Comment mettre cette donnée dans Redux ?

Mais :

> **Cette donnée a-t-elle une raison suffisante d'être dans Redux ?**

---

# Les 10 réflexes à retenir

1. **Redux contient l'état global utile, pas tout l'état de React.**
2. **Une action décrit ce qui s'est produit.**
3. **Un reducer transforme l'état sans effet de bord.**
4. **Une slice représente un domaine cohérent du store.**
5. **Un selector lit uniquement les données nécessaires.**
6. **Le middleware appartient aux effets transverses autour des actions.**
7. **Thunk permet d'orchestrer de l'asynchrone ; il est déjà configuré par Redux Toolkit.**
8. **Les données Redux doivent rester principalement sérialisables.**
9. **RTK Query évite de reconstruire manuellement une grande partie de la gestion du server state.**
10. **Redux Toolkit réduit le boilerplate Redux ; il ne rend pas Redux conceptuellement gratuit.**

---

# Formule pédagogique finale

```text
React State
    ↓
« Mon composant a besoin
de mémoriser quelque chose. »


Redux Toolkit
    ↓
« Mon application a besoin
de partager et contrôler
un état commun. »
```

Et le principe essentiel :

> **Redux Toolkit est excellent lorsqu'on a un problème Redux.
> Le piège est de transformer chaque problème d'état en problème Redux.**
