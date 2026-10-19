/* =========================================
   1. WEDDING COUNTDOWN
========================================= */

// Change the date and time to match the wedding.
const weddingDate = new Date("June 20, 2027 17:30:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (distance <= 0) {

        daysElement.textContent = "000";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    daysElement.textContent = String(days).padStart(3, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

// Update immediately, then every second.
updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   2. MOBILE NAVIGATION
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navbar.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });

    // Close the menu after clicking a navigation link.
    navbar.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation");

        });

    });

    // Close the menu if the user clicks outside it.
    document.addEventListener("click", function (event) {

        const clickedInsideMenu = navbar.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            navbar.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute("aria-label", "Open navigation");

        }

    });

}


/* =========================================
   3. DEMO RSVP FORM
========================================= */

const rsvpForm = document.getElementById("rsvpForm");
const formMessage = document.getElementById("formMessage");

if (rsvpForm && formMessage) {

    rsvpForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!rsvpForm.checkValidity()) {

            rsvpForm.reportValidity();

            return;
        }

        const guestName = document
            .getElementById("guestName")
            .value
            .trim();

        const attendance = document
            .getElementById("attendance")
            .value;

        const guestCount = document
            .getElementById("guestCount")
            .value;

        const guestEmail = document
            .getElementById("guestEmail")
            .value
            .trim();

        const message = document
            .getElementById("message")
            .value
            .trim();

        const response = {
            name: guestName,
            email: guestEmail,
            attendance: attendance,
            guests: guestCount,
            message: message,
            submittedAt: new Date().toISOString()
        };

        // Demo only: save responses in this browser.
        let responses = [];

        try {

            const savedResponses = localStorage.getItem("invitedRSVPs");

            if (savedResponses) {
                responses = JSON.parse(savedResponses);

                if (!Array.isArray(responses)) {
                    responses = [];
                }
            }

            responses.push(response);

            localStorage.setItem(
                "invitedRSVPs",
                JSON.stringify(responses)
            );

        } catch (error) {

            formMessage.textContent =
                "Your browser could not save this response. Please try again.";

            return;

        }

        if (attendance === "yes") {

            formMessage.textContent =
                `Thank you, ${guestName}! We can't wait to celebrate with you.`;

        } else {

            formMessage.textContent =
                `Thank you for letting us know, ${guestName}. You'll be missed!`;

        }

        rsvpForm.reset();

    });

}