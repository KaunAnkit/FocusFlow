let toggleButton = document.getElementById("checkbox");
let subsubHeading = document.getElementById("subsubHeading");
let subsubPara = document.querySelector("#DarkMode .subsubPara");
let betaToggles = document.querySelectorAll(".tempBeta");

function darkMod() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        subsubHeading.textContent = "Light Mode";
        subsubPara.textContent = "Click on the button to switch to Light mode";
        localStorage.setItem("theme", "dark");
    } else {
        subsubHeading.textContent = "Dark Mode";
        subsubPara.textContent = "Click on the button to switch to Dark mode";
        localStorage.setItem("theme", "light");
    }
}

function temporary() {
    alert("This feature is still in beta. Some functionalities may not work as expected.");
}

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

toggleButton.addEventListener("click", darkMod);
betaToggles.forEach(toggle => {
    toggle.addEventListener("click", temporary);
});
const minimize = document.getElementById("minimize");
function loadSidebar() {
    const savedBar = localStorage.getItem("minimizer");
    if (savedBar === "minimized") {
        document.body.classList.add("minimizer");
    } else {
        document.body.classList.remove("minimizer");
    }
}

function sidebarMin() {
    document.body.classList.toggle("minimizer");

    if (document.body.classList.contains("minimizer")) {
        localStorage.setItem("minimizer", "minimized");
    } else {
        localStorage.removeItem("minimizer");
    }
}

minimize.addEventListener("click", sidebarMin);
loadSidebar();

loadTheme();
