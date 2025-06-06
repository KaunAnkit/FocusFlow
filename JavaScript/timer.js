let hours = document.getElementById('hrs');
let minutes = document.getElementById('mins');
let seconds = document.getElementById('sec');
let FullScreenContainer = document.getElementById('fullbutton');
let EditContainer = document.getElementById('edit');
let Sidebar = document.getElementById('Side');
let TimerContainer = document.getElementById('timerMainContainer'); // UPDATED ID
let StarTimerButt = document.getElementById('StartTimer');
let ReSetTimer = document.getElementById('Reset');
let Quote = document.getElementById('QuoteState');
let QuoteBody = document.getElementById('quoateofthedaay');
let WrittenTimer = document.getElementById('TimerTxx');
// Removed references to TextaboveTimer and WrittenCringe as their IDs no longer exist or are replaced by h1/h5
let timeDisplayContainer = document.getElementById('time-display-container');
let buttonContainer = document.getElementById('button-container');

// Get references to the new H1 and H5 elements for dynamic display
let mainTitle = document.querySelector('#timerMainContainer h1');
let subTitle = document.querySelector('#timerMainContainer h5');


let seccng = 0;
let mincng = 0;
let hrscng = 0;

let SecText = 0;
let MinText = 0;
let HrsText = 0;

let SetTimer = null;
let StartFlag = true;
let fullflag = true;
let editflag = true;

function updateDisplay() {
    hours.innerText = String(hrscng).padStart(2, "0");
    minutes.innerText = String(mincng).padStart(2, "0");
    seconds.innerText = String(seccng).padStart(2, "0");
}

function BackTimer() {
    if (SecText === 0 && MinText === 0 && HrsText === 0) {
        clearInterval(SetTimer);
        SetTimer = null;
        StarTimerButt.innerText = "Start Timer";
        StartFlag = true;
        EditContainer.style.pointerEvents = 'auto';
        return;
    } else {
        if (SecText > 0) {
            SecText--;
        } else {
            if (MinText > 0) {
                MinText--;
                SecText = 59;
            } else {
                if (HrsText > 0) {
                    HrsText--;
                    MinText = 59;
                    SecText = 59;
                }
            }
        }
    }
    hours.innerText = String(HrsText).padStart(2, "0");
    minutes.innerText = String(MinText).padStart(2, "0");
    seconds.innerText = String(SecText).padStart(2, "0");
}

StarTimerButt.addEventListener('click', () => {
    if (StartFlag) {
        SecText = seccng;
        MinText = mincng;
        HrsText = hrscng;

        if (SecText === 0 && MinText === 0 && HrsText === 0) {
            alert("Please set a time before starting the timer!");
            return;
        }

        StarTimerButt.innerText = "Stop Timer";
        SetTimer = setInterval(BackTimer, 1000);
        EditContainer.style.pointerEvents = 'none';
        if (!editflag) {
            EditContainer.click();
        }
    } else {
        StarTimerButt.innerText = "Start Timer";
        clearInterval(SetTimer);
        SetTimer = null;
        seccng = parseInt(seconds.innerText);
        mincng = parseInt(minutes.innerText);
        hrscng = parseInt(hours.innerText);
        EditContainer.style.pointerEvents = 'auto';
    }
    StartFlag = !StartFlag;
});

ReSetTimer.addEventListener('click', () => {
    clearInterval(SetTimer);
    SetTimer = null;
    StartFlag = true;
    StarTimerButt.innerText = "Start Timer";

    seccng = 0;
    mincng = 0;
    hrscng = 0;

    SecText = 0;
    MinText = 0;
    HrsText = 0;

    updateDisplay();
    EditContainer.style.pointerEvents = 'auto';
    if (!editflag) {
        EditContainer.click();
    }
});

FullScreenContainer.addEventListener('click', () => {
    if (fullflag) {
        Sidebar.style.display = "none";
        QuoteBody.style.display = "none";
        if (mainTitle) mainTitle.style.display = "none"; // Hide new H1
        if (subTitle) subTitle.style.display = "none";   // Hide new H5
        if (WrittenTimer) WrittenTimer.style.display = "none"; // Hide TimerTxx
        EditContainer.style.display = "none";
        TimerContainer.classList.add('full-screen-mode');
        FullScreenContainer.classList.add('absolute-positioned');
        FullScreenContainer.innerText = "Exit Full Screen";
    } else {
        Sidebar.style.display = "flex";
        QuoteBody.style.display = "block";
        if (mainTitle) mainTitle.style.display = "block"; // Show new H1
        if (subTitle) subTitle.style.display = "block";   // Show new H5
        if (WrittenTimer) WrittenTimer.style.display = "block"; // Show TimerTxx
        EditContainer.style.display = "flex";
        TimerContainer.classList.remove('full-screen-mode');
        FullScreenContainer.classList.remove('absolute-positioned');
        FullScreenContainer.innerText = "Full Screen";
    }
    fullflag = !fullflag;
});

