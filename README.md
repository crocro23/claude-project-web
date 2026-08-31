# 🌟 Claude Code Project: AI Local Developer Demo

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)](./DEPLOY.md)

Ce projet est une démonstration de pointe d'une application web dynamique, créée en utilisant les meilleures pratiques d'architecture logicielle : **State Management** (Store Pattern) et **Component-Based Architecture**.

Il vise à présenter un site web vitrine moderne pour le tutoriel "Claude Code GRATUIT avec Ollama + GLM 🔥 Tuto Local".

## 🚀 Fonctionnalités Clés

*   **Architecture Store-Driven**: Toute l'interactivité (bouton, formulaire) est pilotée par un Store unique (`script.js`), garantissant que l'état global est toujours la source de vérité.
*   **Thème Sombre/Clair**: Commutateur de thème persistant qui utilise les variables CSS (`style.css`) et le `localStorage` du navigateur.
*   **Validation de Formulaire**: Un formulaire de contact valide les champs en temps réel avant toute soumission.
*   **Animations**: Ajout d'animations CSS (`@keyframes fadeIn`) pour une expérience utilisateur fluide et moderne.
*   **Documentation**: Fichiers `CLAUDE.md` et `DEPLOY.md` sont fournis pour la maintenance future.

## <0xF0><0x9F><0x97><0x82>️ Structure du Projet

```
.
├── index.html     # Structure HTML principale
├── style.css      # Styles & Variables CSS (Mode Sombre par défaut)
├── script.js      # Logique métier, Store, Render Functions
├── CLAUDE.md      # Documentation Architecturale
├── DEPLOY.md      # Guide de déploiement
└── (Assets)
    └── ...images
```

## ⚙️ Installation et Lancement

**Prérequis:** Node.js et un serveur web statique (comme `live-server` ou Nginx).

1.  **Cloner le dépôt:**
    ```bash
    git clone <URL_DU_REPO>
    cd claude-project-web
    ```
2.  **Lancer le site**: Ouvrez `index.html` dans votre navigateur (ou utilisez un serveur local : `npx live-server`).

## 🧪 Comment tester la robustesse (Pour les développeurs)

Le fichier `script.js` contient maintenant des outils de développement pour valider l'état de l'application :

1.  **Ouvrir les Outils Dev** : Appuyez sur `F12`.
2.  **Tester les Composants**: Exécutez manuellement les fonctions suivantes dans la console :
    *   `runUnitTests()` : Pour valider la logique métier (validation des données, transitions d'état).
    *   `runPageSupervisionCheck()` : Pour vérifier que tous les éléments DOM critiques sont bien présents et que le thème initial est correctement chargé.

## 📚 Documentation Technique

Pour comprendre l'implémentation et maintenir ce projet, veuillez consulter :

*   ➡️ **[CLAUDE.md](./CLAUDE.md)** : La documentation complète de l'architecture (Store Pattern, Composants).
*   ➡️ **[DEPLOY.md](./DEPLOY.md)** : Les étapes pour le déploiement en production.

---
© 2026 Claude Code. Projet généré avec des standards de développement modernes.
