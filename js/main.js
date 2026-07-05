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
