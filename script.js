/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuBtn.textContent = isOpen
            ? "✕"
            : "☰";

    });


    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.textContent = "☰";

        });

    });

}


/* =====================================================
   NAVBAR SHADOW ON SCROLL
===================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}, {
    passive: true
});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   PROJECT FILTER
===================================================== */

const filters =
    document.querySelectorAll(".filter");

const projectCards =
    document.querySelectorAll(".project-card");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        const selected =
            filter.dataset.filter;


        /* Active button */

        filters.forEach(button => {

            button.classList.remove("active");

        });

        filter.classList.add("active");


        /* Filter projects */

        projectCards.forEach(card => {

            const categories =
                card.dataset.category
                    .split(" ");


            if (
                selected === "all" ||
                categories.includes(selected)
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters =
    document.querySelectorAll("[data-counter]");


function animateCounter(element) {

    const target =
        Number(element.dataset.counter);

    const duration = 1200;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );


        const current =
            Math.floor(
                eased * target
            );


        element.textContent =
            current;


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                target;

        }

    }


    requestAnimationFrame(
        updateCounter
    );
}


const counterObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                animateCounter(
                    entry.target
                );

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.5
        }
    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        "nav a"
    );


const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                const id =
                    entry.target.getAttribute("id");


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute("href") ===
                        `#${id}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =====================================================
   PROJECT IMAGE ERROR HANDLING
===================================================== */

document
    .querySelectorAll(".project-screenshot img, .project-gallery img, .logo-preview img, .company-logo img")
    .forEach(image => {

        image.addEventListener("error", () => {

            image.style.display = "none";

            const parent =
                image.parentElement;

            if (parent) {

                parent.classList.add(
                    "image-missing"
                );

            }

        });

    });


/* =====================================================
   CURRENT YEAR
===================================================== */

const yearElements =
    document.querySelectorAll(
        "[data-current-year]"
    );

yearElements.forEach(element => {

    element.textContent =
        new Date().getFullYear();

});