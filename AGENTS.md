
## Documentation de référence

Avant toute modification, consulter les documents du projet dans
[`documentation/`](documentation/) :

- [`0_WORK_PLAN.md`](documentation/0_WORK_PLAN.md) — plan d'implémentation,
  architecture cible, phases de réalisation et critères de fin du MVP ;
- [`0_APPLICATION.md`](documentation/0_APPLICATION.md) — périmètre
  fonctionnel, parcours utilisateur, écrans, modèles de données et critères
  de réussite ;
- [`SYNTHESE_1_GENERAL.md`](documentation/SYNTHESE_1_GENERAL.md) — principes
  généraux React Native et Expo ;
- [`SYNTHESE_2_BP.md`](documentation/SYNTHESE_2_BP.md) — bonnes pratiques
  concrètes pour les composants, listes, navigation, UX mobile et Expo Router ;
- [`SYNTHESE_3_REDUX.md`](documentation/SYNTHESE_3_REDUX.md) — recommandations
  concernant l'état partagé, Redux et l'organisation par fonctionnalités.

Le workplan et la documentation fonctionnelle définissent le comportement
attendu ; les synthèses servent de guide technique pour l'implémentation.
Respecter en priorité les conventions et dépendances déjà présentes dans le
projet.

## Règles pour les modifications réalisées par une IA

- Toute modification réalisée par une IA doit rester petite, ciblée et
  limitée au besoin demandé. Éviter les refactorisations ou changements
  connexes non nécessaires.
- Toute modification réalisée par une IA doit être tracée dans
  [`AGENTS_LOG.md`](AGENTS_LOG.md).
- Chaque entrée du journal doit préciser la date, les fichiers concernés, une
  description concise du changement et un commentaire Git suggéré.
- Tout code boilerplate doit d'abord être créé avec la commande `$command`
  correspondante définie dans [`generate-react-cli.json`](generate-react-cli.json)
  afin de respecter les templates et conventions du projet. Les ajustements
  spécifiques ne doivent être faits qu'après cette génération.
