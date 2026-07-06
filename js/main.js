function exportActiveLessonToPDF() {
    window.print();
}

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".week-list a");
    const dynamicTitle = document.getElementById("dynamic-title");
    const dynamicWeek = document.getElementById("dynamic-week");
    const notesContent = document.getElementById("notes-content");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // 1. Clear previous active link highlights and set current
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // 2. Fetch declarative course values from click target attributes
            const targetContent = link.getAttribute("data-content");
            const courseTitle = link.getAttribute("data-title");
            const weekDesignation = link.getAttribute("data-week");

            // 3. Update Text Content Headers (No more setting .href!)
            if (dynamicTitle && courseTitle) {
                dynamicTitle.textContent = courseTitle;
            }
            if (dynamicWeek && weekDesignation) {
                dynamicWeek.textContent = weekDesignation;
            }

            // 4. Asynchronously fetch and load the clean content payload html file
            notesContent.innerHTML = "<p>Loading content...</p>";
            fetch(targetContent)
                .then(response => {
                    if (!response.ok) throw new Error("Module content file not found.");
                    return response.text();
                })
                .then(html => {
                    notesContent.innerHTML = html;
                })
                .catch(err => {
                    notesContent.innerHTML = `<p style="color: #ef4444;">Error loading module: ${err.message}</p>`;
                });
        });
    });
});
