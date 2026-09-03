# React Native + Expo SDK — Bonnes pratiques concrètes

## Objectif

Ce document complète la présentation générale de React Native et Expo SDK avec une approche volontairement pratique :

> **Pratique → Pourquoi → Mauvais exemple → Bonne approche**

L'objectif n'est pas d'imposer des règles absolues, mais de fournir des **réflexes de développement** adaptés à une application mobile React Native moderne.

---

# 1. Utiliser le bon composant pour une liste

## Pratique

Utiliser :

* `ScrollView` pour une petite quantité de contenu ;
* `FlatList` pour une collection potentiellement importante ;
* `SectionList` lorsque les données sont regroupées par sections.

## Pourquoi ?

`ScrollView` rend généralement tous ses enfants.

Pour une longue liste, cela peut entraîner :

* consommation mémoire ;
* temps de rendu initial élevé ;
* ralentissements ;
* mauvaise fluidité.

`FlatList` fournit au contraire une stratégie de rendu virtualisé adaptée aux collections. React Native recommande également `getItemLayout` lorsque la taille des éléments est prévisible afin d'éviter certaines mesures au runtime.

### À éviter

```tsx
<ScrollView>
  {products.map(product => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ))}
</ScrollView>
```

pour plusieurs centaines de produits.

### Préférer

```tsx
<FlatList
  data={products}
  keyExtractor={product => product.id}
  renderItem={({ item }) => (
    <ProductCard product={item} />
  )}
/>
```

### À retenir

> **Collection importante = penser virtualisation.**

---

# 2. Ne pas mettre toute la logique dans les écrans

## Pratique

Un écran doit principalement :

1. orchestrer ;
2. récupérer les données nécessaires ;
3. composer les composants ;
4. gérer les interactions propres à l'écran.

Il ne devrait pas concentrer toute l'application.

### À éviter

```tsx
function ProductsScreen() {
  // fetch
  // mapping
  // tri
  // filtre
  // validation
  // navigation
  // stockage
  // analytics
  // 250 lignes de JSX...
}
```

### Préférer

```text
ProductsScreen
│
├── useProducts()
├── ProductFilters
├── ProductList
│   └── ProductCard
│
└── EmptyProducts
```

Exemple :

```tsx
function ProductsScreen() {
  const {
    products,
    loading,
    filter,
    setFilter,
  } = useProducts();

  return (
    <>
      <ProductFilters
        value={filter}
        onChange={setFilter}
      />

      <ProductList
        products={products}
        loading={loading}
      />
    </>
  );
}
```

### À retenir

> **L'écran compose ; les composants affichent ; les hooks orchestrent la logique réutilisable.**

---

# 3. Garder l'état au plus près de son utilisation

## Pratique

Ne pas transformer automatiquement chaque donnée en état global.

Avant de créer un store, demander :

> Qui a réellement besoin de cette information ?

## Exemple

L'ouverture d'une modal :

```tsx
const [visible, setVisible] = useState(false);
```

appartient probablement au composant concerné.

Le panier partagé entre plusieurs écrans :

```text
Discover
Favorites
Order
```

peut, lui, justifier un état partagé.

## Une hiérarchie utile

```text
État composant
      ↓
État écran
      ↓
Context / feature
      ↓
Store global
```

On descend seulement lorsque cela devient nécessaire.

### À éviter

```text
Redux / Zustand / autre store
        ↑
      absolument tout
```

### À retenir

> **Globaliser tard plutôt que globaliser par défaut.**

---

# 4. Ne pas utiliser `useEffect` comme couteau suisse

## Pratique

`useEffect` sert principalement à synchroniser React avec un système extérieur.

Par exemple :

```text
React
  ↕
API externe
subscription
timer
événement natif
```

Il ne doit pas devenir l'endroit où toute logique applicative est exécutée.

### À éviter

```tsx
useEffect(() => {
  const filtered = products.filter(...);
  setFilteredProducts(filtered);
}, [products, filter]);
```

