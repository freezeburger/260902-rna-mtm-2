# Application avec EPO ([Expo Documentation][1])

# 1. Modèle mental


```text
                     app.json
                        │
          ┌─────────────┼─────────────┐
          ↓             ↓             ↓
      Expo / JS      Prebuild      EAS Build
                        │
                 ┌──────┴──────┐
                 ↓             ↓
              Android         iOS
          AndroidManifest    Info.plist
             Gradle          Xcode config
```

`app.json` est donc une sorte de **source de configuration de haut niveau**.

Expo transforme ensuite cette configuration en paramètres adaptés aux plateformes natives. ([Expo Documentation][2])

---

# 2. Structure classique de `app.json`

```json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "version": "1.0.0",

    "orientation": "portrait",

    "icon": "./assets/icon.png",

    "scheme": "myapp",

    "ios": {
      "bundleIdentifier": "com.example.myapp"
    },

    "android": {
      "package": "com.example.myapp"
    },

    "plugins": []
  }
}
```

La clé `"expo"` contient généralement la configuration de l'application. Si elle existe, Expo utilise son contenu comme configuration principale. ([Expo Documentation][1])

Une manière pédagogique de classer les propriétés est :

| Zone                 | Rôle                      | Exemple                     |
| -------------------- | ------------------------- | --------------------------- |
| Identité             | décrit l'application      | `name`, `slug`, `version`   |
| Présentation native  | apparence du binaire      | `icon`, `orientation`       |
| Navigation système   | intégration avec l'OS     | `scheme`                    |
| Android              | configuration spécifique  | `android.package`           |
| iOS                  | configuration spécifique  | `ios.bundleIdentifier`      |
| Expo                 | services Expo             | `updates`, `runtimeVersion` |
| Extensions natives   | configuration automatisée | `plugins`                   |
| Données applicatives | valeurs accessibles au JS | `extra`                     |

---

# 3. Les trois niveaux de configuration

Il est très utile de distinguer trois catégories.

### Niveau 1 — Configuration commune

```json
{
  "expo": {
    "name": "Products App",
    "version": "1.0.0",
    "orientation": "portrait"
  }
}
```

Expo sait directement traduire ces propriétés vers Android et iOS.

Par exemple :

```text
app.json
   │
   ├── name
   ├── icon
   ├── orientation
   └── version
```

Ce sont des propriétés faisant partie du **schéma standard Expo**. ([Expo Documentation][3])

---

# 4. Configuration spécifique Android / iOS

Lorsque les plateformes ont des concepts différents :

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.acme.products"
    },

    "android": {
      "package": "com.acme.products"
    }
  }
}
```

Mentalement :

```text
                app.json

           configuration commune
                  │
          ┌───────┴───────┐
          ↓               ↓

       android            ios
          │               │
       package     bundleIdentifier
```

C'est déjà une première abstraction importante d'Expo :

> Je décris mon intention, Expo produit la configuration native correspondante.

---

# 5. Et les `plugins` ?

C'est ici que le modèle devient particulièrement intéressant.

Une bibliothèque React Native peut avoir besoin de modifier le projet natif.

Par exemple une bibliothèque caméra peut nécessiter :

```text
Android
 └── AndroidManifest.xml
       └── permission CAMERA

iOS
 └── Info.plist
       └── NSCameraUsageDescription
```

Sans Expo, on ferait ces modifications manuellement.

Avec Expo, une bibliothèque peut fournir un **Config Plugin**. ([Expo Documentation][2])

On écrit alors simplement :

```json
{
  "expo": {
    "plugins": [
      "expo-camera"
    ]
  }
}
```

---

# 6. Ce que fait réellement le plugin

Il ne s'agit pas d'un plugin exécuté lorsque ton application tourne.

Il s'agit essentiellement d'une **fonction de transformation de configuration native** exécutée notamment pendant le processus de Prebuild. ([Expo Documentation][2])

Conceptuellement :

```text
app.json

plugins:
  expo-camera
       │
       ↓
Config Plugin
       │
       ├───────────────┐
       ↓               ↓
   Android            iOS
       │               │
AndroidManifest     Info.plist
```

Puis :

```bash
npx expo prebuild
```

produit ou modifie :

```text
android/
ios/
```

Les modifications natives apportées par les plugins nécessitent ensuite un nouveau build natif pour prendre effet. ([Expo Documentation][4])

---

# 7. Plugin sans configuration

Forme simple :

```json
{
  "expo": {
    "plugins": [
      "expo-camera",
      "expo-localization"
    ]
  }
}
```

Chaque chaîne désigne un plugin.

Par exemple `expo-localization` dispose de son propre Config Plugin. ([Expo Documentation][5])

---

# 8. Plugin avec configuration

Un plugin peut recevoir des options.

La syntaxe devient :

```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Autoriser l'accès à la caméra"
        }
      ]
    ]
  }
}
```

Le modèle est toujours :

```text
[
   "nom-du-plugin",
   {
      options
   }
]
```

Donc :

```text
plugins
  │
  └── expo-camera
          │
          └── configuration
                 │
                 ↓
          configuration native
