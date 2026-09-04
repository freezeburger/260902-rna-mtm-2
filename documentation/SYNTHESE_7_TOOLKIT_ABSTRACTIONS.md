
# Abrastraction et complexité

Redux Toolkit simplifie énormément Redux, mais au prix de plusieurs **abstractions qui masquent des mécanismes Redux/JavaScript importants**.

| Abstraction RTK          | Ce qu’elle simplifie / masque                          | Complexité pédagogique introduite                          | Niveau        |
| ------------------------ | ------------------------------------------------------ | ---------------------------------------------------------- | ------------- |
| `configureStore()`       | `createStore`, `combineReducers`, middleware, DevTools | Beaucoup de configuration devient implicite                | 🟢 Faible     |
| `createSlice()`          | Actions + action creators + reducer                    | Un même objet fabrique plusieurs concepts Redux            | 🟢 Faible     |
| `slice.actions`          | Création manuelle des action creators                  | Les actions semblent « apparaître » automatiquement        | 🟢 Faible     |
| `slice.reducer`          | `switch(action.type)` classique                        | Le lien `action → reducer` devient moins visible           | 🟢 Faible     |
| **Immer**                | Immutabilité du state                                  | On écrit `state.value = x` alors que Redux reste immutable | 🟡 Importante |
| `PayloadAction<T>`       | Typage de `action.payload`                             | Ajoute une abstraction TypeScript propre à RTK             | 🟢 Faible     |
| Middleware par défaut    | thunk, contrôles d'immutabilité/sérialisation, etc.    | `configureStore` fait plus que ce que montre le code       | 🟡 Moyenne    |
| `getDefaultMiddleware()` | Construction de la chaîne middleware                   | Il faut comprendre pourquoi on fait `.concat(...)`         | 🟡 Moyenne    |
| `createAsyncThunk()`     | Cycle d'une opération async                            | Génère automatiquement `pending / fulfilled / rejected`    | 🟠 Forte      |
| `extraReducers`          | Réaction aux actions externes au slice                 | Sépare la définition d'une action de son traitement        | 🟠 Forte      |
| `createEntityAdapter()`  | Gestion de collections normalisées                     | Introduit une structure `ids/entities` abstraite           | 🟠 Forte      |
| `createSelector()`       | Mémoïsation des sélecteurs                             | Complexifie un simple accès au state                       | 🟡 Moyenne    |
| **RTK Query**            | Fetch, cache, loading, erreurs, invalidation           | Introduit presque un sous-système complet dans RTK         | 🔴 Forte      |
| `createApi()`            | Génération API Redux                                   | Génère reducer, middleware, actions, cache et hooks        | 🔴 Forte      |
| Tags RTK Query           | Invalidation du cache                                  | Concept indirect : `providesTags` / `invalidatesTags`      | 🔴 Forte      |

### Le point pédagogique principal

Je séparerais RTK en **trois couches** :

```text
Redux Toolkit
│
├── Couche 1 — Redux rendu confortable
│   ├── configureStore
│   ├── createSlice
│   └── PayloadAction
│
├── Couche 2 — Automatismes
│   ├── Immer
│   ├── middleware par défaut
│   ├── createAsyncThunk
│   └── extraReducers
│
└── Couche 3 — Sous-systèmes
    ├── createEntityAdapter
    ├── createSelector
    └── RTK Query
```

Pour une **première présentation pédagogique**, je limiterais donc volontairement Redux Toolkit à :

```ts
configureStore()
createSlice()
useSelector()
useDispatch()
custom middleware
```

Et je signalerais **une seule magie importante** dès le départ : **Immer**.

Car ce code :

```ts
setUsername(state, action) {
  state.username = action.payload;
}
```

semble muter le state, alors que conceptuellement Redux continue à produire :

```text
ancien state
    +
  action
    ↓
 reducer
    ↓
nouveau state
```

C'est probablement **l'abstraction RTK la plus importante à démystifier** avant de poursuivre vers `createAsyncThunk` puis RTK Query.