Ici, `filteredProducts` peut être calculé directement.

### Préférer

```tsx
const filteredProducts = products.filter(product =>
  product.name.includes(filter)
);
```

ou éventuellement :

```tsx
const filteredProducts = useMemo(
  () =>
    products.filter(product =>
      product.name.includes(filter)
    ),
  [products, filter]
);
```

si le calcul est suffisamment coûteux pour le justifier.

### À retenir

> **Si une valeur peut être calculée pendant le rendu, elle n'a généralement pas besoin d'un `useEffect`.**

---

# 5. Ne pas mémoriser tout systématiquement

`useMemo`, `useCallback` et `memo` sont des outils d'optimisation.

Ils ne doivent pas devenir du bruit syntaxique.

### À éviter

```tsx
const title = useMemo(
  () => product.name,
  [product.name]
);
```

### Préférer

```tsx
const title = product.name;
```

La mémorisation devient pertinente lorsque :

* un calcul est réellement coûteux ;
* une référence stable est importante ;
* un composant optimisé en dépend ;
* une mesure de performance montre un problème.

### À retenir

> **Optimiser une cause mesurée, pas une inquiétude hypothétique.**

---

# 6. Séparer données serveur et état d'interface

Une donnée provenant d'une API n'a pas exactement la même nature qu'un état UI.

```text
Modal ouverte
      ≠
Liste des produits provenant du serveur
```

Les données serveur possèdent généralement des problématiques supplémentaires :

```text
chargement
cache
erreur
refresh
stale data
retry
synchronisation
```

Une architecture simple peut commencer ainsi :

```text
Screen
   ↓
Hook métier
   ↓
Service API
   ↓
fetch
```

Exemple :

```ts
export async function getProducts() {
  const response = await fetch(
    `${API_URL}/products`
  );

  if (!response.ok) {
    throw new Error("Unable to load products");
  }

  return response.json();
}
```

Puis :

```tsx
const products = await getProducts();
```

### À retenir

> **Le composant ne devrait pas connaître les détails HTTP lorsque ce n'est pas nécessaire.**

---

# 7. Toujours représenter les états d'une requête

Une interface dépendante d'une API possède rarement seulement deux états :

```text
données
pas de données
```

Elle possède plutôt :

```text
idle
 ↓
loading
 ↓
success
   ├── data
   └── empty

ou

error
```

Une bonne interface doit donc pouvoir représenter :

```tsx
if (loading) {
  return <LoadingView />;
}

if (error) {
  return <ErrorView />;
}

if (products.length === 0) {
  return <EmptyView />;
}

return <ProductList products={products} />;
```

### À retenir

> **Loading, Error et Empty font partie de l'écran.**

Ce ne sont pas des cas exceptionnels.

---

# 8. Penser aux interactions tactiles

Sur mobile :

```text
hover
```

n'existe pas comme interaction principale.

L'utilisateur :

```text
tap
long press
swipe
drag
pinch
```

Il faut donc utiliser des composants et interactions conçus pour le tactile.

Par exemple :

```tsx
<Pressable
  onPress={handlePress}
>
  <Text>Add to favorites</Text>
</Pressable>
```

Un `Pressable` permet également de représenter différents états :

```tsx
<Pressable>
  {({ pressed }) => (
    <Text>
      {pressed ? "Adding..." : "Add"}
    </Text>
  )}
</Pressable>
```

### À retenir

> **Une interaction mobile doit être pensée avec le doigt, pas avec la souris.**

---

# 9. Prévoir une surface tactile suffisante

Une icône visuellement petite peut être difficile à utiliser.

Par exemple :

```tsx
<Pressable
  hitSlop={10}
  onPress={removeProduct}
>
  <TrashIcon />
</Pressable>
```

`hitSlop` permet d'augmenter la zone interactive sans nécessairement agrandir visuellement l'élément.

Cela améliore :

