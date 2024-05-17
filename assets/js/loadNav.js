// document.addEventListener("DOMContentLoaded", function() {
//     fetch("nav.html")
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById("nav-placeholder").innerHTML = data;
//         });
// });
document.addEventListener("DOMContentLoaded", function() {
    fetch("nav.html")
        .then(response => response.text())
        .then(data => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;
            const navElement = tempDiv.querySelector('nav');
            if (navElement) {
                document.getElementById("nav-placeholder").innerHTML = navElement.outerHTML;

                // Reinitialize navigation functions
                initializeNavFunctions();
            } else {
                console.error("Navigation element not found in nav.html");
            }
        });
});

function initializeNavFunctions() {
    var $window = $(window),
        $body = $('body');

    // Dropdowns.
    $('#nav > ul').dropotron({
        mode: 'fade',
        noOpenerFade: true,
        alignment: 'center',
        detach: false
    });

    // Title Bar.
    var logoElement = $('#logo h1');
    if (logoElement.length > 0) {
        $('<div id="titleBar">' +
            '<a href="#navPanel" class="toggle"></a>' +
            '<span class="title">' + logoElement.html() + '</span>' +
          '</div>'
        ).appendTo($body);

        // Panel.
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

        // Scroll effect
        // Scroll effect
    let lastScrollTop = 0;

    // Ensure the nav element is selected after it's added to the DOM
    setTimeout(() => {
        const nav = document.getElementById("nav");

        if (nav) {
            window.addEventListener("scroll", function() {
                let scrollTop = window.scrollY || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTop) {
                    // Scrolling down
                    nav.style.top = "-100px"; // Hide nav (adjust -100px based on nav height)
                } else {
                    // Scrolling up
                    nav.style.top = "2.5em"; // Show nav (matches initial position)
                }
                lastScrollTop = scrollTop;
            });
        } else {
            console.error("Navigation element not found");
        }
    }, 0);

        // Function to handle smooth scrolling
        function smoothScrollToFooter(event) {
            event.preventDefault(); // Prevent the default anchor click behavior
            document.getElementById('footer').scrollIntoView({
                behavior: 'smooth' // Smooth scrolling
            });
        }

        // Attach event listeners
        document.getElementById('contact-us-link').addEventListener('click', smoothScrollToFooter);
    }
}
