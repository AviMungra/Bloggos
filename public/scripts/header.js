// Below code is to make the header hide when scrolling up and show when scrolling down
// This code is linked just before the closing body tag </body>

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
        // scrolling down
        document.querySelector("header").classList.add("hide-header");
    } else {
        // scrolling up
        document.querySelector("header").classList.remove("hide-header");
    }
    lastScrollY = window.scrollY;
});