* ergonomie ;
* accessibilité ;
* tolérance aux mouvements.

---

# 10. Ne pas utiliser uniquement la couleur pour transmettre une information

À éviter :

```text
Vert = validé
Rouge = erreur
```

sans autre indication.

Préférer :

```text
✓ Validé

⚠ Erreur
```

avec :

```text
couleur
+
icône
+
texte
```

La couleur devient alors une information complémentaire et non le seul vecteur de sens.

---

# 11. Prévoir l'accessibilité dès le composant

Une interface accessible est plus simple à maintenir lorsqu'elle est conçue ainsi dès le départ.

Exemple :

```tsx
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Add product to favorites"
  onPress={addFavorite}
>
  <HeartIcon />
</Pressable>
```

Sans label, un lecteur d'écran pourrait simplement annoncer quelque chose comme :

```text
button
```

Avec un label :

```text
Add product to favorites, button
```

### À retenir

> **Si l'interface utilise uniquement une icône, demander ce qu'un utilisateur ne voyant pas l'icône doit entendre.**

---

# 12. Prendre en compte les Safe Areas

Les téléphones possèdent désormais différents éléments physiques et système :

```text
notch
dynamic island
status bar
navigation bar
rounded corners
```

Le contenu principal ne devrait donc pas supposer que tout l'écran est utilisable.

On utilise généralement une gestion appropriée des safe areas au niveau de la structure de l'application ou des écrans concernés.

### Mauvais modèle mental

```text
écran = rectangle entièrement disponible
```

### Bon modèle mental

```text
écran physique
┌──────────────────────┐
│ zone système         │
│ ┌──────────────────┐ │
│ │ contenu utile    │ │
│ └──────────────────┘ │
│ zone système         │
└──────────────────────┘
```

---

# 13. Penser au clavier

Un formulaire mobile doit gérer l'apparition du clavier.

Sinon :

```text
Input
Input
Input
[ Submit ]
████████████
  CLAVIER
████████████
```

Le bouton peut devenir inaccessible.

Il faut donc penser :

* déplacement du contenu ;
* scroll ;
* fermeture du clavier ;
* comportement Android/iOS ;
* ordre des champs.

### À retenir

> **Tester un formulaire avec le clavier ouvert, pas seulement dans le simulateur avec le clavier masqué.**

---

# 14. Utiliser Expo Router comme structure de navigation

Dans un projet Expo moderne, Expo Router offre une approche file-based.

Exemple :

```text
app/
├── _layout.tsx
├── index.tsx
├── products/
│   ├── index.tsx
│   └── [id].tsx
├── favorites.tsx
└── settings.tsx
```

Ce modèle permet de faire correspondre naturellement :

```text
structure fichiers
        ↓
structure navigation
        ↓
routes
```

Une règle importante reste cependant :

> **Une route est un point d'entrée, pas nécessairement tout le composant fonctionnel.**

Par exemple :

```text
app/products/[id].tsx
```

peut rester très léger :

```tsx
export default function Page() {
  return <ProductDetailsScreen />;
}
```

La logique métier reste alors indépendante du routeur.

---

# 15. Expo Go pour découvrir, Development Build pour développer

Expo Go est particulièrement adapté à :

```text
apprentissage
POC
démonstration
petits exercices
```

Mais une véritable application finit généralement par nécessiter :

```text
modules natifs
configuration native
permissions
deep links
notifications
services externes
```

On utilisera alors un **Development Build**.

## Modèle mental

```text
Expo Go
   ↓
runtime Expo générique

Development Build
   ↓
runtime natif propre
à l'application
```

### À retenir

> **Expo Go est un excellent bac à sable, pas la définition d'une architecture Expo.**

---

# 16. Installer les modules compatibles avec l'Expo SDK

Pour les dépendances concernées, préférer :

```bash
npx expo install expo-camera
```

à :

```bash
npm install expo-camera
```

