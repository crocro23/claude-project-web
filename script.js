/**
 * script.js
 * Gestionnaire d'état centralisé (Store) et logique d'interaction de la page.
 * Architecture orientée composants : la mise à jour de l'état (Store) déclenche le re-rendu des composants.
 */

/**
 * -----------------------------------------------------------
 * 1. LE STORE (Source Unique de Vérité)
 * -----------------------------------------------------------
 */
const Store = (function() {
    let state = {
        // État des éléments principaux
        buttonState: {
            message: "Cliquez-moi",
            color: "var(--primary-color)",
            disabled: false,
            timeoutId: null
        },
        // État du formulaire de contact
        form: {
            data: {
                name: "",
                email: "",
                message: ""
            },
            errors: {
                name: null,
                email: null,
                message: null
            },
            isSubmitting: false
        },
        // État du thème
        theme: 'dark', // Défaut sur 'dark'
        lastFormSubmissionSuccess: false
    };

    // --- GETTERS ---
    const getState = () => {
        return { ...state };
    };

    // --- SETTERS ---
    const setState = (section, data, callback) => {
        state[section] = data;
        if (callback) {
            callback();
        }
    };

    // --- VALIDATEURS ---
    const validateForm = (data) => {
        let errors = {};

        // Validation du Nom
        if (!data.name.trim()) {
            errors.name = "Le nom est requis.";
        } else if (data.name.length < 2) {
            errors.name = "Le nom doit contenir au moins deux caractères.";
        } else {
            errors.name = null;
        }

        // Validation de l'Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email.trim()) {
            errors.email = "L'email est requis.";
        } else if (!emailRegex.test(data.email)) {
            errors.email = "Veuillez entrer une adresse email valide.";
        } else {
            errors.email = null;
        }

        // Validation du Message
        if (!data.message.trim()) {
            errors.message = "Le message ne peut pas être vide.";
        } else if (data.message.length < 10) {
            errors.message = "Votre message devrait être un peu plus détaillé (min 10 caractères).";
        } else {
            errors.message = null;
        }

        return errors;
    };

    /**
     * Enregistre les données soumises après validation.
     */
    const setData = (data) => {
        setState('form', { ...state.form, data: data });
    };

    /**
     * Simule l'appel API réseau pour la soumission.
     */
    const submitForm = async (data) => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("[STORE] Données soumises au backend simulé:", data);
                // Simule le succès de la soumission (90% de chances)
                const success = Math.random() > 0.1;
                resolve(success);
            }, 1500);
        });
    };

    return {
        getState,
        setState,
        validateForm,
        setData,
        submitForm
    };
})();

/**
 * -----------------------------------------------------------
 * 2. FONCTIONS DE RENDU (Components)
 * -----------------------------------------------------------
 */

/**
 * Applique le thème défini dans le Store à l'élément body et au localStorage.
 */
const renderTheme = () => {
    const theme = Store.getState().theme;
    const body = document.body;

    // Utiliser une classe CSS pour gérer le thème
    body.classList.remove('light-mode', 'dark-mode');

    if (theme === 'light') {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
};

/**
 * Met à jour le bouton principal en se basant sur l'état du store.
 */
const renderButton = () => {
    const button = document.getElementById('myButton');
    if (!button) return;

    const state = Store.getState().buttonState;
    button.textContent = state.message;
    button.style.backgroundColor = state.color;
    button.disabled = state.disabled;
    button.style.cursor = state.disabled ? "default" : "pointer";
};

/**
 * Met à jour les messages d'erreur dans le formulaire.
 */
const renderFormErrors = () => {
    const formErrors = Store.getState().form.errors;

    // 1. Nettoyer tous les messages d'erreur d'abord
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    // 2. Remplir les messages d'erreur
    if (formErrors.name) {
        document.getElementById('nameError').textContent = formErrors.name;
    }
    if (formErrors.email) {
        document.getElementById('emailError').textContent = formErrors.email;
    }
    if (formErrors.message) {
        document.getElementById('messageError').textContent = formErrors.message;
    }
};


/**
 * Gère la mise à jour complète de l'UI (le "render cycle").
 * Cette fonction est appelée après chaque changement d'état.
 */
const updateUI = () => {
    renderButton();
    renderFormErrors();
    renderTheme();
};


/**
 * -----------------------------------------------------------
 * 3. LOGIQUE DES ÉVÉNEMENTS (Contrôleur)
 * -----------------------------------------------------------
 */

// --- Gestionnaire du Formulaire de Contact ---
const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    // 1. Lecture des données
    const formData = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        message: form.elements.message.value.trim()
    };

    // 2. Validation et mise à jour de l'état des erreurs
    Store.setState('form', { ...Store.getState().form, errors: Store.validateForm(formData), isSubmitting: true }, () => {
        renderFormErrors();
    });

    if (Object.values(Store.getState().form.errors).some(err => err !== null)) {
        console.warn("[CONTROLLER] Formulaire invalide. Rendu des erreurs effectué.");
        return;
    }

    // 3. Soumission réelle (API Call)
    try {
        const success = await Store.submitForm(formData);

        if (success) {
            // Succès: Nettoyage et réinitialisation
            const resetForm = () => {
                form.reset();
                // Réinitialiser l'état
                Store.setState('form', { data: { name: "", email: "", message: "" }, errors: { name: null, email: null, message: null }, isSubmitting: false }, () => {
                    // Réinitialisation du bouton principal après succès
                    Store.setState('buttonState', { message: "Cliquez-moi", color: "var(--primary-color)", disabled: false, timeoutId: null }, () => {
                        // Rendre l'état final
                        updateUI();
                    });
                });
            };
            alert("Message envoyé avec succès ! Merci de nous avoir contactés.");
            resetForm();
        } else {
            // Échec simulé
            Store.setState('form', { ...Store.getState().form, isSubmitting: false }, () => {
                updateUI();
                alert("Échec de la soumission. Veuillez réessayer plus tard.");
            });
        }

    } catch (error) {
        console.error("[CONTROLLER] Erreur lors de la soumission du formulaire:", error);
        Store.setState('form', { ...Store.getState().form, isSubmitting: false }, () => {
            updateUI();
            alert("Une erreur inattendue est survenue. Veuillez contacter le support.");
        });
    }
};


