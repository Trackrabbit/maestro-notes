document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".week-list a");
    const dynamicTitle = document.getElementById("dynamic-title");
    const dynamicWeek = document.getElementById("dynamic-week");
    const dynamicDownload = document.getElementById("dynamic-download");
    const notesContent = document.getElementById("notes-content");
    
    const courseTitles = document.querySelectorAll(".course-title");

    courseTitles.forEach(title => {
        if (!title.querySelector(".toggle-icon")) {
            title.innerHTML = `<span>${title.textContent}</span> <span class="toggle-icon">▶</span>`;
        }

        title.style.cursor = "pointer";
        title.addEventListener("click", () => {
            const parentGroup = title.closest(".course-group");
            const weekList = parentGroup.querySelector(".week-list");
            
            parentGroup.classList.toggle("open");
            if (weekList) {
                weekList.classList.toggle("collapsed");
            }
        });
    });

    const defaultActiveLink = document.querySelector(".week-list a.active");
    if (defaultActiveLink) {
        const parentGroup = defaultActiveLink.closest(".course-group");
        const weekList = parentGroup.querySelector(".week-list");
        const titleToken = parentGroup.querySelector(".course-title");
        
        parentGroup.classList.add("open");
        if (weekList) weekList.classList.remove("collapsed");
        
        loadModuleContent(defaultActiveLink);
    } else {
        // If no link is active, ensure all lists start collapsed by default
        document.querySelectorAll(".week-list").forEach(list => {
            list.classList.add("collapsed");
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            loadModuleContent(link);
        });
    });

    function loadModuleContent(linkElement) {
        const targetContent = linkElement.getAttribute("data-content");
        const courseTitle = linkElement.getAttribute("data-title");
        const weekDesignation = linkElement.getAttribute("data-week");
        const pdfPath = linkElement.getAttribute("data-pdf");

        if (dynamicTitle && courseTitle) dynamicTitle.textContent = courseTitle;
        if (dynamicWeek && weekDesignation) dynamicWeek.textContent = weekDesignation;
        
        if (dynamicDownload && pdfPath) {
            dynamicDownload.setAttribute("href", pdfPath);
        }

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
