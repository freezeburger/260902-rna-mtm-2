## 2026-09-03

- **Fichier :** `AGENTS.md`
- **Description :** Ajout d'une règle imposant des modifications IA petites et
  ciblées, ainsi que leur traçabilité dans `AGENTS_LOG.md` avec une description
  et un commentaire Git suggéré.
- **Commentaire Git suggéré :** `docs: document AI change tracking rule`

## 2026-09-03

- **Fichier :** `AGENTS.md`
- **Description :** Ajout d'une règle demandant de générer d'abord tout code
  boilerplate avec la commande `$command` correspondante de
  `generate-react-cli.json`, afin de conserver les templates et conventions du
  projet.
- **Commentaire Git suggéré :** `docs: require boilerplate generation commands`

## 2026-09-03

- **Fichiers :** `src/components/Button/`
- **Description :** Génération du composant `Button` avec le template
  `generate-react-cli`, puis ajout d'un comportement pressable, des tailles
  `regular` et `small`, de l'état désactivé et des propriétés d'accessibilité.
- **Commentaire Git suggéré :** `feat: add reusable button component`

## 2026-09-03

- **Fichiers :**
  - `src/types/index.tsx`, `src/data/products.ts` (nouveau), `src/store/AppStateContext.tsx` (nouveau),
    `src/store/selectors.ts` (nouveau)
  - `src/hooks/AppState.hook.tsx`, `src/hooks/AppTheme.hook.tsx`, `src/hooks/DiscoverQueue.hook.tsx`,
    `src/hooks/OrderSummary.hook.tsx` (générés via `generate-react-cli` puis implémentés), `src/hooks/index.tsx`,
    `src/hooks/use-theme-color.ts`
  - `constants/theme.ts`
  - `src/components/{Header,ContentCard,SwipeCard,Fieldset,Input,Switch,NumericInput,Badge,ListItem,EmptyState}/*`
    (générés via `generate-react-cli component NAME --type=default` puis implémentés),
    `src/components/{Card,ActionButton,Title,Button,LongPressButton}/*` (finalisation des composants déjà générés)
  - `src/screens/{SplashScreen,LoginScreen,DiscoverScreen,FavoritesScreen,ProductsScreen,OrdersScreen,SettingsScreen}.tsx`
    (générés via `generate-react-cli component NAME --type=screen --flat` puis implémentés)
  - `app/index.tsx` (nouveau), `app/login.tsx` (nouveau), `app/_layout.tsx`,
    `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, `app/(tabs)/{favorites,products,orders,settings}.tsx` (nouveaux)
- **Description :** Implémentation complète du MVP Product Swipe conformément à
  `documentation/0_WORK_PLAN.md` et `documentation/0_APPLICATION.md` : état
  partagé (`AppStateContext` + reducer, sans dépendance ajoutée) pour le nom
  utilisateur, le catalogue produit local, les favoris, les produits ignorés,
  la progression de `Discover`, la commande en cours et l'historique des
  commandes ; thème clair/sombre cohérent piloté par un réglage utilisateur
  dans `Settings` (et non plus uniquement par le thème système) ; parcours
  `Splash → Login → (tabs)` avec les cinq onglets `Discover`, `Favorites`,
  `Products`, `Orders`, `Settings` ; `Discover` avec suivant / favori / ignorer
  (validation par appui long via `LongPressButton`) et état vide en fin de
  liste ; `Favorites` avec état vide et bouton `Order` ; `Products` en
  `FlatList` avec recherche et produits ignorés atténués ; `Orders` avec
  quantité, total calculé et confirmation ; `Settings` avec nom, quantité par
  défaut, notifications et mode sombre. Correction au passage des imports
  `@/hooks/*` restés incorrects après le déplacement des hooks vers
  `src/hooks`, tightly couplés au thème mis en place.
- **Commentaire Git suggéré :** `feat: implement Product Swipe MVP screens, shared state and theme`

## 2026-09-03

- **Fichiers :** `src/components/ListItem/`, `src/screens/ProductsScreen.tsx`
- **Description :** Ajout d'une révélation d'actions par glissement vers la
  gauche dans la liste des produits, avec les actions `Favorite`, `Order` et
  `Ignore` reliées à l'état partagé et au parcours de commande.
- **Commentaire Git suggéré :** `feat: add swipe actions to product list`

## 2026-09-03

- **Fichiers :** `src/screens/DiscoverScreen.tsx`, `src/components/ActionButton/`,
  `src/components/LongPressButton/`
- **Description :** Alignement des actions de découverte sur la maquette :
  boutons circulaires rouge, gris et bleu avec icônes flèche, fermeture et
  cœur, libellés sous les boutons et conservation de la validation par appui
  long pour ignorer.
- **Commentaire Git suggéré :** `feat: align discover actions with product swipe design`

## 2026-09-03

- **Fichiers :** `src/components/LongPressButton/`,
  `src/screens/OrdersScreen.tsx`, `src/screens/SettingsScreen.tsx`
- **Description :** Ajout d'une variante rectangulaire réutilisable du bouton
  d'appui long pour sécuriser `Place order` et `Save changes`, tandis que
  l'action circulaire reste utilisée sur `Discover`.
- **Commentaire Git suggéré :** `feat: require long press for order and settings confirmation`

## 2026-09-03

- **Fichiers :** `src/components/LongPressButton/`
- **Description :** Élargissement de la variante rectangulaire du bouton
  d'appui long afin qu'elle occupe toute la largeur disponible pour les actions
  `Place order` et `Save changes`, conformément à la maquette.
- **Commentaire Git suggéré :** `style: widen rectangular long press actions`

## 2026-09-03

- **Fichiers :** `src/screens/OrdersScreen.tsx`
- **Description :** Ajout de l'image du produit sélectionné dans l'écran de
  commande, avec présentation en ligne de l'image, du nom et du prix comme dans
  la maquette.
- **Commentaire Git suggéré :** `feat: show selected product image in orders`

## 2026-09-03

- **Fichiers :** `src/store/AppStateContext.tsx`, `src/components/ListItem/`,
  `src/screens/ProductsScreen.tsx`
- **Description :** Les produits ignorés ne sont plus glissables et n'affichent
  plus les actions de swipe. Ils proposent désormais uniquement une action
  visible `Unignore` pour retirer leur statut ignoré.
- **Commentaire Git suggéré :** `feat: replace ignored product swipe actions with unignore`

## 2026-09-03

- **Fichiers :** `src/components/SwipeCard/`, `src/screens/DiscoverScreen.tsx`
- **Description :** Ajout du swipe horizontal de la carte produit avec seuil
  `SWIPE_THRESHOLD` de 250, interpolation progressive du fond vers les couleurs
  gauche/droite, déclenchement des actions de navigation ou favori au-delà du
  seuil et retour élastique avec léger rebond lorsque le swipe est insuffisant.
- **Commentaire Git suggéré :** `feat: add thresholded horizontal product card swipe`

## 2026-09-03

- **Fichiers :** `src/components/SwipeCard/SwipeCard.tsx`
- **Description :** Remplacement de `react-native-reanimated` par l'API
  `Animated` native de React Native pour le swipe de la carte produit, en
  conservant l'interpolation des couleurs, le seuil de déclenchement et les
  animations de sortie, de rebond et de retour élastique.
- **Commentaire Git suggéré :** `refactor: use native animated API for swipe card`

## 2026-09-03

- **Fichiers :** `src/components/SwipeCard/SwipeCard.tsx`,
  `src/components/SwipeCard/SwipeCard.stylesheet.tsx`
- **Description :** Correction du rendu de l'image pendant le swipe en animant
  directement le composant `Card` plutôt qu'une enveloppe `Animated.View`, afin
  de conserver le conteneur d'image et sa mise en page intactes.
- **Commentaire Git suggéré :** `fix: preserve swipe card image rendering`

## 2026-09-03

- **Fichiers :** `src/components/SwipeCard/SwipeCard.tsx`
- **Description :** Correction du déclenchement des actions de swipe :
  l'action gauche ou droite est maintenant appelée immédiatement après le
  franchissement du seuil, avant l'animation de sortie, tandis qu'un swipe
  insuffisant conserve le retour élastique.
- **Commentaire Git suggéré :** `fix: trigger swipe actions before card exit animation`

## 2026-09-03

- **Fichiers :** `src/components/ListItem/`
- **Description :** Ajout d'une icône cœur visible à côté du nom des produits
  favoris dans la liste `Products`.
- **Commentaire Git suggéré :** `feat: show favorite icon in product list`

## 2026-09-03

- **Fichiers :** `src/store/AppStateContext.tsx`, `src/components/ListItem/`,
  `src/screens/ProductsScreen.tsx`
- **Description :** Ajout de l'action de swipe `Unfavorite` pour les produits
  déjà favoris dans `Products`, avec retrait du produit depuis l'état partagé
  et remplacement conditionnel de l'action `Favorite`.
- **Commentaire Git suggéré :** `feat: allow unfavoriting products from list`

## 2026-09-03

- **Fichiers :** `src/components/SwipeCard/SwipeCard.tsx`,
  `src/components/SwipeCard/SwipeCard.stylesheet.tsx`
- **Description :** Conservation de l'enveloppe animée nécessaire au swipe,
  avec une hauteur minimale, une largeur explicite et un conteneur masquant les
  débordements pour stabiliser le rendu de l'image et du contenu de la carte.
- **Commentaire Git suggéré :** `fix: stabilize swipe card image container`

## 2026-09-03

- **Fichiers :** `src/components/SwipeCard/SwipeCard.stylesheet.tsx`
- **Description :** Ajout d'une bordure gris clair et d'une ombre portée au
  conteneur de `SwipeCard` pour correspondre au rendu graphique de la maquette.
- **Commentaire Git suggéré :** `style: add border and shadow to swipe card`

## 2026-09-04

- **Fichiers :** `src/logic/root.store.ts`, `src/logic/notifications/notifications.slice.ts`,
  `src/logic/products/products.slice.ts`, `src/logic/settings/settings.slice.ts`
- **Description :** Ajout de slices Redux Toolkit CRUD isolés par domaine et
  d'un store racine, sans modifier l'entrée logique existante ni connecter les composants.
- **Commentaire Git suggéré :** `feat: add domain CRUD logic slices`

## 2026-09-04

- **Fichiers :** `src/logic/notifications/notifications.slice.ts`,
  `src/logic/products/products.slice.ts`, `src/logic/settings/settings.slice.ts`
- **Description :** Ajout de sélecteurs typés par domaine pour exposer les
  collections, les éléments par identifiant et les préférences.
- **Commentaire Git suggéré :** `feat: add domain slice selectors`

## 2026-09-04

- **Fichiers :** `src/logic/notifications/notifications.slice.ts`,
  `src/logic/products/products.slice.ts`, `src/logic/settings/settings.slice.ts`
- **Description :** Déplacement des sélecteurs dans la clé `selectors` des
  configurations `createSlice` et export des sélecteurs générés.
- **Commentaire Git suggéré :** `refactor: define selectors in domain slices`

## 2026-09-04

- **Fichiers :** `src/logic/notifications/notifications.slice.ts`,
  `src/logic/products/products.slice.ts`, `src/logic/settings/settings.slice.ts`
- **Description :** Ajout d'exemples commentés d'utilisation des sélecteurs dans
  les composants, sans connexion aux composants existants.
- **Commentaire Git suggéré :** `docs: add slice selector usage examples`

## 2026-09-04

- **Fichiers :** `src/logic/notifications/notifications.slice.ts`,
  `src/logic/products/products.slice.ts`, `src/logic/settings/settings.slice.ts`
- **Description :** Remplacement des exemples brefs par des commentaires de tête
  détaillant la sélection, le dispatch et l'abonnement hors React à chaque slice.
- **Commentaire Git suggéré :** `docs: explain domain slice consumption`

## 2026-09-04

- **Fichier :** `src/logic/root.store.ts`
- **Description :** Ajout du registre `logic` regroupant les actions et
  sélecteurs de chaque domaine sous une interface uniforme.
- **Commentaire Git suggéré :** `feat: expose normalized domain logic access`

## 2026-09-04

- **Fichiers :** `mock-api-data/data.json`, `src/logic/notifications/notifications.slice.ts`,
  `src/logic/root.store.ts`
- **Description :** Ajout d'un exemple `createAsyncThunk` postant une notification
  vers l'API mock, de la gestion pending/fulfilled/rejected et de son accès
  normalisé via `logic.notifications.thunks`.
- **Commentaire Git suggéré :** `feat: add notification async thunk example`

## 2026-09-04

- **Fichiers :** `src/logic/settings/settings.slice.ts`, `src/logic/root.store.ts`
- **Description :** Ajout de l'action dédiée `setUsername` et de son exposition
  via l'interface normalisée `logic.settings.actions`.
- **Commentaire Git suggéré :** `feat: add settings username action`

## 2026-09-04

- **Fichiers :** `package.json`, `package-lock.json`, `app/_layout.tsx`,
  `src/screens/LoginScreen.tsx`
- **Description :** Ajout du provider Redux au layout racine et connexion du
  login au store racine via `logic.settings.actions.setUsername`.
- **Commentaire Git suggéré :** `feat: connect login to root Redux store`

## 2026-09-04

- **Fichier :** `src/screens/SettingsScreen.tsx`
- **Description :** Connexion de l'écran Settings au store Redux racine avec les
  sélecteurs et actions `logic.settings`, en conservant les brouillons locaux.
- **Commentaire Git suggéré :** `feat: connect settings to root Redux store`

## 2026-09-04

- **Fichiers :** `app/_layout.tsx`, `src/hooks/AppTheme.hook.tsx`,
  `src/hooks/DiscoverQueue.hook.tsx`, `src/hooks/OrderSummary.hook.tsx`,
  `src/logic/orders/orders.slice.ts`, `src/logic/products/products.slice.ts`,
  `src/logic/root.store.ts`, `src/screens/{Splash,Discover,Favorites,Products,Orders}Screen.tsx`
- **Description :** Migration complète des écrans vers le store Redux racine,
  avec des domaines produits et commandes pour les interactions de découverte,
  favoris et commandes; suppression du provider de contexte obsolète.
- **Commentaire Git suggéré :** `refactor: migrate screens to root Redux store`