```

Expo documente cette syntaxe comme mécanisme standard des Config Plugins. ([Expo Documentation][4])

---

# 9. Exemple intéressant : `expo-build-properties`

Il illustre particulièrement bien l'intérêt des plugins.

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 36,
            "targetSdkVersion": 36
          },
          "ios": {
            "deploymentTarget": "16.4"
          }
        }
      ]
    ]
  }
}
```

Le développeur exprime :

```text
Android doit compiler avec SDK 36
iOS doit cibler >= 16.4
```

Le plugin traduit ensuite cette intention vers les fichiers Gradle et iOS nécessaires. ([Expo Documentation][6])

---

# 10. Le pipeline complet

C'est probablement le schéma le plus important à retenir :

```text
             app.json
                │
                ↓
          Expo Config
                │
                ↓
        Config Plugins
                │
       ┌────────┴────────┐
       ↓                 ↓
 Android config       iOS config
       │                 │
       ↓                 ↓
 AndroidManifest       Info.plist
 Gradle                entitlements
 resources             Xcode config
       │                 │
       └────────┬────────┘
                ↓
          Application
             native
```

Le plugin appartient donc à la phase :

> **configuration → génération native**

et non à :

> **application JS → runtime**

---

# 11. Différence fondamentale : bibliothèque vs plugin

C'est une distinction souvent mal expliquée.

Imaginons :

```bash
npx expo install expo-camera
```

Il y a potentiellement deux choses différentes.

```text
expo-camera
    │
    ├── code runtime
    │      ↓
    │   import { CameraView } from "expo-camera"
    │
    └── config plugin
           ↓
       configuration native
```

### Runtime

Le code React utilise la bibliothèque :

```tsx
import { CameraView } from 'expo-camera';
```

### Build time

Le plugin prépare Android/iOS :

```json
{
  "expo": {
    "plugins": ["expo-camera"]
  }
}
```

C'est exactement la séparation :

```text
Bibliothèque
    │
    ├── ce que l'application FAIT
    │
    └── ce dont le binaire A BESOIN
```

---

# 12. `app.json` vs `app.config.ts`

`app.json` est statique :

```json
{
  "expo": {
    "name": "Products"
  }
}
```

Mais Expo accepte également une configuration dynamique :

```ts
export default {
  expo: {
    name: 'Products',
  },
};
```

avec :

```text
app.config.js
app.config.ts
```

Cela permet d'utiliser variables, conditions, imports et logique JavaScript/TypeScript. ([Expo Documentation][1])

Par exemple :

```ts
const isProduction = process.env.APP_ENV === 'production';

export default {
  expo: {
    name: isProduction
      ? 'Products'
      : 'Products Dev',

    ios: {
      bundleIdentifier: isProduction
        ? 'com.acme.products'
        : 'com.acme.products.dev',
    },
  },
};
```

Le modèle reste exactement le même :

```text
app.json            app.config.ts
   │                      │
statique              dynamique
   │                      │
   └──────────┬───────────┘
              ↓
         Expo Config
```

---

# 13. Les plugins peuvent être chaînés

```json
{
  "expo": {
    "plugins": [
      "expo-localization",
      "expo-camera",
      [
        "expo-build-properties",
        {
          "android": {
            "targetSdkVersion": 36
          }
        }
      ]
    ]
  }
}
```

Les plugins sont appliqués dans leur ordre de déclaration : la sortie d'un plugin devient l'entrée du suivant. L'ordre peut donc avoir de l'importance lorsqu'ils modifient les mêmes éléments natifs. ([Expo Documentation][4])

---

# 14. `prebuild` est la pièce qui relie tout

Quand tu fais :

```bash
npx expo prebuild
```

Expo prend :

```text
package.json
app.json / app.config.ts
plugins
```

et produit :

```text
android/
ios/
```

Donc :

```text
Expo project
     │
     │ app.json
     │ plugins
     │
     ↓
  prebuild
     │
 ┌───┴───┐
 ↓       ↓
android  ios
```

C'est la base du modèle appelé par Expo **Continuous Native Generation — CNG**. ([Expo Documentation][2])

---

# 15. Conséquence importante

Dans une application basée sur CNG, modifier manuellement :

```text
android/
ios/
```

est généralement quelque chose qu'on cherche à éviter.

Pourquoi ?

Parce que :

```bash
npx expo prebuild
```

doit pouvoir régénérer ces projets à partir de :

```text
app config
+
config plugins
```

