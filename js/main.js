// ==========================================================================
// MAESTRO NOTES - CORE WORKSPACE APPLICATION SCRIPT
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".week-list a");
    const dynamicTitle = document.getElementById("dynamic-title");
    const dynamicWeek = document.getElementById("dynamic-week");
    const dynamicDownload = document.getElementById("dynamic-download");
    const notesContent = document.getElementById("notes-content");

    // Initialize Workspace with Current Default Selection Link
    const activeLink = document.querySelector(".week-list a.active");
    if (activeLink) {
        loadModuleContent(activeLink);
    }

    // Register Click Event Handlers across Sidebar Elements
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            loadModuleContent(link);
        });
    });

    /**
     // Funnels custom data properties straight into your interface header blocks
     */
    function loadModuleContent(linkElement) {
        const targetContent = linkElement.getAttribute("data-content");
        const courseTitle = linkElement.getAttribute("data-title");
        const weekDesignation = linkElement.getAttribute("data-week");
        const pdfPath = linkElement.getAttribute("data-pdf");

        // Inject Content Header Strings Dynamically
        if (dynamicTitle && courseTitle) dynamicTitle.textContent = courseTitle;
        if (dynamicWeek && weekDesignation) dynamicWeek.textContent = weekDesignation;
        
        // Safety Fallback Check: Route anchor pointer paths to target assets folder safely
        if (dynamicDownload && pdfPath) {
            dynamicDownload.setAttribute("href", pdfPath);
        }

        // Asynchronously Fetch and Mount Target HTML Payload Components
        notesContent.innerHTML = "<p>Loading module contents...</p>";
        fetch(targetContent)
            .then(response => {
                if (!response.ok) throw new Error(`Could not locate content file resource at path: ${targetContent}`);
                return response.text();
            })
            .then(html => {
                notesContent.innerHTML = html;
            })
            .catch(err => {
                notesContent.innerHTML = `<p style="color: #ef4444; padding: 12px; font-weight: 500;">Workspace Routing Error: ${err.message}</p>`;
            });
    }
});
