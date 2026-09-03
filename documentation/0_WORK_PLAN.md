# Work Plan — Product Swipe

## 1. Objectif du projet

Construire une application mobile React Native avec Expo SDK permettant de
découvrir des produits, de les aimer ou de les ignorer, puis de préparer une
commande locale. L'interface doit suivre la maquette fonctionnelle :

- identité visuelle simple, claire et orientée mobile ;
- parcours d'entrée `Splash Screen` puis `Login / Username` ;
- navigation principale par cinq onglets : `Discover`, `Favorites`,
  `Products`, `Orders` et `Settings` ;
- actions accessibles au doigt, avec des états vides, des confirmations et
  des contrôles suffisamment grands.

Le périmètre reste volontairement local : aucune authentification réelle,
aucune API et aucun paiement ne sont nécessaires pour le MVP.

## 2. Découpage de réalisation

### Phase 1 — Initialisation et socle technique

- Créer ou nettoyer le projet Expo en TypeScript.
- Installer uniquement les dépendances compatibles avec le SDK utilisé.
- Configurer le point d'entrée, les Safe Areas, le thème visuel et les
  constantes de couleurs, espacements et typographies.
- Choisir une navigation par onglets (Expo Router recommandé) et séparer les
  routes légères des composants d'écran.
- Préparer une arborescence maintenable :

```text
app/
  _layout.tsx
  index.tsx                 # Splash ou redirection d'entrée
  login.tsx
  (tabs)/
    _layout.tsx
    discover.tsx
    favorites.tsx
    products.tsx
    orders.tsx
    settings.tsx
src/
  components/
  features/
  data/
  hooks/
  store/
  types/
  utils/
```

### Phase 2 — Modèle de données et état partagé

- Définir les types `Product`, `UserSettings`, `Order` et `AppState`.
- Ajouter un jeu de données local avec au minimum les produits illustrés dans
  la maquette : écouteurs sans fil, mug, bouteille et autres produits.
- Centraliser les données et actions qui doivent être cohérentes entre les
  écrans :
  - nom utilisateur ;
  - index ou produit courant dans `Discover` ;
  - identifiants favoris ;
  - identifiants ignorés ;
  - produit sélectionné pour une commande ;
  - quantité par défaut et quantité courante ;
  - commandes simulées.