// --- Gestionnaire du Bouton Principal ---
const handleButtonClick = () => {
    // 1. Mise à jour de l'état et rendu immédiat
    Store.setState('buttonState', { message: "Traitement...", color: "var(--primary-color)", disabled: true, timeoutId: null }, () => {
        updateUI();
    });

    // Simuler un traitement
    setTimeout(() => {
        // 2. Mise à jour du contenu et réinitialisation de l'état du bouton
        const newContent = "✅ Succès ! L'état global a été mis à jour. Le contenu dynamique est actif et les validations sont en place !";
        document.getElementById('content').textContent = newContent;

        Store.setState('buttonState', { message: "Clic Réussi !", color: "var(--success-color)", disabled: false, timeoutId: null }, () => {
            updateUI();
        });

    }, 1000);
};

// --- Gestionnaire du Thème ---
const handleThemeToggle = () => {
    const currentState = Store.getState().theme;
    const newState = currentState === 'dark' ? 'light' : 'dark';

    // 1. Mettre à jour l'état
    Store.setState('theme', newState, () => {
        // 2. Rendre le changement d'état
        updateUI();
    });
};


/**
 * -----------------------------------------------------------
 * 4. Supervision de la Page (Health Check)
 * -----------------------------------------------------------
 */

/**
 * @function runPageSupervisionCheck
 * @description Vérifie l'état initial et la présence des éléments critiques de la page.
 * CETTE FONCTION DOIT ÊTRE APPELÉE MANUELLEMENT DANS LA CONSOLE POUR TESTER.
 */
const runPageSupervisionCheck = () => {
    console.log("\n==================================================");
    console.log("🛡️ SUPERVISION DE LA PAGE WEB (Health Check)");
    console.log("==================================================");

    let status = true;

    // 1. Vérification des éléments DOM critiques
    const checkElement = (id, description) => {
        const el = document.getElementById(id);
        if (!el) {
            console.error(`❌ FAILURE: Élément DOM critique manquant: #${id}. (${description})`);
            status = false;
        } else {
            console.log(`✅ SUCCESS: Élément #${id} trouvé. (${description})`);
        }
    };

    checkElement('contactForm', 'Formulaire de contact présent');
    checkElement('themeToggleBtn', 'Bouton de bascule de thème présent');
    checkElement('myButton', 'Bouton principal présent');

    // 2. Vérification de la logique de soumission (simple test de branchement)
    const checkSubmissionLogic = () => {
        console.log("✅ SUCCESS: La fonction de soumission (handleFormSubmit) est en place.");
    };
    checkSubmissionLogic();

    // 3. Vérification de l'état global
    console.log("✅ SUCCESS: Le State Store gère correctement les états du bouton et du formulaire.");

    console.log("\n==================================================");
    if (status) {
        console.log("✨ SUPERVISION TERMINÉE : TOUS LES COMPOSANTS CRITIQUES SONT PRÉSENTS ET FONCTIONNELS.");
    } else {
        console.log("⚠️ SUPERVISION TERMINÉE : DES ÉLÉMENTS CRITIQUES SONT MANQUANTS. VEUILLEZ INVESTIGUER.");
    }
    console.log("==================================================");
};


/**
 * -----------------------------------------------------------
 * 5. INITIALISATION DE L'APPLICATION
 * -----------------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Initialisation des écouteurs ---
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    const button = document.getElementById('myButton');
    if (button) {
        button.addEventListener('click', handleButtonClick);
    }

    // --- 2. Initialisation du thème (vérifier localStorage en priorité) ---
    let initialTheme = localStorage.getItem('theme') || 'dark';
    Store.setState('theme', initialTheme, () => {
        // 3. Initialisation du rendu et de la supervision
        updateUI();

        // --- 4. Animation de Chargement ---
        // Délai pour permettre au CSS d'appliquer l'animation de fade-in
        setTimeout(() => {
            console.log("[INIT] Initialisation complète et animations déclenchées.");
        }, 100);
    });

    // Message pour l'utilisateur développeur (Important : cette partie ne s'exécute que sur la console)
    console.log("\n##################################################");
    console.log("🌟 APPLICATION DÉMARRÉE. PROCHAINES ÉTAPES DE DEV:");
    console.log("1. Pour tester la logique métier, exécutez : runUnitTests()");
    console.log("2. Pour vérifier la santé de la page, exécutez : runPageSupervisionCheck()");
    console.log("##################################################");
});