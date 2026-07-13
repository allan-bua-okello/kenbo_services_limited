const menuButton = document.querySelector("[data-menu-button]");
const searchButton = document.querySelector("[data-search-button]");
const closeButton = document.querySelector("[data-close-button]");
const navItems = document.querySelector("[data-nav-items]");
const searchForm = document.querySelector("[data-search-form]");

function closePanels() {
  navItems?.classList.remove("is-open");
  searchForm?.classList.remove("is-open");
  closeButton?.classList.remove("is-visible");
  menuButton?.classList.remove("is-hidden");
  searchButton?.classList.remove("is-hidden");
}

menuButton?.addEventListener("click", () => {
  navItems?.classList.add("is-open");
  searchForm?.classList.remove("is-open");
  closeButton?.classList.add("is-visible");
  menuButton?.classList.add("is-hidden");
  searchButton?.classList.add("is-hidden");
});

searchButton?.addEventListener("click", () => {
  searchForm?.classList.add("is-open");
  navItems?.classList.remove("is-open");
  closeButton?.classList.add("is-visible");
  searchButton?.classList.add("is-hidden");
});

closeButton?.addEventListener("click", closePanels);

searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchForm.querySelector("input")?.value.trim().toLowerCase();
  if (!query) return;

  const pages = [
    { keywords: ["home", "kenbo", "welcome"], url: "index.html" },
    { keywords: ["about", "company", "experience", "team"], url: "aboutus.html" },
    { keywords: ["service", "civil", "road", "plumbing", "electrical", "bridge", "well"], url: "services.html" },
    { keywords: ["gallery", "projects", "photos", "plans"], url: "gallery.html" },
    { keywords: ["contact", "phone", "email", "location", "quote"], url: "contactus.html" },
  ];

  const match = pages.find((page) => page.keywords.some((keyword) => keyword.includes(query) || query.includes(keyword)));
  window.location.href = match ? match.url : "services.html";
});

const slideshow = document.querySelector("[data-slideshow]");
if (slideshow) {
  const slides = [...slideshow.querySelectorAll("[data-slide]")];
  let activeIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === index);
    });
  }

  showSlide(activeIndex);
  window.setInterval(() => {
    activeIndex = (activeIndex + 1) % slides.length;
    showSlide(activeIndex);
  }, 5000);
}

const popup = document.querySelector("[data-gallery-popup]");
if (popup) {
  const popupImage = popup.querySelector("img");
  const popupCaption = popup.querySelector("[data-popup-caption]");
  const closePopup = popup.querySelector("[data-popup-close]");

  document.querySelectorAll("[data-gallery-image]").forEach((image) => {
    image.addEventListener("click", () => {
      popupImage.src = image.src;
      popupImage.alt = image.alt;
      popupCaption.textContent = image.closest("figure")?.querySelector("figcaption")?.textContent || image.alt;
      popup.classList.add("is-open");
    });
  });

  closePopup?.addEventListener("click", () => popup.classList.remove("is-open"));
  popup.addEventListener("click", (event) => {
    if (event.target === popup) popup.classList.remove("is-open");
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") popup.classList.remove("is-open");
  });
}
