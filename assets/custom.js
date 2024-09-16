console.log("hi git shopify cli");
document.addEventListener('DOMContentLoaded', () => {
    // MENU DRAWER CLOSE JS START
    const closeButton = document.querySelector('.menu-drawer__menu .icon-close');
    const overlay = document.querySelector('.menu-drawer__overlay');

    if (closeButton && overlay) {
        closeButton.addEventListener('click', () => {
            console.log('close clicked===============');
            document.getElementById("Details-menu-drawer-container").removeAttribute("open");
            document.getElementById("Details-menu-drawer-container").classList.remove("menu-opening");
            document.querySelector("#Details-menu-drawer-container .header__icon").setAttribute("aria-expanded", "false");
        });

        overlay.addEventListener('click', () => {
            console.log('overlay clicked===============');
            document.getElementById("Details-menu-drawer-container").removeAttribute("open");
            document.getElementById("Details-menu-drawer-container").classList.remove("menu-opening");
            document.querySelector("#Details-menu-drawer-container .header__icon").setAttribute("aria-expanded", "false");
        });
    } else {
        console.error('Elements not found');
    }

    // MENU DRAWER CLOSE JS END

    // TOGGLE SWITCH JS START

    // Add event listener to toggle dark mode
    document.getElementById('modeToggle')?.addEventListener('change', function() {
        const body = document.body;
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    });
    // Apply dark mode on initial page load
    applyDarkMode();

    function applyDarkMode() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        const modeToggle = document.getElementById('modeToggle');
        const body = document.body;

        if (isDarkMode) {
            body.classList.add('dark-mode');
            modeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            modeToggle.checked = false;
        }
    }

    // TOGGLE SWITCH JS END

    // EXTRA STRAP MODAL OPEN/CLOSE JS START

    document.querySelector(".product-block--strap_heading").addEventListener("click", function() {
        document.querySelector(".strap_modal").style.display = "block";
        document.querySelector(".strap_modal").classList.add("active");
        document.querySelector(".strap_modal_overlay").classList.add("active");
        document.querySelector("body").classList.add("overflow-hidden");
        addonStrapFlickitySliderInitialize();
    });

    document.querySelector(".strap_modal .close").addEventListener("click", function() {
        document.querySelector(".strap_modal").style.display = "none";
        document.querySelector(".strap_modal").classList.remove("active");
        document.querySelector(".strap_modal_overlay").classList.remove("active");
        document.querySelector("body").classList.remove("overflow-hidden");
        addonStrapFlickitySliderDestroy();
    });

    document.querySelector(".strap_modal_overlay").addEventListener("click", function() {
        document.querySelector(".strap_modal").classList.remove("active");
        document.querySelector(".strap_modal").style.display = "none";
        this.classList.remove("active");
        document.querySelector("body").classList.remove("overflow-hidden");
        addonStrapFlickitySliderDestroy();
    });

    // EXTRA STRAP MODAL OPEN/CLOSE JS END

    // ADDON ITEM FLICKITY SLIDER JS START

    function addonStrapFlickitySliderInitialize(){
        // Initialize Flickity
        var elem = document.querySelector('.product-addon--block');

        var flkty = new Flickity(elem, {
            // options
            prevNextButtons: false,
            pageDots: false,
            contain: true,
            // other options as needed
        });
    }

    function addonStrapFlickitySliderDestroy(){
        // Initialize Flickity
        var elem = document.querySelector('.product-addon--block');
        
        var flkty = new Flickity(elem, {
            // options
            prevNextButtons: false,
            pageDots: false,
            contain: true,
            // other options as needed
        });

        flkty.destroy();
    }

    // ADDON ITEM FLICKITY SLIDER JS END

    document.querySelectorAll('.specs-block-title').forEach(function(title) {
        title.addEventListener('click', function() {
            var closeParentItem = title.closest('.specs-blocks-item');
            var parentItems = document.querySelectorAll('.specs-blocks-item');

            if (!closeParentItem.classList.contains('active')) {
                parentItems.forEach(function(item) {
                    item.classList.remove('active');
                });
                closeParentItem.classList.add('active');
            } else {
                parentItems.forEach(function(item) {
                    item.classList.remove('active');
                });
            }
        });
    });
});
