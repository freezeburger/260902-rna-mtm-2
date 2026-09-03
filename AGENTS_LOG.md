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
