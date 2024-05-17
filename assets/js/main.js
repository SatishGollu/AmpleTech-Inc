(function($) {
    var $window = $(window),
        $body = $('body');

    // Breakpoints.
    breakpoints({
        xlarge: ['1281px', '1680px'],
        large: ['981px', '1280px'],
        medium: ['737px', '980px'],
        small: [null, '736px']
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
            // $body.addClass('page-enter');
        }, 100);
    });

    // Dropdowns.
    function initializeDropotron() {
        $('#nav > ul').dropotron({
            mode: 'fade',
            noOpenerFade: true,
            alignment: 'center',
            detach: false
        });
    }

    // Title Bar and Panel.
    function initializeNavPanel() {
        var logoElement = $('#logo h1');
        if (logoElement.length > 0) {
            $('<div id="titleBar">' +
                '<a href="#navPanel" class="toggle"></a>' +
                '<span class="title">' + logoElement.html() + '</span>' +
              '</div>'
            ).appendTo($body);

            $('<div id="navPanel">' +
                '<nav>' +
                  $('#nav').navList() +
                '</nav>' +
              '</div>'
            ).appendTo($body)
              .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'left',
                target: $body,
                visibleClass: 'navPanel-visible'
              });
        } else {
            console.error("Logo element not found");
        }
    }

    // Typing effect
    const phrases = ["top talent.", "innovative minds.", "visionary leaders."];
    let currentPhrase = 0;
    let isDeleting = false;
    let textElement = document.getElementById('dynamic-text');
    let typingSpeed = 100;
    let currentText = '';

    function typePhrase() {
        const fullText = phrases[currentPhrase % phrases.length];

        if (isDeleting) {
            currentText = fullText.substring(0, currentText.length - 1);
        } else {
            currentText = fullText.substring(0, currentText.length + 1);
        }

        if (textElement) {
            textElement.innerHTML = currentText;
        }

        let typeSpeed = typingSpeed;
        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && currentText === fullText) {
            typeSpeed = 300;  // Pause at end of typing
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typeSpeed = 500;  // Pause before starting next phrase
        }

        setTimeout(typePhrase, typeSpeed);
    }

    document.addEventListener('DOMContentLoaded', function() {
        if (textElement) {
            setTimeout(typePhrase, typingSpeed);
        }

        // Initialize navigation panel
        initializeNavPanel();

        // Initialize dropotron
        initializeDropotron();

        // Smooth scroll function
        function smoothScrollToFooter(event) {
            event.preventDefault(); // Prevent the default anchor click behavior
            if (window.location.pathname.endsWith('index.html')) {
                document.getElementById('footer').scrollIntoView({
                    behavior: 'smooth' // Smooth scrolling
                });
            } else {
                window.location.href = 'index.html#footer';
            }
        }

        // Attach event listeners
        // Attach event listeners
    const contactUsLink = document.getElementById('contact-us-link');
    if (contactUsLink) {
        contactUsLink.addEventListener('click', smoothScrollToFooter);
    }

    const joinUsLink = document.getElementById('join-us-link');
    if (joinUsLink) {
        joinUsLink.addEventListener('click', smoothScrollToFooter);
    }

    const partnerUsLink = document.getElementById('partner-us-link');
    if (partnerUsLink) {
        partnerUsLink.addEventListener('click', smoothScrollToFooter);
    }

    const teamUsLink = document.getElementById('team-us-link');
    if (teamUsLink) {
        teamUsLink.addEventListener('click', smoothScrollToFooter);
    }


        // Initialize emailJS
        emailjs.init("TI7fPtVNlczEvt1Mc");

        document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Collect form data
            var fullName = document.getElementById('fullName').value;
            var email = document.getElementById('email_id').value;
            var message = document.getElementById('message').value;

            // Validate email
            if (!validateEmail(email)) {
                showModal('Please enter a correct email address.');
                return;
            }

            // Disable the send button to prevent multiple submissions
            var sendButton = document.querySelector('.send-button');
            sendButton.disabled = true;
            sendButton.value = 'Sending...';

            // Send the email using EmailJS
            emailjs.send('service_ebsjl36', 'template_89wle0v', {
                from_name: fullName,
                email_id: email,
                message: message
            }).then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showModal("Thank you for reaching out! We have received your message and will get back to you shortly.");
                sendButton.disabled = false; // Re-enable the send button
                sendButton.value = 'Send';
                document.getElementById('contact-form').reset(); // Reset the form
            }, function(error) {
                console.log('FAILED...', error);
                showModal('Failed to send message.');
                sendButton.disabled = false; // Re-enable the send button
                sendButton.value = 'Send';
            });
        });

        function validateEmail(email) {
            var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email) && email.endsWith('.com');
        }

        function showModal(message) {
            var modal = document.getElementById('modal');
            var modalMessage = document.getElementById('modal-message');
            var closeButton = document.getElementById('close-button');
            var closeBtn = document.getElementById('modal-close-btn');

            modalMessage.textContent = message;
            modal.style.display = 'block';

            closeButton.onclick = function() {
                modal.style.display = 'none';
            };

            closeBtn.onclick = function() {
                modal.style.display = 'none';
            };

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            };
        }
    });

})(jQuery);
