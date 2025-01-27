document.addEventListener("DOMContentLoaded", () => {
  // MENU DRAWER CLOSE JS START
  const closeButton = document.querySelector(".menu-drawer__menu .icon-close");
  const overlay = document.querySelector(".menu-drawer__overlay");

  if (closeButton && overlay) {
    closeButton.addEventListener("click", () => {
      console.log("close clicked===============");
      document.getElementById("Details-menu-drawer-container").removeAttribute("open");
      document.getElementById("Details-menu-drawer-container").classList.remove("menu-opening");
      document.querySelector("#Details-menu-drawer-container .header__icon").setAttribute("aria-expanded", "false");
    });

    overlay.addEventListener("click", () => {
      console.log("overlay clicked===============");
      document.getElementById("Details-menu-drawer-container").removeAttribute("open");
      document.getElementById("Details-menu-drawer-container").classList.remove("menu-opening");
      document.querySelector("#Details-menu-drawer-container .header__icon").setAttribute("aria-expanded", "false");
    });
  } else {
    console.error("Elements not found");
  }
  // MENU DRAWER CLOSE JS END

  // TOGGLE SWITCH JS START

  // Add event listener to toggle dark mode
  document.getElementById("modeToggle")?.addEventListener("change", function () {
    const body = document.body;
    body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
  });
  // Apply dark mode on initial page load
  applyDarkMode();

  function applyDarkMode() {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    const modeToggle = document.getElementById("modeToggle");
    const body = document.body;

    if (isDarkMode) {
      body.classList.add("dark-mode");
      modeToggle && (modeToggle.checked = true);
    } else {
      body.classList.remove("dark-mode");
      modeToggle && (modeToggle.checked = false);
    }
  }
  // TOGGLE SWITCH JS END

  // EXTRA STRAP MODAL OPEN/CLOSE JS START
  var strap_heading = document.querySelector(".product-block--strap_heading");
  strap_heading?.addEventListener("click", function () {
    document.querySelector(".strap_modal").style.display = "block";
    document.querySelector(".strap_modal").classList.add("active");
    document.querySelector(".strap_modal_overlay").classList.add("active");
    document.querySelector("body").classList.add("overflow-hidden");
    addonStrapFlickitySliderInitialize();
  });

  var strap_modal_close = document.querySelector(".strap_modal .close");
  strap_modal_close?.addEventListener("click", function () {
    document.querySelector(".strap_modal").style.display = "none";
    document.querySelector(".strap_modal").classList.remove("active");
    document.querySelector(".strap_modal_overlay").classList.remove("active");
    document.querySelector("body").classList.remove("overflow-hidden");
    addonStrapFlickitySliderDestroy();
  });

  var strap_modal_overlay = document.querySelector(".strap_modal_overlay");
  strap_modal_overlay?.addEventListener("click", function () {
    document.querySelector(".strap_modal").classList.remove("active");
    document.querySelector(".strap_modal").style.display = "none";
    this.classList.remove("active");
    document.querySelector("body").classList.remove("overflow-hidden");
    addonStrapFlickitySliderDestroy();
  });

  // EXTRA STRAP MODAL OPEN/CLOSE JS END

  // ADDON ITEM FLICKITY SLIDER JS START

  function addonStrapFlickitySliderInitialize() {
    // Initialize Flickity
    var elem = document.querySelector(".product-addon--block");

    var flkty = new Flickity(elem, {
      prevNextButtons: false,
      pageDots: false,
      contain: true,
    });
  }

  function addonStrapFlickitySliderDestroy() {
    var elem = document.querySelector(".product-addon--block");
    var flkty = new Flickity(elem, {
      prevNextButtons: false,
      pageDots: false,
      contain: true,
    });
    flkty.destroy();
  }
  // ADDON ITEM FLICKITY SLIDER JS END

  document.querySelectorAll(".specs-block-title").forEach(function (title) {
    title.addEventListener("click", function () {
      var closeParentItem = title.closest(".specs-blocks-item");
      var parentItems = document.querySelectorAll(".specs-blocks-item");

      if (!closeParentItem.classList.contains("active")) {
        parentItems.forEach(function (item) {
          item.classList.remove("active");
        });
        closeParentItem.classList.add("active");
      } else {
        parentItems.forEach(function (item) {
          item.classList.remove("active");
        });
      }
    });
  });
});

let headerHeading = document.querySelector(".section--specs-block .header-section .heading");
headerHeading?.addEventListener("click", (event) => {
  const specsBlocks = document.querySelector(".section--specs-block .specs-blocks");
  if (specsBlocks) {
    if (specsBlocks.classList.contains("accordion_Active")) {
      event.target.querySelector(".accordion_sign").innerHTML = "+";
    } else {
      event.target.querySelector(".accordion_sign").innerHTML = "-";
    }
    specsBlocks.classList.toggle("accordion_Active");
  }
});

const intervalId = setInterval(() => {
  const reviewDOM = document.querySelector(
    "#yotpo-app .yotpo-main-reviews-widget .yotpo-head .yotpo-headline"
  );
  if (reviewDOM) {
    console.log("Review DOM found, adding click event...");
    const headingElement = document.querySelector("#yotpo-app .yotpo-main-reviews-widget .yotpo-head .yotpo-headline"); // <p class="yotpo-headline">+ REVIEWS</p>
    if (headingElement) {
      const existingText = headingElement.textContent.trim().replace(/^\+/, "").trim();
      const accordionSign = document.createElement("span");
      accordionSign.classList.add("accordion_sign");
      accordionSign.textContent = "+";
      headingElement.textContent = "";
      headingElement.append(accordionSign, " " + existingText);

      headingElement.addEventListener("click", (event) => {
        console.log("Click Event Triggered");
        const specsBlocks = document.querySelector("#yotpo-app .yotpo-main-reviews-widget .yotpo-head + div");
        if (specsBlocks) {
          if (specsBlocks.classList.contains("accordion_Active")) {
            event.target.querySelector(".accordion_sign").innerHTML = "+";
          } else {
            event.target.querySelector(".accordion_sign").innerHTML = "-";
          }
          specsBlocks.classList.toggle("accordion_Active");
        }
      });
    }
    clearInterval(intervalId);
  }
}, 100);

setTimeout(function () {
  clearInterval(intervalId);
}, 10000);