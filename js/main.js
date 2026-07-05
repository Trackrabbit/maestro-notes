document.addEventListener("DOMContentLoaded", () => {
    console.log("Maestro Notes initialized.");
    
    const navLinks = document.querySelectorAll(".week-list a");
    const contentContainer = document.getElementById("notes-content");
    const dynamicTitle = document.getElementById("dynamic-title");
    const dynamicDownload = document.getElementById("dynamic-download");

    async function loadContent(contentPath, pdfPath, title) {
        try {
            contentContainer.innerHTML = "<p>Loading...</p>";
            
            // Fetch the HTML snippet from the content folder
            const response = await fetch(`content/${contentPath}`);
            
            if (!response.ok) throw new Error("Notes not found.");
            
            const html = await response.text();
            
            // Inject the HTML, update the title, and update the PDF link
            contentContainer.innerHTML = html;
            dynamicTitle.textContent = title;
            dynamicDownload.href = `assets/${pdfPath}`;
            dynamicDownload.setAttribute("download", pdfPath.split('/').pop());
            
        } catch (error) {
            contentContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); 
            
            navLinks.forEach(nav => nav.classList.remove("active"));
            link.classList.add("active");

            const targetContent = link.getAttribute("data-content");
            const targetPdf = link.getAttribute("data-pdf");
            const newTitle = link.getAttribute("data-title");

            loadContent(targetContent, targetPdf, newTitle);
        });
    });

    // Automatically load the first active link on page load
    const initialLink = document.querySelector(".week-list a.active");
    if(initialLink) {
        loadContent(
            initialLink.getAttribute("data-content"), 
            initialLink.getAttribute("data-pdf"), 
            initialLink.getAttribute("data-title")
        );
    }
});

/**
 * Unified Curriculum Mood-Reactive State Engine
 * Manages UI theme parameters, style overrides, and cross-page state memory
 */

const MOOD_THEME_MAP = {
    clinical: {
        bodyClass: "bg-slate-950 text-slate-100 border-slate-800",
        fxHtml: ""
    },
    delulu: {
        bodyClass: "bg-zinc-950 text-pink-200 border-pink-500/20",
        fxHtml: '<div class="mood-delulu-sparkle"></div>'
    },
    creative: {
        bodyClass: "bg-slate-950 text-indigo-100 border-purple-900/40",
        fxHtml: '<div class="mood-creative-bar"></div><div class="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent pointer-events-none"></div>'
    },
    focus: {
        bodyClass: "bg-neutral-950 text-amber-200 border-amber-900/30 font-mono",
        fxHtml: '<div class="mood-focus-tunnel"></div>'
    },
    apathetic: {
        bodyClass: "bg-zinc-900 text-zinc-400 border-zinc-700 grayscale contrast-75",
        fxHtml: ""
    },
    anxious: {
        bodyClass: "bg-slate-950 text-sky-200 border-sky-950/40",
        fxHtml: '<div class="fixed inset-0 border-4 border-sky-500/10 pointer-events-none animate-pulse"></div>'
    },
    stressed: {
        bodyClass: "bg-stone-950 text-stone-200 border-stone-800 shadow-inner",
        fxHtml: ""
    }
};

// Initialize configuration rules on document load cycles
document.addEventListener("DOMContentLoaded", () => {
    const cachedMood = localStorage.getItem("maestro_user_mood") || "clinical";
    
    const selector = document.getElementById("global-mood-select");
    if (selector) {
        selector.value = cachedMood;
    }
    
    executeThemeMutation(cachedMood);
});

function updateGlobalMoodState(chosenMood) {
    localStorage.setItem("maestro_user_mood", chosenMood);
    executeThemeMutation(chosenMood);
}

function executeThemeMutation(moodKey) {
    const config = MOOD_THEME_MAP[moodKey] || MOOD_THEME_MAP["clinical"];
    const body = document.body;
    const fxNode = document.getElementById("global-mood-fx-layer");

    // Clear previous mood class configurations smoothly
    Object.values(MOOD_THEME_MAP).forEach(item => {
        item.bodyClass.split(" ").forEach(className => {
            if (className) body.classList.remove(className);
        });
    });

    // Inject active theme parameter tokens
    config.bodyClass.split(" ").forEach(className => {
        if (className) body.classList.add(className);
    });

    // Remount ambient graphic layers
    if (fxNode) {
        fxNode.innerHTML = config.fxHtml;
    }
    
    console.log(`[State Synchronizer]: Layout transformed to workspace posture: '${moodKey.toUpperCase()}'`);
}
