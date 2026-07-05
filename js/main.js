/**
 * ==========================================================================
 * MAESTRO NOTES - MASTER CORE ENGINE (main.js)
 * Manages Persistent Global Workspace Postures & Mood-Reactive Variable States
 * ==========================================================================
 */

// 1. Database Configuration Mapping Array for Sidebar Labels
const MOOD_LABELS = {
    clinical: "Posture: Clinical",
    delulu: "Posture: Delulu",
    creative: "Posture: Creative",
    focus: "Posture: Hyper-Focus",
    apathetic: "Posture: Apathetic",
    anxious: "Posture: Anxious"
};

// 2. Structural Root CSS Variable Property Configurations Matrix
const MOOD_VARIABLES_MAP = {
    clinical: {
        bg: "#020617", 
        text: "#f8fafc", 
        accent: "#6366f1", 
        filter: "none",
        fxHtml: ""
    },
    delulu: {
        bg: "#09050d", 
        text: "#fbcfe8", 
        accent: "#f43f5e", 
        filter: "none",
        fxHtml: '<div class="fx-delulu-sparkle"></div>'
    },
    creative: {
        bg: "#050515", 
        text: "#e0e7ff", 
        accent: "#a855f7", 
        filter: "none",
        fxHtml: '<div class="fx-creative-bar"></div>'
    },
    focus: {
        bg: "#050505", 
        text: "#fde68a", 
        accent: "#f59e0b", 
        filter: "none",
        fxHtml: '<div class="fx-focus-tunnel"></div>'
    },
    apathetic: {
        bg: "#1c1c1e", 
        text: "#a1a1aa", 
        accent: "#52525b", 
        filter: "grayscale(1) contrast(0.8)",
        fxHtml: ""
    },
    anxious: {
        bg: "#020c1b", 
        text: "#bae6fd", 
        accent: "#38bdf8", 
        filter: "none",
        fxHtml: '<div class="fixed inset-0 border-[6px] border-sky-500/10 pointer-events-none animate-pulse"></div>'
    }
};

/**
 * 3. Core Lifecycle Hook: Document Object Model Event Listener
 * Evaluates browser state caching variables immediately upon view rendering
 */
document.addEventListener("DOMContentLoaded", () => {
    // Safely pull historical context out of local storage cache; default to clinical
    const cachedMood = localStorage.getItem("maestro_user_mood") || "clinical";
    
    // Execute theme mutations to map background and text configurations instantly
    executeThemeMutation(cachedMood);
});

/**
 * 4. Interactive Viewport UI Controls
 * Toggles the visibility bounds of the absolute overlay picker modal
 * @param {boolean} shouldShow - True mounts modal display; False hides it
 */
function toggleMoodModal(shouldShow) {
    const modal = document.getElementById("mood-modal");
    if (modal) {
        if (shouldShow) {
            modal.classList.remove("hidden");
        } else {
            modal.classList.add("hidden");
        }
    }
}

/**
 * 5. State Router Action Sequence
 * Caches chosen posture settings and triggers immediate theme modifications
 * @param {string} chosenMood - Key string index of the target theme profile
 */
function updateGlobalMoodState(chosenMood) {
    // Persist system configurations safely across all navigation paths
    localStorage.setItem("maestro_user_mood", chosenMood);
    
    // Trigger runtime layout overrides
    executeThemeMutation(chosenMood);
    
    // Dismiss overlay viewport panel cleanly
    toggleMoodModal(false);
}

/**
 * 6. Low-Level Document Variable Mutator Engine
 * Bypasses compiling clashes by targeting custom system tokens on the document element root
 * @param {string} moodKey - Active target posture configuration rule index
 */
function executeThemeMutation(moodKey) {
    const config = MOOD_VARIABLES_MAP[moodKey] || MOOD_VARIABLES_MAP["clinical"];
    const root = document.documentElement;
    const fxNode = document.getElementById("global-mood-fx-layer");
    const sidebarLabel = document.getElementById("sidebar-current-mood-label");

    // Override root CSS custom property variables cleanly
    root.style.setProperty('--site-bg', config.bg);
    root.style.setProperty('--site-text', config.text);
    root.style.setProperty('--site-accent', config.accent);
    root.style.setProperty('--site-filter', config.filter);
    
    // Apply macro filter alterations directly to body row (required for full apathetic desaturation)
    document.body.style.filter = config.filter;

    // Inject ambient asset html templates securely
    if (fxNode) {
        fxNode.innerHTML = config.fxHtml;
    }

    // Synchronize the text string within the sidebar layout component button
    if (sidebarLabel) {
        sidebarLabel.innerText = MOOD_LABELS[moodKey] || "Posture: Clinical";
    }
    
    console.log(`[State Engine Matrix]: Viewport context synchronized to vector code: '${moodKey.toUpperCase()}'`);
}
