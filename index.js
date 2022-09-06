let mobileNav = document.getElementById("mobile-nav");
let closeBTN = document.getElementById("close-mobile-nav");
let hamburgerBTN = document.getElementById("hamburger-menu");
closeBTN.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});
hamburgerBTN.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});

// Contact Me Page
let contactModalButton = document.getElementById("contact-form-modal-button");
let contactModal = document.getElementById("contact-form-modal");
let currentURL = window.location.href;
let indexSlash = currentURL.indexOf("/", 8);
let finalURL = currentURL.substring(0, indexSlash) + "/contact-me.html";
contactModalButton.addEventListener("click", () => {
  window.location.replace(finalURL);
  contactModal.classList.toggle("hidden");
});
