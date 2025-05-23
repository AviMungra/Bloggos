// Below code is to show a loading effect on form submit. And on successful submission it shows a green tick.

const form = document.querySelector(".edit form");
const button = form.querySelector(".btn-svg .btn");
const spinner = form.querySelector(".spinner svg");
const tick = form.querySelector(".tick svg");

form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent immediate form submission
    spinner.classList.add("show-spinner"); // show spinner

    // Remmove spinner and show tick
    setTimeout(() => {
        spinner.classList.remove("show-spinner"); // remove spinner

        tick.classList.add("show-tick"); // show green tick
    }, 1500);

    // Submit the form
    setTimeout(() => {
        tick.classList.remove("show-tick"); // remove green tick

        form.submit();
    }, 2500);
});
