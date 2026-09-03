
> Point important en 2026 : React Native recommande désormais explicitement l’usage d’un **framework** pour démarrer une nouvelle application, Expo étant la solution de référence la plus courante. Expo SDK 57 s’appuie actuellement sur React Native 0.86 et React 19.2.3. ([React Native][1])

---

# 1. Bonnes pratiques React Native

## Le modèle mental

Une application React Native n'est pas une application Web affichée dans un navigateur.

```text
React
  ↓
Composants React Native
  ↓
Runtime JavaScript
  ↓
Composants / APIs natives
  ↓
Android / iOS
```

La logique applicative s'exécute majoritairement côté JavaScript tandis que l'interface s'appuie sur des composants natifs. Il faut donc penser simultanément **React**, **mobile** et **contraintes natives**.

React Native utilise aujourd'hui principalement **Hermes** comme moteur JavaScript. ([React Native][2])

---

## Les bonnes pratiques essentielles

| Domaine       | Bonne pratique                                        | Pourquoi                                    |
| ------------- | ----------------------------------------------------- | ------------------------------------------- |
| Composants    | Petits composants spécialisés                         | Facilite maintenance, test et réutilisation |
| État          | Garder l'état au plus près du composant qui l'utilise | Évite les dépendances globales inutiles     |
| Props         | Préférer des interfaces simples et typées             | Réduit le couplage                          |
| TypeScript    | L'utiliser par défaut                                 | Sécurise les contrats entre composants      |
| Navigation    | Séparer navigation et logique métier                  | Les écrans restent simples                  |
| Données       | Isoler les appels réseau                              | Évite de mélanger UI et infrastructure      |
| Listes        | Utiliser `FlatList` pour les listes importantes       | Virtualisation et performances              |
| Images        | Adapter dimensions et résolution                      | Mémoire mobile limitée                      |
| Styles        | Centraliser les tokens de design                      | Cohérence visuelle                          |
| Accessibilité | Prévoir labels, rôles et zones tactiles               | L'accessibilité fait partie de l'UI         |
| Tests         | Tester le comportement utilisateur                    | Tests moins fragiles                        |
| Performance   | Mesurer avant d'optimiser                             | Évite les micro-optimisations inutiles      |

---

# 2. Concevoir les composants correctement

Une règle pédagogique utile :

```text
Screen
   ↓
Feature
   ↓
Component
   ↓
Primitive
```

Par exemple :

```text
ProductScreen
 ├─ ProductList
 │   ├─ ProductCard
 │   │   ├─ Image
 │   │   ├─ Text
 │   │   └─ Button
 │
 └─ ProductFilters
```

Un écran ne devrait pas devenir un énorme composant contenant :

```text
navigation
+ fetch
+ validation
+ transformation
+ logique métier
+ rendu
+ styles
```

On cherchera plutôt :

```text
Screen
 ├── hooks
 ├── services
 └── components
```

---

# 3. Gérer l'état avec parcimonie

Toutes les données ne sont pas de « l'état global ».

Il est utile de distinguer :

| Type                | Exemple            | Emplacement naturel     |
| ------------------- | ------------------ | ----------------------- |
| État UI             | modal ouverte      | composant               |
| État écran          | filtre sélectionné | screen / hook           |
| État métier partagé | panier             | contexte/store          |
| État serveur        | produits API       | couche de données/cache |
| Préférences         | thème              | stockage persistant     |

La mauvaise habitude classique est :

```text
Tout → store global
```

La bonne question est plutôt :

> **Qui a réellement besoin de connaître cette information ?**

---

# 4. Ne pas oublier que le mobile possède des contraintes propres

Le Web encourage facilement :

```text
charger
afficher
recharger
```

Sur mobile il faut également penser :

```text
réseau lent
réseau absent
batterie
mémoire
cycle de vie
permissions
clavier
rotation
safe areas
retour arrière Android
mise en veille
reprise de l'application
```

Une application React Native robuste ne doit donc pas considérer le téléphone comme « un petit navigateur ».

---

# 5. Listes et performances

Pour quelques éléments :

```tsx
<ScrollView>
```

peut suffire.

Pour une collection importante :

```tsx
<FlatList />
```

est généralement préférable parce que les éléments sont virtualisés.

React Native recommande notamment d'optimiser les grandes listes et, lorsque les dimensions sont prévisibles, d'utiliser `getItemLayout`. ([React Native][3])

Mais la règle pédagogique la plus importante reste :

> **Ne pas optimiser par intuition. Mesurer d'abord.**

