function loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        subsubHeading.textContent = "Light Mode";
        subsubPara.textContent = "Click on the button to switch to Light mode";
        if (toggleButton && toggleButton.type === 'checkbox') {
            toggleButton.checked = true;
        }
    } else {
        document.body.classList.remove("dark-mode");
        subsubHeading.textContent = "Dark Mode";
        subsubPara.textContent = "Click on the button to switch to Dark mode";
        if (toggleButton && toggleButton.type === 'checkbox') {
            toggleButton.checked = false;
        }
    }
}

loadTheme();