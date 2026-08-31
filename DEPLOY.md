# 🚀 Deployment Guide - Claude Code Project

**Objectif:** Ce document décrit les étapes nécessaires pour déployer l'application web "Claude Code Gratuit avec Ollama + GLM 🔥 Tuto Local" sur un serveur de production ou en tant que site statique.

**Autor:** Claude Code
**Date:** 2026-08-31
**Architecture:** Single Page Application (SPA) - Basée sur JavaScript, CSS et HTML, avec un Store global pour la logique.

---

## 📂 Structure des Fichiers

```
/project_root
├── index.html     # Structure principale
├── style.css      # Styles et Variables CSS
├── script.js      # Logique, Store, Validation, Animations
├── CLAUDE.md      # Documentation architecturale
└── DEPLOY.md      # Ce guide
```

## ⚙️ Processus de Déploiement

### 1. Prérequis Techniques
*   Un serveur web capable de servir des fichiers statiques (ex: Apache, Nginx, GitHub Pages).
*   Les fichiers sources doivent être compilés et mis en place dans le répertoire racine du site.

### 2. Étapes de Mise en Place (Manuel ou CI/CD)

1.  **Copie des Assets**: Assurez-vous que le fichier image `Claude Code GRATUIT avec Ollama + GLM 🔥 Tuto Local (BQ).jpg` est placé au même niveau que les fichiers sources.
2.  **Mise à jour du Cache**: Supprimez tous les caches existants (CSS/JS) pour forcer le navigateur à prendre la nouvelle version.

### 3. Conseils pour le Maintien (Best Practices)

*   **Performances**: Le passage au mode sombre et le chargement des composants ont été optimisés avec des transitions CSS (`transition: all 0.3s`).
*   **Maintainabilité**: Toute nouvelle fonctionnalité doit passer par la mise à jour du `Store` et doit implémenter un composant (une fonction `render*()`) qui dépend de cet état pour s'assurer que l'UI est toujours synchronisée avec la source de vérité.
*   **Testing**: Ne jamais déployer sans exécuter `runUnitTests()` et `runPageSupervisionCheck()` localement.

---
*Note: Ce site est un POC. Pour une production réelle, il faudrait encapsuler la logique dans un framework (React/Vue/Svelte) pour une gestion d'état et de cycle de vie plus robuste.*