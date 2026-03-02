// for mobile menu

const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");

// show drop-down menu on clicking the burger icon
burgerIcon.addEventListener("click", () => {
	navbarMenu.classList.toggle("is-active");
});

document.addEventListener("DOMContentLoaded", () => {
	// Functions to open and close a modal
	function openModal($el) {
		$el.classList.add("is-active");
	}

	function closeModal($el) {
		$el.classList.remove("is-active");
	}

	function closeAllModals() {
		(document.querySelectorAll(".modal") || []).forEach(($modal) => {
			closeModal($modal);
		});
	}

	// Add a click event on buttons to open a specific modal
	(document.querySelectorAll(".cite-trigger") || []).forEach(($trigger) => {
		const modal = $trigger.dataset.target;
		const $target = document.getElementById(modal);
		if (!$target) return;

		$trigger.addEventListener("click", () => {
			openModal($target);
		});
	});

	// Publication card cite buttons: copy BibTeX directly with visual feedback.
	(document.querySelectorAll(".cite-copy-trigger") || []).forEach(($trigger) => {
		$trigger.addEventListener("click", async () => {
			const bibTargetId = $trigger.dataset.bibTarget;
			if (!bibTargetId) return;
			const bibNode = document.getElementById(bibTargetId);
			if (!bibNode) return;

			const originalLabel = $trigger.textContent;
			const citation = bibNode.textContent;
			try {
				await navigator.clipboard.writeText(citation);
				$trigger.textContent = "Copied";
			} catch (err) {
				$trigger.textContent = "Copy Failed";
			}
			setTimeout(() => {
				$trigger.textContent = originalLabel;
			}, 1500);
		});
	});

	// Add a click event on various child elements to close the parent modal
	(
		document.querySelectorAll(
			".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
		) || []
	).forEach(($close) => {
		const $target = $close.closest(".modal");

		$close.addEventListener("click", () => {
			closeModal($target);
		});
	});

	// Add a keyboard event to close all modals
	document.addEventListener("keydown", (event) => {
		const e = event || window.event;

		if (e.keyCode === 27) {
			// Escape key
			closeAllModals();
		}
	});

	// Scroll reveal for cards/sections
	const revealElements = document.querySelectorAll(".reveal-on-scroll");
	const revealTiming = {
		experience: { delayStep: 70, duration: 620 },
		projects: { delayStep: 90, duration: 520 },
		"how-i-work": { delayStep: 110, duration: 560 },
		contact: { delayStep: 80, duration: 500 },
		default: { delayStep: 60, duration: 520 },
	};

	// Assign per-section stagger and timing so each section has a distinct motion rhythm.
	const sectionCounters = {};
	revealElements.forEach((el) => {
		const section = el.closest("section");
		const sectionId = section?.id || "default";
		const config = revealTiming[sectionId] || revealTiming.default;
		sectionCounters[sectionId] = (sectionCounters[sectionId] || 0) + 1;
		const idx = sectionCounters[sectionId] - 1;
		const delay = Math.min(idx * config.delayStep, 420);
		el.style.transitionDelay = `${delay}ms`;
		el.style.transitionDuration = `${config.duration}ms`;
	});

	if ("IntersectionObserver" in window && revealElements.length) {
		const revealObserver = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
		);
		revealElements.forEach((el) => revealObserver.observe(el));
	} else {
		revealElements.forEach((el) => el.classList.add("is-visible"));
	}

	// Active navbar link by visible section.
	const navLinks = Array.from(
		document.querySelectorAll(".main-navbar .navbar-item[href^='#']")
	);
	const navSections = navLinks
		.map((link) => {
			const id = link.getAttribute("href")?.slice(1);
			const section = id ? document.getElementById(id) : null;
			return section ? { link, section } : null;
		})
		.filter(Boolean)
		.sort((a, b) => a.section.offsetTop - b.section.offsetTop);

	const setActiveLink = (activeLink) => {
		navLinks.forEach((link) => {
			link.classList.toggle("is-active-section", link === activeLink);
		});
	};

	const updateActiveSection = () => {
		if (!navSections.length) return;
		const navbar = document.querySelector(".main-navbar");
		const navHeight = navbar ? navbar.offsetHeight : 0;
		const probeLine = window.scrollY + navHeight + 28;

		let active = navSections[0];
		for (let i = 0; i < navSections.length; i++) {
			const current = navSections[i];
			if (probeLine >= current.section.offsetTop) {
				active = current;
			} else {
				break;
			}
		}

		const nearBottom =
			window.innerHeight + window.scrollY >=
			document.documentElement.scrollHeight - 4;
		if (nearBottom) {
			active = navSections[navSections.length - 1];
		}

		setActiveLink(active.link);
	};

	let ticking = false;
	const scheduleNavUpdate = () => {
		if (ticking) return;
		ticking = true;
		window.requestAnimationFrame(() => {
			updateActiveSection();
			ticking = false;
		});
	};

	window.addEventListener("scroll", scheduleNavUpdate, { passive: true });
	window.addEventListener("resize", scheduleNavUpdate);
	updateActiveSection();

});

function copyBib(tagid) {
	var bib = document.getElementById(tagid).textContent;
	navigator.clipboard.writeText(bib);
	alert("Copied the text: " + bib);
}

// theme toggle
function switchTheme() {
	var checkBox = document.getElementById("theme-toggle");
	var darkmodeLink = document.getElementById("darkmode-css");
	var myStylesheet = document.getElementById("my-css");

	if (checkBox.checked == true) {
		// darkmodeLink.setAttribute("href", "styles/bulma-prefers-dark.css");
		myStylesheet.setAttribute("href", "styles/darkmode.css");
	} else {
		darkmodeLink.setAttribute("href", "");
		myStylesheet.setAttribute("href", "styles/lightmode.css");
	}
}

function goToTop() {
	document.body.scrollIntoView({
		behavior: "smooth",
	});
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
	scrollFunction();
};

function scrollFunction() {
	var topButton = document.getElementById("topBtn");
	if (
		document.body.scrollTop > 1000 ||
		document.documentElement.scrollTop > 1000
	) {
		topButton.classList.remove("hidden");
	} else {
		topButton.classList.add("hidden");
	}
}