`expo install` permet à Expo de sélectionner une version cohérente avec le SDK installé.

Cette discipline devient particulièrement importante pour les bibliothèques ayant une composante native.

---

# 17. Vérifier régulièrement le projet avec Expo Doctor

Une application Expo dépend de versions qui doivent rester cohérentes :

```text
Expo SDK
React Native
React
modules Expo
modules natifs
```

Un bon réflexe est :

```bash
npx expo-doctor
```

et lorsque nécessaire :

```bash
npx expo install --fix
```

### À retenir

> **Les dépendances natives ne se mettent pas à jour aussi librement qu'un package JavaScript isolé.**

---

# 18. Préférer la configuration déclarative au bricolage natif

Avec Expo, beaucoup de configurations passent par :

```text
app.json
```

ou :

```text
app.config.ts
```

Exemple conceptuel :

```ts
export default {
  expo: {
    name: "My App",
    orientation: "portrait",
    plugins: [
      "expo-camera"
    ]
  }
};
```

Puis Expo peut générer les projets :

```text
ios/
android/
```

Cette approche fait partie de la logique de **Continuous Native Generation**.

### À éviter

Modifier manuellement :

```text
ios/
android/
```

puis supposer que ces modifications seront toujours conservées lorsque ces répertoires sont générés.

### Préférer

```text
configuration Expo
+
Config Plugin
```

lorsqu'une modification native doit être reproductible.

### À retenir

> **Décrire le natif plutôt que le modifier à la main lorsque la génération Expo est utilisée.**

---

# 19. Traiter les permissions comme une expérience utilisateur

La caméra, les notifications, la localisation ou les photos nécessitent des permissions.

Mauvaise expérience :

```text
Ouverture application
        ↓
"Autoriser caméra ?"
        ↓
"Autoriser localisation ?"
        ↓
"Autoriser notifications ?"
```

L'utilisateur ne sait pas encore pourquoi.

Meilleure séquence :

```text
Utilisateur choisit
"Scanner un produit"
        ↓
L'application explique
pourquoi la caméra est nécessaire
        ↓
Demande permission
```

### À retenir

> **Demander une permission au moment où sa valeur devient compréhensible.**

---

# 20. Ne jamais considérer `EXPO_PUBLIC_*` comme secret

Expo remplace les variables :

```text
EXPO_PUBLIC_*
```

dans le bundle client.

Elles peuvent donc être observées par quelqu'un disposant de l'application. Expo indique explicitement qu'elles ne doivent pas contenir de secrets.

### Correct

```env
EXPO_PUBLIC_API_URL=https://api.example.com
```

### Incorrect

```env
EXPO_PUBLIC_DATABASE_PASSWORD=supersecret
```

### Règle

```text
Dans l'application cliente
        =
considérer la valeur publique
```

Les secrets doivent rester sur :

```text
backend
CI/CD
EAS Build
service sécurisé
```

selon leur utilisation.

---

# 21. Distinguer stockage et stockage sécurisé

Tout stockage local n'a pas le même besoin de sécurité.

## Préférences ordinaires

Exemples :

```text
thème
langue
onboarding terminé
quantité par défaut
```

Un stockage persistant classique peut suffire.

## Données sensibles

Exemples :

```text
credential
token
clé locale sensible
```

Une solution comme :

```text
expo-secure-store
```

est plus adaptée.

### À retenir

> **Persistance ≠ sécurité.**

---

# 22. Distinguer build et update

Avec Expo/EAS :

```text
Build
```

et :

```text
Update
```

ne représentent pas la même opération.

## Build

Produit le runtime natif :

```text
React Native
modules natifs
permissions
configuration native
```

## Update

Peut distribuer notamment :

```text
JavaScript
assets
```

compatibles avec le runtime déjà installé.

Donc :

```text
modification JS
     ↓
potentiellement OTA

modification native
     ↓
nouveau build
```

### À retenir

> **Une update ne peut pas inventer du code natif absent du binaire installé.**

