

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    const subsubHeading = document.querySelector(".subsubHeading");
    const subsubPara = document.querySelector(".subsubPara");
    const toggleButton = document.getElementById("theme-toggle");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (subsubHeading) subsubHeading.textContent = "Light Mode";
        if (subsubPara) subsubPara.textContent = "Click on the button to switch to Light mode";
        if (toggleButton && toggleButton.type === 'checkbox') {
            toggleButton.checked = true;
        }
    } else {
        document.body.classList.remove("dark-mode");
        if (subsubHeading) subsubHeading.textContent = "Dark Mode";
        if (subsubPara) subsubPara.textContent = "Click on the button to switch to Dark mode";
        if (toggleButton && toggleButton.type === 'checkbox') {
            toggleButton.checked = false;
        }
    }
}
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