EditContainer.addEventListener('click', () => {
    if (StartFlag === false && editflag) {
        alert("Please stop the timer before entering edit mode.");
        return;
    }

    if (editflag) {
        // Show tip alert when entering edit mode
        alert("Tip: Scroll to adjust the time settings.");

        if (mainTitle) mainTitle.style.display = "none"; // Hide new H1
        if (subTitle) subTitle.style.display = "none";   // Hide new H5
        Sidebar.style.display = "none";
        FullScreenContainer.style.opacity = 0;
        FullScreenContainer.style.pointerEvents = 'none';
        StarTimerButt.style.display = "none";
        ReSetTimer.style.display = "none";
        QuoteBody.style.display = "none";
        if (WrittenTimer) WrittenTimer.style.display = "none"; // Hide TimerTxx
        TimerContainer.classList.add('edit-mode-active');
        document.body.style.overflow = 'hidden';
        document.querySelectorAll('.time-block').forEach(block => {
            block.classList.add('edit-mode');
        });
        EditContainer.classList.add('absolute-positioned');
        EditContainer.innerText = "Exit Edit Screen";
        WheelUpdown();
    } else {
        if (mainTitle) mainTitle.style.display = "block"; // Show new H1
        if (subTitle) subTitle.style.display = "block";   // Show new H5
        Sidebar.style.display = "flex";
        FullScreenContainer.style.opacity = 1;
        FullScreenContainer.style.pointerEvents = 'auto';
        StarTimerButt.style.display = "flex";
        ReSetTimer.style.display = "flex";
        QuoteBody.style.display = "block";
        if (WrittenTimer) WrittenTimer.style.display = "block"; // Show TimerTxx
        TimerContainer.classList.remove('edit-mode-active');
        document.body.style.overflow = 'visible'; // Changed from hidden to visible
        document.querySelectorAll('.time-block').forEach(block => {
            block.classList.remove('edit-mode');
        });
        EditContainer.classList.remove('absolute-positioned');
        EditContainer.innerText = "Edit Timer";
    }
    editflag = !editflag;
});

function handleWheel(eve) {
    eve.preventDefault();
    if (!editflag) return; // Only allow wheel if in edit mode

    let targetId = eve.target.id;
    let delta = eve.deltaY < 0 ? 1 : -1;

    switch (targetId) {
        case 'hrs':
            hrscng += delta;
            if (hrscng < 0) hrscng = 0;
            break;
        case 'mins':
            mincng += delta;
            if (mincng > 59) {
                mincng = 0;
                hrscng++;
            } else if (mincng < 0) {
                mincng = 59;
                if (hrscng > 0) hrscng--; else mincng = 0;
            }
            break;
        case 'sec':
            seccng += delta;
            if (seccng > 59) {
                seccng = 0;
                mincng++;
                if (mincng > 59) {
                    mincng = 0;
                    hrscng++;
                }
            } else if (seccng < 0) {
                seccng = 59;
                mincng--;
                if (mincng < 0) {
                    mincng = 59;
                    if (hrscng > 0) hrscng--; else mincng = 0;
                }
            }
            break;
    }
    updateDisplay();
}

let wheelListenersAttached = false;
function WheelUpdown() {
    if (!wheelListenersAttached) {
        hours.addEventListener('wheel', handleWheel);
        minutes.addEventListener('wheel', handleWheel);
        seconds.addEventListener('wheel', handleWheel);
        wheelListenersAttached = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    GettingRandomQuotes(arrayOFquote.length - 1, 0);
});

let arrayOFquote = [
    '"The key is not to prioritize whats on your schedule but to schedule your priorities" ~ Stephen Covey',
    '"Productivity is being able to do things that you were never able to do before." ~ Franz Kafka',
    '"The best way to predict the future is to create it." ~ Peter Drucker',
    '"Your mind is for having ideas, not holding them." ~ David Allen',
    '"It is not enough to be busy; so are the ants. The question is: What are we busy about?" ~ Henry David Thoreau',
    '"Don’t confuse motion with progress." ~ Alfred A. Montapert',
    '"The bad news is time flies. The good news is you\'re the pilot." ~ Michael Altshuler',
    '"The secret of getting ahead is getting started." ~ Mark Twain',
    '"Action is the foundational key to all success." ~ Pablo Picasso',
    '"The truly efficient man is the one who manages to do many things by doing one thing at a time." ~ Arnold Bennett'
];

function GettingRandomQuotes(max, min) {
    let RandomX = Math.floor(Math.random() * (max - min + 1)) + min;
    Quote.innerText = arrayOFquote[RandomX];
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
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

// Ensure 'minimize' element exists before adding event listener
if (minimize) {
    minimize.addEventListener("click", sidebarMin);
}
loadSidebar();

loadTheme();