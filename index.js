// for mobile menu

const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

// show drop-down menu on clicking the burger icon
burgerIcon.addEventListener("click", () => {
    navbarMenu.classList.toggle('is-active')
})


document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.cite-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
        console.log($target);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});


function copyBib(tagid) {
    var bib = document.getElementById(tagid).textContent;
    navigator.clipboard.writeText(bib);
    alert("Copied the text: " + bib);
    console.log(bib);
}

// theme toggle
function switchTheme() {
    var checkBox = document.getElementById("theme-toggle");
    var darkmodeLink = document.getElementById("darkmode-css");
    var myStylesheet = document.getElementById("my-css");

    if (checkBox.checked == true) {
        darkmodeLink.setAttribute("href", "styles/bulma-prefers-dark.css");
        myStylesheet.setAttribute("href", "styles/darkmode.css");

    }
    else {
        darkmodeLink.setAttribute("href", "");
        myStylesheet.setAttribute("href", "styles/lightmode.css");
    }
}