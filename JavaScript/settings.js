let toggleButton = document.getElementById("checkbox")
let subsubHeading = document.getElementById("subsubHeading")
let subsubPara= document.getElementById("subsubPara")
let betaToggles = document.querySelectorAll(".tempBeta")
console.log(toggleButton)



function darkMod() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")){
        subsubHeading.textContent="Light Mode"
        subsubPara.textContent="Click on the button to switch to Light mode"
    } else{
    subsubHeading.textContent="Dark Mode"
    subsubPara.textContent="Click on the button to switch to Dark mode"
    }
}
function temporary() {
    alert("This feature is still in beta. Some functionalities may not work as expected.")
}

toggleButton.addEventListener("click",darkMod);
betaToggles.forEach(toggle => {
    toggle.addEventListener("click", temporary);
});
