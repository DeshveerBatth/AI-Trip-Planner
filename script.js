document.addEventListener("DOMContentLoaded", () => {
    // Smooth scroll for navigation links
    document.querySelectorAll("nav ul li a").forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Reveal contact details
    const revealButton = document.querySelector(".reveal-btn");
    const contactInfo = document.getElementById("contact-info");

    revealButton.addEventListener("click", () => {
        contactInfo.innerHTML = `
            <p><strong>Name:</strong> Deshveer Singh</p>
            <p><strong>Phone:</strong> 989460007</p>
            <p><strong>Email:</strong> deshveerbatth@gmail.com</p>
        `;
        revealButton.style.display = "none"; // Hide the button after revealing details
    });
});
