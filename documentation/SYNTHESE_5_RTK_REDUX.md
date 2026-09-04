## RTK Query s’inscrit **à l’intérieur de Redux Toolkit** comme la partie spécialisée dans la gestion des **données distantes / serveur**.

Le modèle mental le plus simple est :

```text
Redux Toolkit
│
├── createSlice()
│   └── état applicatif local
│       ex: utilisateur courant, préférences UI, panier, filtres...
│
└── RTK Query
    └── état provenant d'une API
        ex: produits, commandes, utilisateurs distants...
```

Avec un `slice` classique, **tu décris toi-même les mutations de l’état** :

```ts
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: []
  },

  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload)
    }
  }
})
```

Puis :

```ts
dispatch(addProduct(product))
```

Ici, la responsabilité est claire :

```text
Action
  ↓
Reducer
  ↓
State
```

RTK Query part d’un problème différent. Supposons que tu veuilles charger :

```http
GET /products
```

Sans RTK Query, tu pourrais créer un slice contenant :

```ts
{
  products: [],
  loading: false,
  error: null
}
```

puis gérer :

```text
request
   ↓
loading = true
   ↓
fetch()
   ↓
success / error
   ↓
mise à jour du slice
```

C’est précisément cette mécanique répétitive que RTK Query prend en charge.

Tu déclares plutôt **l’API** :

```ts
export const productsApi = createApi({
  reducerPath: 'productsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: '/api'
  }),

  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products'
    })
  })
})
```

RTK Query génère alors automatiquement une grosse partie de la mécanique Redux :

```text
createApi()
   │
   ├── actions
   ├── reducers
   ├── middleware
   ├── cache
   ├── gestion loading/error
   └── hooks React
```

Par exemple :

```ts
const {
  data,
  isLoading,
  error
} = useGetProductsQuery()
```

Conceptuellement, il y a donc toujours un **slice Redux derrière RTK Query**, mais c’est RTK Query qui le construit et le pilote.

Dans le store, la coexistence devient très visible :

```ts
const store = configureStore({
  reducer: {

    // slices métier classiques
    cart: cartReducer,
    settings: settingsReducer,

    // slice généré par RTK Query
    [productsApi.reducerPath]: productsApi.reducer
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
})
```

On peut donc imaginer le state Redux ainsi :

```ts
{
  cart: {
    items: [...]
  },

  settings: {
    username: 'Renaud'
  },

  productsApi: {
    queries: {...},
    mutations: {...},
    subscriptions: {...}
  }
}
```

La distinction importante est donc **moins "slice contre RTK Query" que "quel type d’état est-ce ?"** :

| État                        | Outil naturel |
| --------------------------- | ------------- |
| préférences UI              | `createSlice` |
| panier local                | `createSlice` |
| utilisateur sélectionné     | `createSlice` |
| filtres métier              | `createSlice` |
| résultat de `GET /products` | RTK Query     |
| chargement d'une commande   | RTK Query     |
| POST/PUT/DELETE vers API    | RTK Query     |

Et surtout, évite en général ceci :

```text
API
 ↓
RTK Query
 ↓
copie des données
 ↓
slice products
```

Cela crée deux sources de vérité.

Il vaut mieux :

```text
                  Redux Store
                      │
          ┌───────────┴───────────┐
          │                       │
    createSlice()             RTK Query
          │                       │
    état client              état serveur
          │                       │
    cart, UI...        products, orders...
```

La formule pédagogique que je retiendrais est donc :

> **`createSlice` gère ce que l’application possède.
> RTK Query gère ce que l’application va chercher.**

Et RTK Query ne remplace pas Redux Toolkit : **c’est une couche spécialisée de Redux Toolkit qui génère et administre elle-même ses slices, actions et middleware pour les données serveur.**