---

# 23. Séparer les environnements

Une application réelle possède généralement :

```text
development
preview
production
```

Cette séparation peut concerner :

```text
API
configuration
build
distribution
variables
updates
```

EAS propose précisément ces trois environnements par défaut pour gérer les variables et les builds.

Exemple conceptuel :

```text
development
   ↓
api-dev.example.com

preview
   ↓
api-staging.example.com

production
   ↓
api.example.com
```

### À retenir

> **Le build de test ne devrait pas devenir accidentellement le build de production.**

---

# 24. Tester sur un véritable appareil

Le simulateur est extrêmement utile.

Mais il ne reproduit pas parfaitement :

```text
performances
mémoire
caméra
GPS
notifications
gestes
clavier
réseau mobile
orientation
mise en veille
```

La stratégie peut être :

```text
développement quotidien
       ↓
simulateur

régulièrement
       ↓
vrai appareil

avant livraison
       ↓
plusieurs appareils
```

---

# 25. Mesurer les performances en production

Le mode développement ajoute :

```text
debug
warnings
outils
instrumentation
```

Il n'est donc pas représentatif d'une application finale.

Pour analyser les performances :

```text
build release
+
appareil réel
+
scénario reproductible
```

React Native recommande explicitement d'évaluer les performances dans un build release.

### À retenir

> **Une application lente en développement n'est pas nécessairement lente en production — et inversement.**

---

# 26. Tester le comportement plutôt que les détails internes

Prenons :

```tsx
function FavoriteButton() {
  const [favorite, setFavorite] = useState(false);

  // ...
}
```

Un test fragile vérifierait :

```text
favorite === true
```

Un test orienté utilisateur vérifierait :

```text
Je presse le bouton
        ↓
le produit apparaît comme favori
```

La seconde approche reste valable même si l'implémentation change complètement.

---

# 27. Ne pas oublier les états métier inhabituels

Une application mobile doit être pensée dans des situations moins idéales.

Par exemple :

```text
Que se passe-t-il si…

l'API ne répond pas ?
le réseau disparaît ?
l'utilisateur double-clique ?
la permission est refusée ?
l'application reprend après 20 minutes ?
la liste est vide ?
le token expire ?
l'utilisateur revient en arrière ?
```

Une bonne pratique de conception consiste à tester :

```text
Happy Path
+
Unhappy Paths
```

---

# 28. Une architecture raisonnable avant une architecture parfaite

Un projet pédagogique ou de taille moyenne peut très bien démarrer avec :

```text
src/
├── components/
├── features/
│   ├── products/
│   ├── favorites/
│   └── orders/
├── services/
├── hooks/
├── types/
└── utils/

app/
├── _layout.tsx
├── index.tsx
├── discover.tsx
├── favorites.tsx
├── orders.tsx
└── settings.tsx
```

Puis évoluer lorsque les besoins apparaissent.

Il n'est pas nécessaire de commencer avec :

```text
Clean Architecture
+
DDD
+
CQRS
+
12 couches
```

pour afficher quelques produits.

### À retenir

> **L'architecture doit absorber la complexité existante, pas anticiper toutes les complexités imaginables.**

---

# Tableau récapitulatif

