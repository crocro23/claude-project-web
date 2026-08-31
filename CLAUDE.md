# 📄 Claude Code Project Documentation - Web Application

**Last Updated:** 2026-08-31
**Author:** Claude Code (Assisted by User)
**Status:** Production Ready (Feature Complete)
**Goal:** To create a modern, dynamic, and maintainable marketing/landing page demonstrating local AI capabilities.

---

## 🚀 1. Architecture Overview

Ce projet a évolué d'une page statique à une **architecture pilotée par l'état (State-Driven Architecture)**. Au lieu de manipuler le DOM directement partout, la source de vérité unique est le **Store**. Toute action (clic, soumission, changement de thème) doit d'abord mettre à jour le Store, et c'est le Store qui déclenche ensuite le rafraîchissement des composants (le "render cycle").

### 📂 Fichiers Clés

*   **`index.html`**: La structure squelettique. Contient les placeholders pour les composants (Header, Main Content, Form, Footer, CTA).
*   **`style.css`**: Contient la totalité du styling. Il utilise des **Variables CSS** (`:root`) pour permettre un passage fluide entre le Mode Sombre et le Mode Clair.
*   **`script.js`**: Le cerveau de l'application. Contient le State Store, les validateurs, et les gestionnaires d'événements.

---

## 💾 2. State Management (The Store Pattern)

Le système de gestion d'état est encapsulé dans un module singleton `Store` en JavaScript.

### **Principes Clés:**
1.  **Single Source of Truth (SSOT)**: Toutes les données de l'application résident dans l'objet `state` interne du Store.
2.  **Immutabilité**: Les mises à jour ne modifient jamais l'état existant ; elles en créent toujours une nouvelle copie (ex: `setState('section', { ...state[section], ...newData })`).
3.  **Cycle de Vie**: La fonction `setState` accepte un `callback`. Ce callback est crucial : il s'exécute *après* la modification de l'état et sert à déclencher le cycle de rendu (`updateUI()`).

### **États Maintenus (State Keys):**
*   `buttonState`: Gestion de l'état du bouton principal (texte, couleur, `disabled`).
*   `form`: Contient `data` (les valeurs des champs) et `errors` (les messages d'erreur de validation).
*   `theme`: Gère le thème actif (`'dark'` ou `'light'`).

---

## 🎨 3. Composants et Rendu (Rendering)

L'UI est décomposée en fonctions de rendu (simulant des composants React/Vue) qui ne font qu'afficher l'état actuel :

*   **`renderTheme()`**: Lit `localStorage` ou le Store, puis applique la classe appropriée au `<body>` pour forcer le mode sombre ou clair via CSS Variables.
*   **`renderButton()`**: Lit `buttonState` pour configurer le bouton principal.
*   **`renderFormErrors()`**: Lit `form.errors` pour injecter les messages d'erreur dans les emplacements dédiés.
*   **`updateUI()`**: La fonction orchestratrice qui appelle tous les `render*` pour garantir que l'UI reflète toujours le Store.

---

## 🛡️ 4. Fonctionnalités Clés et Contrôleurs

### A. Validation de Formulaire
*   **Méthode**: `Store.validateForm(data)`
*   **Principe**: Effectue une validation synchrone des champs (présence, format email, longueur minimale).
*   **Flow**: Les erreurs sont stockées dans `Store.form.errors`. La soumission ne peut passer si `Object.values(errors).some(err => err !== null)` est vrai.

### B. Gestion du Thème (UX)
*   **Méthode**: `handleThemeToggle()`
*   **Persistence**: Utilise `localStorage` pour mémoriser le choix du thème entre les sessions.
*   **Action**: Bascule la classe `light-mode` sur le `<body>` et met à jour l'état global.

### C. Interaction Bouton Principal
*   **Dépendance**: Le clic appelle `handleButtonClick()`, qui modifie l'état `buttonState` puis déclenche le rendu.

---

## 🏗️ 5. Future Enhancements & To-Do List

1.  **API Integration (Haute Priorité)**: Remplacer la simulation `submitForm()` par un appel `fetch()` réel au backend.
2.  **Accessibilité (A11y)**: Ajouter des attributs ARIA et des labels plus descriptifs pour améliorer l'expérience des utilisateurs de lecteurs d'écran.
3.  **Composant Bibliothèque**: Extraire les blocs comme le `cta-links` et le `form-group` en composants réutilisables et réfactoriser l'ensemble du JS en modules (`import/export`).
4.  **Gestion des Dépendances**: Intégrer la gestion des dépendances frontend (ex: utiliser un système de package manager si la complexité augmente).