- Utiliser un store Redux (ou l'abstraction retenue dans le projet) pour
  l'état métier partagé. Garder dans les écrans uniquement l'état d'interface
  local, comme la saisie temporaire d'un formulaire.
- Prévoir des sélecteurs dérivés pour les favoris, les produits ignorés, le
  total de commande et les listes vides, sans dupliquer ces valeurs dans
  l'état.

### Phase 3 — Composants graphiques réutilisables

Créer des composants génériques, indépendants des écrans :

- `Title` : titre typé et réutilisable pour les en-têtes ;
- `Header` : titre d'écran et actions éventuelles ;
- `Card` et `ContentCard` : conteneurs avec bordure, rayon et espacement
  cohérents ;
- `SwipeCard` : carte produit de `Discover` avec image, nom, description, prix
  et catégorie ;
- `Fieldset` et `Input` : libellés, valeur, focus et gestion du clavier ;
- `Button` : variantes `regular` et `small`, états désactivé et chargement ;
- `ActionButton` : actions rondes de la maquette (suivant, ignorer, favori) ;
- `LongPressValidation` : confirmation par appui long pour ignorer un produit ;
- `Switch` : icône, libellé et interrupteur pour les préférences ;
- `NumericInput` : diminution, valeur et augmentation de la quantité ;
- `Badge` : catégorie et statuts `Favorite` / `Ignored` ;
- `ListItem` : ligne produit compacte pour les listes ;
- `EmptyState` : message et action de sortie lorsqu'une liste est vide.

Chaque contrôle tactile important doit avoir un libellé d'accessibilité et une
zone d'interaction adaptée aux appareils mobiles.

### Phase 4 — Parcours d'entrée

#### Splash Screen

- Afficher le logo ou l'icône de sac, le nom `Product Swipe`, le slogan
  `Discover. Like. Order.` et un indicateur de chargement discret.
- Conserver l'écran assez longtemps pour être perceptible, puis naviguer vers
  le login sans bloquer l'application.

#### Login / Username

- Afficher `Welcome`, une explication courte et un champ `Username`.
- Désactiver `Continue` tant que le nom est vide ou composé uniquement
  d'espaces.
- Enregistrer le nom puis ouvrir les cinq onglets principaux.
- Gérer le clavier et éviter qu'il masque le champ ou le bouton.

### Phase 5 — Écrans principaux et règles métier

#### `Discover`

- Afficher un seul `SwipeCard` à la fois, centré dans l'écran.
- Proposer les actions `Left / Next`, `Ignore` et `Right / Favorite`.
- Le favori doit être ajouté immédiatement à l'état partagé.
- L'ignoré doit nécessiter une validation par appui long et rester identifiable
  dans `Products`.
- Passer au produit suivant après chaque action et afficher un état adapté
  lorsque tous les produits ont été traités.

#### `Favorites`

- Afficher les favoris sous forme de liste de `FavoriteItem` ou `ListItem`
  avec image, nom, prix et bouton `Order`.
- Le bouton `Order` sélectionne le produit et ouvre `Orders`.
- Prévoir un `EmptyState` explicite avec un renvoi vers `Discover`.

#### `Products`

- Afficher tous les produits dans une `FlatList` (pas de `ScrollView` avec
  `map`).
- Ajouter une recherche si elle est retenue par le périmètre de la maquette.
- Rendre les produits ignorés visibles mais atténués : opacité réduite, texte
  grisé et/ou badge `Ignored`.
- Afficher les statuts favori et ignoré sans perdre l'information produit.

#### `Orders`

- Afficher le produit sélectionné, son prix unitaire et un `NumericInput`.
- Initialiser la quantité avec `defaultOrderQuantity` des paramètres.
- Calculer `Total = prix unitaire × quantité` pendant le rendu.
- Désactiver ou sécuriser `Place order` lorsqu'aucun produit n'est sélectionné.
- Après validation, afficher une confirmation, enregistrer la commande locale
  et remettre l'écran dans un état cohérent.

#### `Settings`

- Permettre de modifier le nom utilisateur.
- Permettre de modifier `Default order quantity` avec contrôles adaptés.
- Ajouter les préférences visibles dans la maquette, notamment les switches
  de notifications et de mode sombre si elles sont incluses dans le MVP.
- Enregistrer les modifications via `Save changes` et les réutiliser dans
  `Orders`.

### Phase 6 — Finition UX et robustesse mobile

- Harmoniser les états `loading`, `error`, `empty` et `success` même si les
  données sont locales.
- Vérifier les Safe Areas, les tailles d'écran, l'orientation portrait et les
  contrastes.
- Ajouter des retours visuels aux pressions, à l'appui long, à l'ajout en
  favori et à la validation de commande.
- Vérifier que le changement d'onglet conserve l'état partagé sans réinitialiser
  les listes.
- Ajouter une persistance locale des préférences et de l'état métier seulement
  si elle est nécessaire au périmètre retenu.

### Phase 7 — Validation

- Tester manuellement le parcours complet :
  `Splash → Login → Discover → Favorite → Order`.
- Vérifier le parcours d'ignoré :
  `Discover → appui long → Products → produit atténué`.
- Vérifier que `Settings` modifie réellement le nom et la quantité utilisée
  dans `Orders`.
- Vérifier le cas sans favoris et le cas où tous les produits ont été traités.
- Tester sur émulateur et, si possible, sur un appareil réel.
- Exécuter `expo-doctor` et les vérifications TypeScript déjà prévues par le
  projet avant de considérer la fonctionnalité terminée.

## 3. Critères de fin du MVP

- Le projet démarre avec Expo sans erreur.
- Les deux écrans d'entrée sont visibles et correctement enchaînés.
- Les cinq onglets sont accessibles après la saisie du nom.
- `Discover` permet de passer, aimer et ignorer avec appui long.
- `Favorites` et `Products` reflètent le même état partagé.
- Les produits ignorés sont visibles et atténués dans `Products`.
- `Orders` calcule correctement le total et simule `Place order`.
- `Settings` influence le nom affiché et la quantité par défaut.
- Les interfaces vides, les contrôles tactiles et les Safe Areas sont traités.
- Les composants sont réutilisables et la logique métier n'est pas concentrée
  dans les routes.

## 4. Hors périmètre initial

- Authentification et gestion de mot de passe.
- Backend, catalogue distant et synchronisation réseau.
- Paiement réel et livraison.
- Notifications push réelles.
- Système e-commerce complet.

Ces éléments pourront être ajoutés ultérieurement sans remettre en cause le
socle du MVP.
