
document.addEventListener("DOMContentLoaded", function () {

    // 1. Select HTML elements using DOM methods
    const menuButton = document.querySelector("#menu-toggle");
    const navigation = document.querySelector("#nav-links");

    const messageButton = document.querySelector("#message-button");
    const dynamicMessage = document.querySelector("#dynamic-message");

    const contactForm = document.querySelector("#contact-form");
    const formMessage = document.querySelector("#form-message");

    const yearElement = document.querySelector("#current-year");


    // 2. Interactive navigation menu
    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {

            navigation.classList.toggle("active");

            const menuIsOpen = navigation.classList.contains("active");

            menuButton.setAttribute("aria-expanded", menuIsOpen);
            menuButton.setAttribute(
                "aria-label",
                menuIsOpen ? "Close navigation menu" : "Open navigation menu"
            );

            menuButton.textContent = menuIsOpen ? "✕" : "☰";
        });

        // Close the mobile menu after a navigation link is clicked
        const navigationLinks = navigation.querySelectorAll("a");

        navigationLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("active");
                menuButton.textContent = "☰";
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });
    }


    // 3. Dynamic content button
    if (messageButton && dynamicMessage) {
        messageButton.addEventListener("click", function () {

            if (dynamicMessage.textContent.trim() === "") {
                dynamicMessage.textContent =
                    "I am passionate about technology, web development, " +
                    "databases and information systems. I enjoy learning " +
                    "new skills and using technology to solve problems.";

                messageButton.textContent = "Show Less";
            } else {
                dynamicMessage.textContent = "";
                messageButton.textContent = "Learn More About Me";
            }
        });
    }


    // 4. Contact form validation function
    function validateContactForm(name, email, message) {

        // Check that all fields have been completed
        if (name === "" || email === "" || message === "") {
            return {
                valid: false,
                message: "Please fill in all the required fields."
            };
        }

        // Check the email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return {
                valid: false,
                message: "Please enter a valid email address."
            };
        }

        // Check that the message is not just empty spaces
        if (message.length < 5) {
            return {
                valid: false,
                message: "Your message must contain at least 5 characters."
            };
        }

        return {
            valid: true,
            message: "Thank you, " + name +
                "! Your form has passed validation."
        };
    }


    // 5. Listen for contact form submission
    if (contactForm && formMessage) {
        contactForm.addEventListener("submit", function (event) {

            // Prevent the page from reloading
            event.preventDefault();

            // Get the values entered by the user
            const name = document
                .querySelector("#contact-name")
                .value.trim();

            const email = document
                .querySelector("#contact-email")
                .value.trim();

            const message = document
                .querySelector("#contact-message")
                .value.trim();

            // Call the validation function
            const result = validateContactForm(name, email, message);

            // Use a conditional statement to display the result
            if (result.valid) {
                formMessage.textContent = result.message;
                formMessage.className = "success-message";

                // Clear the form after successful validation
                contactForm.reset();
            } else {
                formMessage.textContent = result.message;
                formMessage.className = "error-message";
            }
        });
    }


    // 6. Update the copyright year automatically
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

});