React Native vise une UI à au moins **60 images/seconde**, ce qui représente environ **16,67 ms par frame**. Les tests de performance doivent être réalisés sur un build release : le mode développement introduit lui-même un coût important. ([React Native][3])

---

# 6. Tester le comportement, pas l'implémentation

Mauvaise approche :

```text
Le state interne vaut-il "pending" ?
```

Meilleure approche :

```text
L'utilisateur voit-il "Pending" ?
```

ou :

```text
Lorsque l'utilisateur presse le bouton,
le résultat attendu apparaît-il ?
```

La documentation React Native recommande précisément de privilégier les éléments observables par l'utilisateur et d'éviter de tester directement les props, états internes ou détails d'implémentation. ([React Native][4])

On retrouve donc :

```text
tests unitaires
      ↓
tests composants
      ↓
quelques tests E2E critiques
```

---

# 7. Et maintenant Expo SDK

Expo n'est plus simplement :

> « l'application Expo Go qui permet de tester rapidement React Native ».

C'est aujourd'hui un **framework React Native** accompagné d'un écosystème d'outillage.

```text
React Native
     │
     ▼
Expo Framework
 ├── Expo SDK
 ├── Expo Router
 ├── Expo Modules
 ├── Expo CLI
 ├── Config Plugins
 └── Continuous Native Generation

     +
     │
     ▼
EAS
 ├── Build
 ├── Submit
 ├── Update
 ├── Workflows
 └── Hosting
```

Expo SDK fournit donc principalement des APIs et bibliothèques natives standardisées, tandis qu'EAS fournit des services de build, déploiement et exploitation. ([Expo Documentation][5])

---

# 8. Expo : la « Golden Path »

Pour un nouveau projet, la trajectoire recommandée devient approximativement :

```bash
npx create-expo-app@latest
```

puis :

```text
TypeScript
   ↓
Expo Router
   ↓
Expo SDK
   ↓
Development Build
   ↓
EAS Build
   ↓
EAS Submit / Update
```

Expo Router est aujourd'hui le routeur file-based proposé par défaut par Expo et apporte notamment routes typées, deep linking automatique et support multiplateforme. ([Expo Documentation][6])

---

# 9. Expo Go ≠ environnement de production

C'est probablement une des distinctions les plus importantes à transmettre pédagogiquement.

### Expo Go

Excellent pour :

```text
découvrir
tester
prototyper
faire des exercices
```

### Development Build

À utiliser pour :

```text
vraie application
modules natifs
configuration native
tests réalistes
développement en équipe
```

### Production Build

Pour :

```text
App Store
Google Play
distribution finale
```

Expo recommande les **development builds** pour les applications destinées à être réellement publiées. Un development build est, conceptuellement, une version personnalisée d'Expo Go contenant le runtime natif de ton application. ([Expo Documentation][7])

C'est donc une bonne formule pédagogique :

> **Expo Go permet de découvrir Expo. Le Development Build permet de développer son application.**

---

# 10. Installer les dépendances « façon Expo »

Avec Expo, on privilégiera :

```bash
npx expo install package
```

plutôt qu'un `npm install` aveugle pour les dépendances natives.

Pourquoi ?

Parce que l'écosystème Expo maintient une cohérence entre :

```text
Expo SDK
React Native
React
bibliothèques natives
```

Une version d'Expo SDK correspond à une version déterminée de React Native. Expo fournit notamment `expo-doctor` et `expo install --fix` pour détecter et corriger les incompatibilités. ([Expo Documentation][8])

---

# 11. Ne pas modifier le natif sans raison

Avec Expo, on introduit un principe intéressant :

```text
Configuration déclarative
        ↓
Prebuild
        ↓
android/
ios/
```

C'est la **Continuous Native Generation — CNG**.

L'idée est de maintenir :

```text
app.json / app.config.ts
+
config plugins
```

plutôt que de maintenir manuellement une multitude de modifications dans :

```text
android/
ios/
```

Expo recommande de ne pas modifier directement les fichiers générés lorsqu'on utilise cette approche, car ils peuvent être recréés par `expo prebuild --clean`. Les personnalisations natives doivent plutôt être exprimées avec les **Config Plugins**. ([Expo Documentation][9])

---

# 12. Sécurité : le client reste un client

Erreur fréquente :

```env
EXPO_PUBLIC_SECRET_API_KEY=abc123
```

Le préfixe `EXPO_PUBLIC_` signifie justement :

> **cette information sera embarquée dans l'application cliente.**

Elle n'est donc pas secrète.

Expo rappelle explicitement qu'une variable `EXPO_PUBLIC_*` ne doit jamais contenir de secret. ([Expo Documentation][10])

On distingue donc :