Expo recommande justement les Config Plugins pour rendre ces modifications reproductibles plutôt que de dépendre de changements manuels dans les projets générés. ([Expo Documentation][2])

---

# 16. Un plugin personnalisé

On peut même écrire :

```text
plugins/
└── withMyCompanyConfig.ts
```

puis :

```ts
export default {
  expo: {
    plugins: [
      './plugins/withMyCompanyConfig',
    ],
  },
};
```

Le plugin peut alors utiliser les API Expo telles que :

```text
withAndroidManifest()
withInfoPlist()
```

pour modifier les structures natives lors du prebuild. Expo appelle ces mécanismes des **Mod Plugins**, construits au-dessus des `mods`. ([Expo Documentation][7])

Le niveau de détail devient donc :

```text
Config Plugin
     │
     ↓
Plugin function
     │
     ↓
Mod Plugin
     │
     ↓
Mod
     │
     ↓
fichier natif
```

Pour un développeur d'application classique, il suffit généralement de retenir les deux premiers niveaux.

---

# 17. Configuration runtime : attention à `extra`

Certaines données peuvent être mises dans :

```json
{
  "expo": {
    "extra": {
      "apiUrl": "https://api.example.com"
    }
  }
}
```

et récupérées avec :

```ts
import Constants from 'expo-constants';

Constants.expoConfig?.extra?.apiUrl;
```

Expo déconseille d'importer directement `app.json` dans le code applicatif ; `Constants.expoConfig` donne accès à la configuration traitée par Expo. ([Expo Documentation][1])

Il faut donc distinguer :

```text
app.json
  │
  ├── configuration native
  │      icon
  │      package
  │      permissions
  │      plugins
  │
  └── configuration exposable au JS
         extra
```

---

# 18. Commandes utiles pour comprendre ce qui se passe

Tu peux afficher la configuration réellement comprise par Expo :

```bash
npx expo config
```

Et, particulièrement intéressant pédagogiquement :

```bash
npx expo config --type introspect
```

Cette seconde commande permet d'observer une partie des transformations natives que les plugins produiraient, par exemple sur `AndroidManifest.xml`, `Info.plist` ou les entitlements, sans nécessairement écrire ces transformations sur disque. ([Expo Documentation][8])

---

# 19. Les pièges conceptuels

| Idée erronée                                  | Modèle correct                                          |
| --------------------------------------------- | ------------------------------------------------------- |
| `app.json` est lu uniquement au démarrage     | Il intervient aussi dans la génération/build            |
| un plugin Expo est un plugin React            | C'est principalement un transformateur de config native |
| `plugins` contient du code exécuté dans l'app | Les Config Plugins travaillent surtout au prebuild      |
| installer une librairie suffit toujours       | Certaines nécessitent une configuration native          |
| modifier `android/` est toujours nécessaire   | CNG cherche justement à générer ces modifications       |
| `app.json` = configuration Android/iOS brute  | C'est une abstraction au-dessus des deux plateformes    |
| plugin = bibliothèque                         | Une bibliothèque peut fournir **runtime + plugin**      |

---

# 20. La synthèse à mémoriser

Je proposerais pour une formation ce modèle en **trois phrases** :

> **`app.json` décrit l'application.**
> **Les Config Plugins complètent cette description avec des besoins natifs.**
> **Expo Prebuild transforme cette description en projets Android et iOS.**

Soit :

```text
          DÉCRIRE
             │
             ↓
          app.json
             │
        + plugins
             │
             ↓
         GÉNÉRER
          prebuild
             │
       ┌─────┴─────┐
       ↓           ↓
    Android       iOS
```


[1]: https://docs.expo.dev/workflow/configuration/?utm_source=chatgpt.com "Configure with app config - Expo Documentation"
[2]: https://docs.expo.dev/config-plugins/introduction/?utm_source=chatgpt.com "Introduction to config plugins - Expo Documentation"
[3]: https://docs.expo.dev/versions/latest/config/app/?utm_source=chatgpt.com "app.json / app.config.js - Expo Documentation"
[4]: https://docs.expo.dev/config-plugins/plugins/?utm_source=chatgpt.com "Create and use config plugins - Expo Documentation"
[5]: https://docs.expo.dev/versions/latest/sdk/localization/?utm_source=chatgpt.com "Localization - Expo Documentation"
[6]: https://docs.expo.dev/versions/latest/sdk/build-properties/?utm_source=chatgpt.com "BuildProperties - Expo Documentation"
[7]: https://docs.expo.dev/config-plugins/mods/?utm_source=chatgpt.com "Mods - Expo Documentation"
[8]: https://docs.expo.dev/config-plugins/development-and-debugging/?utm_source=chatgpt.com "Developing and debugging a plugin - Expo Documentation"
