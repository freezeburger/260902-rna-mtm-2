
### 1. Le problème que RTK Query cherche à résoudre

Avec Redux classique, récupérer des produits depuis une API peut conduire à gérer soi-même :

```text
Component
   ↓ dispatch
Thunk
   ↓
fetch("/products")
   ↓
Slice
 ├── data
 ├── loading
 └── error
   ↓
Component
```

Il faut donc souvent écrire :

```text
action → thunk → fetch → reducer → selector
```

Or une grande partie de ce code décrit toujours la même mécanique :

> « Appelle cette URL, conserve le résultat, indique si ça charge, mémorise les erreurs et évite de refaire inutilement la requête. »

RTK Query automatise précisément cette mécanique.

---

### 2. Le modèle mental essentiel

Avec RTK Query :

```text
API distante
    ↕
RTK Query
    ↕
Cache Redux
    ↕
Composant
```

Le composant ne demande plus vraiment :

> « Fais un `fetch`. »

Il exprime plutôt :

> **« J'ai besoin des données correspondant à cette requête. »**

Par exemple :

```tsx
const { data, isLoading, error } = useGetProductsQuery();
```

RTK Query détermine alors :

```text
Données déjà en cache ?
        │
   ┌────┴────┐
   oui       non
    │         │
 retourne    HTTP
 le cache     │
              ↓
           cache Redux
              │
              ↓
           composant
```

C'est probablement **le changement conceptuel le plus important**.

---

### 3. On commence par décrire une API

```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://example.com/api',
  }),

  endpoints: builder => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
  }),
});

export const {
  useGetProductsQuery,
} = productsApi;
```

Ici, on ne crée pas vraiment un service API traditionnel.

On **déclare les opérations disponibles** :

```text
productsApi
│
└── endpoints
     │
     └── getProducts
          │
          └── GET /products
```

Et RTK Query génère notamment le hook :

```ts
useGetProductsQuery()
```

---

### 4. `query` = lire des données

Dans un composant :

```tsx
function Products() {
  const {
    data,
    isLoading,
    error,
  } = useGetProductsQuery();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  return data?.map(product => (
    <Text key={product.id}>
      {product.name}
    </Text>
  ));
}
```

RTK Query fournit donc directement l'état associé à la requête :

```text
useGetProductsQuery()
        │
        ├── data
        ├── error
        ├── isLoading
        ├── isFetching
        ├── isSuccess
        ├── isError
        └── refetch()
```

Le `loading/error/data` que nous aurions probablement mis dans un slice est déjà pris en charge.

---

### 5. Une query avec paramètre

Supposons :

```http
GET /products/42
```

On déclare :

```ts
getProduct: builder.query({
  query: id => `/products/${id}`,
}),
```

Puis :

```tsx
const { data } = useGetProductQuery(42);
```

Le paramètre joue aussi un rôle dans **l'identité du cache**.

Conceptuellement :

```text
getProduct(12) → cache A
getProduct(42) → cache B
getProduct(99) → cache C
```

RTK Query raisonne donc beaucoup en :

```text
endpoint + arguments
```

---

### 6. `mutation` = provoquer une modification

Pour écrire sur le serveur :

```ts
addProduct: builder.mutation({
  query: product => ({
    url: '/products',
    method: 'POST',
    body: product,
  }),
}),
```

Utilisation :

```tsx
const [addProduct, result] =
  useAddProductMutation();
```

Puis :

```tsx
await addProduct({
  name: 'Coffee',
  price: 12,
});
```

La distinction fondamentale devient :

```text
QUERY                     MUTATION

Je veux une donnée        Je veux provoquer
du serveur                une modification

GET                       POST
                          PUT
                          PATCH
                          DELETE

useXxxQuery()             useXxxMutation()
```

---

### 7. Là où RTK Query devient réellement intéressant : le cache

Imaginons deux composants :

```tsx
function Home() {
  useGetProductsQuery();
}
```

et :

```tsx
function Products() {
  useGetProductsQuery();
}
```

Cela ne signifie pas nécessairement :

```text
GET /products
GET /products
```

RTK Query peut partager la donnée :

```text
             GET /products
                   ↓
              Cache RTK
              /       \
             /         \
          Home       Products
```

On commence alors à comprendre que RTK Query n'est **pas simplement un wrapper autour de `fetch`**.

C'est surtout un système de :

> **synchronisation entre l'état du serveur et les besoins des composants.**

---

### 8. Le deuxième mécanisme important : les tags

Supposons :

```text
GET /products
POST /products
```

Après un `POST`, notre liste en cache risque d'être obsolète.

RTK Query permet de déclarer :

```ts
getProducts: builder.query({
  query: () => '/products',
  providesTags: ['Products'],
}),
```

et :

```ts
addProduct: builder.mutation({
  query: product => ({
    url: '/products',
    method: 'POST',
    body: product,
  }),

  invalidatesTags: ['Products'],
}),
```

Ce qui donne :

```text
GET /products
     │
     ↓
cache [Products]
     │
     │
POST /products
     │
     ↓
invalidate [Products]
     │
     ↓
cache considéré obsolète
     │
     ↓
refetch si nécessaire
```

Les tags permettent donc de décrire **les dépendances entre données**, plutôt que d'orchestrer manuellement les rafraîchissements.

---

### 9. RTK Query par rapport aux slices

Il ne faut surtout pas conclure :

> « Avec RTK Query, les slices ne servent plus. »

Ils répondent à deux problèmes différents.

| État                            | Outil naturel |
| ------------------------------- | ------------- |
| utilisateur a ouvert un panneau | slice         |
| thème dark/light                | slice         |
| étape actuelle d'un wizard      | slice         |
| préférences locales             | slice         |
| produits provenant de l'API     | **RTK Query** |
| détail d'un produit distant     | **RTK Query** |
| résultat d'une recherche API    | **RTK Query** |

Une règle pédagogique assez efficace est :

```text
        ÉTAT DE L'APPLICATION
                │
       ┌────────┴─────────┐
       │                  │
  Client State       Server State
       │                  │
    slices            RTK Query
```

La frontière n'est pas absolue, mais c'est un **excellent premier modèle mental**.

---

### 10. En une phrase

Redux Toolkit classique permet de dire :

> **« Voici comment mon application change d'état. »**

RTK Query permet plutôt de dire :

> **« Voici les données serveur dont mon application dépend ; maintiens-les synchronisées pour moi. »**

Et la progression pédagogique que je retiendrais pour une formation serait :

```text
1. fetch manuel
      ↓
2. problème loading/data/error
      ↓
3. createApi
      ↓
4. endpoint
      ↓
5. query
      ↓
6. hooks générés
      ↓
7. cache
      ↓
8. mutation
      ↓
9. tags / invalidation
      ↓
10. seulement ensuite :
    refetch, polling,
    optimistic update,
    cache lifecycle...
```

> **RTK Query est d'abord un gestionnaire de cache/synchronisation et pas juste une manière plus courte d'écrire `fetch`** 