| Situation              | À éviter                                | Préférer                             |
| ---------------------- | --------------------------------------- | ------------------------------------ |
| Grande liste           | `ScrollView + map()`                    | `FlatList`                           |
| Calcul dérivé          | `useEffect + setState`                  | calcul pendant le rendu              |
| État local             | store global                            | `useState`                           |
| Logique réseau         | directement partout dans les composants | service / hook                       |
| État API               | uniquement `data`                       | loading/error/empty/data             |
| Interaction            | pensée souris                           | pensée tactile                       |
| Icône                  | interaction sans label                  | accessibilité explicite              |
| Formulaire             | ignorer le clavier                      | prévoir clavier + scroll             |
| Navigation Expo        | gros composant route                    | route légère + screen                |
| Début Expo             | uniquement Expo Go                      | Development Build dès que nécessaire |
| Package natif          | version arbitraire                      | `expo install`                       |
| Configuration native   | modifications manuelles dispersées      | config + plugin                      |
| Permission             | demander au démarrage                   | demander dans le contexte            |
| Secret                 | `EXPO_PUBLIC_SECRET`                    | backend / secret EAS                 |
| Donnée sensible locale | stockage ordinaire                      | SecureStore                          |
| Modification native    | EAS Update                              | nouveau build                        |
| Environnements         | configuration unique                    | dev / preview / prod                 |
| Performance            | mesurer en dev                          | build release + appareil réel        |
| Tests                  | détails d'implémentation                | comportement utilisateur             |
| Architecture           | surarchitecture initiale                | complexité progressive               |

---

# Checklist avant de considérer un écran terminé

## Interface

* [ ] L'écran fonctionne sur plusieurs tailles.
* [ ] Les Safe Areas sont prises en compte.
* [ ] Le clavier ne masque pas les actions.
* [ ] Les zones tactiles sont suffisamment accessibles.
* [ ] Les icônes importantes possèdent une alternative accessible.

## Données

* [ ] Le chargement est représenté.
* [ ] Une erreur est représentée.
* [ ] Une liste vide possède un comportement défini.
* [ ] Une requête lente ne bloque pas l'interface inutilement.

## Navigation

* [ ] Le retour fonctionne.
* [ ] Les paramètres de route sont contrôlés.
* [ ] Une route ne porte pas inutilement toute la logique métier.

## Mobile

* [ ] La permission refusée est prise en compte.
* [ ] La perte de réseau ne provoque pas un état incohérent.
* [ ] L'écran a été essayé sur un appareil réel.

## Expo

* [ ] Les dépendances natives sont compatibles avec le SDK.
* [ ] `expo-doctor` ne révèle pas de problème significatif.
* [ ] Les secrets ne sont pas dans `EXPO_PUBLIC_*`.
* [ ] Les configurations natives sont reproductibles.
* [ ] Les environnements development / preview / production sont distingués lorsque nécessaire.

---

# Les 12 réflexes essentiels

Pour une formation, on peut finalement condenser le document en douze réflexes :

1. **Un écran compose, il ne fait pas tout.**
2. **Un état reste local tant qu'il peut rester local.**
3. **Une valeur calculable n'est pas forcément un état.**
4. **Un `useEffect` synchronise avec l'extérieur.**
5. **Une grande collection utilise une liste virtualisée.**
6. **Loading, Error et Empty sont de vrais états UI.**
7. **Une interface mobile est pensée pour le doigt.**
8. **Le clavier, les permissions et les Safe Areas font partie du design.**
9. **Expo Go sert à découvrir ; le Development Build sert au vrai développement.**
10. **Avec Expo, préférer configuration reproductible et packages compatibles.**
11. **Ce qui est dans le client doit être considéré comme observable.**
12. **Tester et optimiser ce que vit l'utilisateur plutôt que ce que l'on imagine.**

---

# Modèle mental final

```text
                USER
                  │
          interactions mobiles
                  │
                  ▼
             COMPONENTS
                  │
         état UI local
                  │
                  ▼
              FEATURES
             /        \
        hooks        métier
          │
          ▼
       SERVICES
          │
          ▼
         API


           Infrastructure mobile
                  │
                  ▼
                EXPO
        ┌─────────┼─────────┐
        │         │         │
     Router      SDK      Config
        │         │       Plugins
        └─────────┼─────────┘
                  │
                  ▼
            React Native
                  │
          ┌───────┴───────┐
          ▼               ▼
        iOS             Android
```

La règle directrice peut se résumer ainsi :

> **React organise l'interface et l'état.
> React Native apporte le modèle mobile.
> Expo fournit une trajectoire structurée vers le natif et la livraison.**
