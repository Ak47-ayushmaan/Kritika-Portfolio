"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");

  if (toggle && nav) {
    function closeMenu() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation",
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("is-open") &&
        !nav.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // Handle both profile image locations.
  document
    .querySelectorAll(".profile-image, .gallery-image")
    .forEach((image) => {
      const placeholder = image.parentElement.querySelector(
        ".photo-placeholder, .gallery-placeholder",
      );
      if (!placeholder) return;

      const url = image.getAttribute("src")?.trim() || "";

      function showPlaceholder() {
        image.style.display = "none";
        placeholder.style.display = "flex";
      }

      function showImage() {
        image.style.display = "block";
        placeholder.style.display = "none";
      }

      image.addEventListener("load", showImage);
      image.addEventListener("error", showPlaceholder);

      if (!url || url === "PASTE_YOUR_DIRECT_IMAGE_URL_HERE") {
        showPlaceholder();
      } else if (image.complete) {
        image.naturalWidth > 0 ? showImage() : showPlaceholder();
      }
    });
});