```text
URL publique API
        ↓
EXPO_PUBLIC_API_URL
```

de :

```text
clé privée
secret serveur
credential
        ↓
BACKEND
```

Et pour les informations locales sensibles appartenant réellement à l'utilisateur :

```text
token
credential locale
donnée sensible
```

on utilisera typiquement une solution sécurisée comme `expo-secure-store`.

---

# 13. Les mises à jour OTA demandent également une discipline

EAS Update permet de distribuer des changements JavaScript/assets sans republier systématiquement le binaire.

Mais :

```text
JS Update
     ↓
doit être compatible
     ↓
Runtime natif installé
```

Une modification native nécessite donc un **nouveau build**.

Expo utilise pour cela notamment :

```text
runtimeVersion
```

et recommande de séparer les canaux, par exemple :

```text
development
preview
production
```

afin d'éviter qu'une mise à jour incompatible soit envoyée au mauvais runtime. ([Expo Documentation][11])

---

# 14. Tableau React Native → Expo

| Besoin         | React Native              | Avec Expo            |
| -------------- | ------------------------- | -------------------- |
| Projet         | configuration RN          | `create-expo-app`    |
| Navigation     | React Navigation          | Expo Router          |
| Camera         | bibliothèque native       | Expo Camera          |
| Notifications  | intégration native        | Expo Notifications   |
| Splash screen  | config native             | Expo Splash Screen   |
| Secure storage | Keychain/Keystore library | Expo SecureStore     |
| Build          | Gradle / Xcode            | EAS Build ou local   |
| Native config  | Android/iOS               | app config + plugins |
| Mise à jour JS | solution externe          | EAS Update           |
| Publication    | outils stores             | EAS Submit           |
| CI/CD          | à construire              | EAS Workflows        |

Expo ne remplace donc pas React Native :

```text
React
    ↓
React Native
    ↓
Expo
```

Expo **standardise et industrialise** une grande partie de ce qu'il fallait auparavant assembler soi-même.

---

# 15. Les dix règles à retenir

Pour un support de cours, je ramènerais tout cela à ces dix règles :

1. **Penser mobile, pas Web.**
2. **Construire de petits composants spécialisés.**
3. **Garder l'état aussi local que possible.**
4. **Séparer UI, métier et accès aux données.**
5. **Utiliser les composants adaptés aux volumes**, notamment les listes virtualisées.
6. **Tester ce que fait l'utilisateur, pas l'implémentation.**
7. **Mesurer les performances sur un build réel.**
8. **Avec Expo, suivre la Golden Path avant de personnaliser le natif.**
9. **Utiliser un Development Build pour un vrai projet.**
10. **Considérer Expo comme un framework React Native, et non comme un simple outil de démarrage.**

### Modèle mental final

```text
                APPLICATION
                     │
              ┌──────▼──────┐
              │    React    │
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │ React Native│
              └──────┬──────┘
                     │
              ┌──────▼──────┐
              │    Expo     │
              │ Framework   │
              └──────┬──────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
    Expo SDK     Expo Router     CNG
        │
        ▼
  APIs natives
        │
        ▼
 Android / iOS

             Industrialisation
                     │
                     ▼
                    EAS
          Build / Update / Submit
```


[1]: https://reactnative.dev/docs/0.78/environment-setup?utm_source=chatgpt.com "Get Started with React Native · React Native"
[2]: https://reactnative.dev/docs/javascript-environment?utm_source=chatgpt.com "JavaScript Environment · React Native"
[3]: https://reactnative.dev/docs/performance "Performance Overview · React Native"
[4]: https://reactnative.dev/docs/testing-overview?utm_source=chatgpt.com "Testing · React Native"
[5]: https://docs.expo.dev/guides/overview/?utm_source=chatgpt.com "Guides: Overview - Expo Documentation"
[6]: https://docs.expo.dev/router/introduction/?utm_source=chatgpt.com "Introduction to Expo Router - Expo Documentation"
[7]: https://docs.expo.dev/develop/development-builds/introduction/?utm_source=chatgpt.com "Introduction to development builds - Expo Documentation"
[8]: https://docs.expo.dev/versions/latest/?utm_source=chatgpt.com "Expo SDK reference - Expo Documentation"
[9]: https://docs.expo.dev/workflow/continuous-native-generation/?utm_source=chatgpt.com "Continuous Native Generation (CNG) - Expo Documentation"
[10]: https://docs.expo.dev/guides/environment-variables/?utm_source=chatgpt.com "Environment variables in Expo - Expo Documentation"
[11]: https://docs.expo.dev/build/updates/?utm_source=chatgpt.com "Using EAS Update - Expo Documentation"
