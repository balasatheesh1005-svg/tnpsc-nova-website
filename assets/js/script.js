/* ==========================================================
   TNPSC Nova AI Website V2
   script.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTS
    ========================================== */

    const menuButton = document.getElementById("menuButton");
    const closeMenu = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("overlay");
    const topButton = document.getElementById("topButton");
    const header = document.querySelector("header");

    /* Presentation hooks are added here to keep the HTML changes minimal. */
    document.querySelectorAll("body > section").forEach(section => {

        section.classList.add("reveal-section");

    });

    document.querySelectorAll(

        'a.bg-primary, a[href="#features"].border-2, a.bg-white.text-primary, a.border-white, button.bg-primary'

    ).forEach(button => button.classList.add("button-shine"));

    /* ==========================================
       MOBILE MENU
    ========================================== */

    function openMenu() {

        if (!mobileMenu) return;

        mobileMenu.style.right = "0";

        if (overlay) {

            overlay.classList.remove("hidden");

        }

        document.body.style.overflow = "hidden";

    }

    function hideMenu() {

        if (!mobileMenu) return;

        mobileMenu.style.right = "-100%";

        if (overlay) {

            overlay.classList.add("hidden");

        }

        document.body.style.overflow = "";

    }

    if (menuButton) {

        menuButton.addEventListener("click", openMenu);

    }

    if (closeMenu) {

        closeMenu.addEventListener("click", hideMenu);

    }

    if (overlay) {

        overlay.addEventListener("click", hideMenu);

    }

    /* ==========================================
       NAVBAR SHADOW
    ========================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, { passive: true });

    /* ==========================================
       BACK TO TOP BUTTON
    ========================================== */

    function updateTopButton() {

        if (!topButton) return;

        if (window.scrollY > 500) {

            topButton.style.display = "flex";

            topButton.style.alignItems = "center";

            topButton.style.justifyContent = "center";

        } else {

            topButton.style.display = "none";

        }

    }

    updateTopButton();

    window.addEventListener("scroll", updateTopButton, { passive: true });

    if (topButton) {

        topButton.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const href = this.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

            hideMenu();

        });

    });

    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements = document.querySelectorAll(

        ".reveal, .reveal-section, .fade-up, .zoom, .glow-card"

    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("active", "show");
                observer.unobserve(entry.target);

            });

        }, {

            threshold: 0.12,
            rootMargin: "0px 0px -40px"

        });

        revealElements.forEach((element, index) => {

            element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => element.classList.add("active", "show"));

    }

    /* ==========================================
       COUNTER ANIMATION
    ========================================== */

    const counters = document.querySelectorAll(".stats-box h2");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const text = counter.innerText;

            const target = parseInt(text.replace(/\D/g, ""));

            if (isNaN(target)) return;

            let value = 0;

            const increment = Math.max(1, Math.ceil(target / 60));

            const timer = setInterval(() => {

                value += increment;

                if (value >= target) {

                    value = target;

                    clearInterval(timer);

                }

                if (text.includes("+")) {

                    counter.innerText = value + "+";

                } else if (text.includes("×")) {

                    counter.innerText = value + "×7";

                } else {

                    counter.innerText = value;

                }

            }, 20);

            counterObserver.unobserve(counter);

        });

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* ==========================================
       ACTIVE NAV LINK
    ========================================== */

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 140;

            const height = section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < top + height) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("text-primary");

            const href = link.getAttribute("href");

            if (href === "#" + current) {

                link.classList.add("text-primary");

            }

        });

    }, { passive: true });

    /* ==========================================
       PAGE FADE
    ========================================== */

    document.body.classList.add("fade-page");

    console.log("✅ TNPSC Nova AI Website Loaded");

});
