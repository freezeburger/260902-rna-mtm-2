
# Redux Toolkit Simple SLice Setup

Deux domaines différents :

* `products` : des données métier
* `settings` : des préférences utilisateur
* un middleware qui observe les actions

### Structure

```text
src/
├── store.ts
├── productsSlice.ts
├── settingsSlice.ts
└── loggerMiddleware.ts
```

### `productsSlice.ts`

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Product = {
  id: number;
  name: string;
};

type ProductsState = {
  items: Product[];
};

const initialState: ProductsState = {
  items: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,

  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
    },

    removeProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        product => product.id !== action.payload
      );
    },
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
```

Ici, le slice gère uniquement :

```text
products
└── items
```

Et expose deux actions :

```ts
addProduct(product)
removeProduct(id)
```

---

### `settingsSlice.ts`

```ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
  username: string;
  defaultQuantity: number;
};

const initialState: SettingsState = {
  username: '',
  defaultQuantity: 1,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,

  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },

    setDefaultQuantity(state, action: PayloadAction<number>) {
      state.defaultQuantity = action.payload;
    },
  },
});

export const {
  setUsername,
  setDefaultQuantity,
} = settingsSlice.actions;

export default settingsSlice.reducer;
```

Le deuxième slice possède donc son propre état :

```text
settings
├── username
└── defaultQuantity
```

---

### Middleware custom

On garde volontairement quelque chose de très simple :

```ts
import { Middleware } from '@reduxjs/toolkit';

export const loggerMiddleware: Middleware =
  store => next => action => {

    console.log('Action :', action);

    const result = next(action);

    console.log('State :', store.getState());

    return result;
  };
```

Son rôle est d'intercepter le flux :

```text
dispatch(action)
      ↓
 middleware
      ↓
 reducer
      ↓
   nouveau state
```

`next(action)` est donc le point important : il laisse continuer l'action dans Redux.

---

### `store.ts`

```ts
import { configureStore } from '@reduxjs/toolkit';

import productsReducer from './productsSlice';
import settingsReducer from './settingsSlice';
import { loggerMiddleware } from './loggerMiddleware';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    settings: settingsReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

Le state Redux résultant ressemble à :

```ts
{
  products: {
    items: []
  },

  settings: {
    username: '',
    defaultQuantity: 1
  }
}
```

### Utilisation

```tsx
const dispatch = useDispatch();

dispatch(
  addProduct({
    id: 1,
    name: 'Keyboard'
  })
);

dispatch(setUsername('Renaud'));
```

Et pour lire les données :

```tsx
const products = useSelector(
  (state: RootState) => state.products.items
);

const username = useSelector(
  (state: RootState) => state.settings.username
);
```

### Le modèle mental à retenir

```text
                    STORE
                      │
          ┌───────────┴───────────┐
          │                       │
      products                settings
          │                       │
   productsSlice            settingsSlice
```

Une action suit ensuite ce chemin :

```text
Composant
   │
   │ dispatch(addProduct(...))
   ↓
Middleware
   ↓
productsSlice
   ↓
Store
   ↓
useSelector(...)
   ↓
Composant
```

> **Un slice possède une partie du state et définit les actions qui permettent de la modifier ; le store assemble les slices ; les middlewares observent ou enrichissent le passage des actions.**


