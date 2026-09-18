// ==========================================
// SIDEBAR ACTIVE MENU
// ==========================================

const menuLinks = document.querySelectorAll(".menu-link");
const sections = document.querySelectorAll("section[id]");

function updateActiveMenu() {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.id;
        }

    });

    menuLinks.forEach(link => {

        link.parentElement.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.parentElement.classList.add("active");
        }

    });

}

// Saat halaman di-scroll
window.addEventListener("scroll", updateActiveMenu);

// Saat menu diklik
menuLinks.forEach(link => {

    link.addEventListener("click", function () {

        menuLinks.forEach(item => {

            item.parentElement.classList.remove("active");

        });

        this.parentElement.classList.add("active");

    });

});

// Jalankan saat pertama kali halaman dibuka
updateActiveMenu();