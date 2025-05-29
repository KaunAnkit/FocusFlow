let hours = document.getElementById('hrs');
let minutes = document.getElementById('mins');
let seconds = document.getElementById('sec');
let FullScreenContainer = document.getElementById('fullbutton');
let EditContainer = document.getElementById('edit');
let Sidebar = document.getElementById('Side');
let TimerContainer = document.getElementById('promodoro');
let TextaboveTimer = document.getElementById('TimerText');
let StarTimerButt = document.getElementById('StartTimer');
let ReSetTimer = document.getElementById('Reset');
let Quote = document.getElementById('QuoteState');
let QuoteBody = document.getElementById('quoateofthedaay');
let WrittenTimer = document.getElementById('TimerTxx');
let WrittenCringe = document.getElementById('TheCringeText');
let timeDisplayContainer = document.getElementById('time-display-container');
let buttonContainer = document.getElementById('button-container');

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
        TextaboveTimer.style.display = "none";
        WrittenCringe.style.display = "none";
        WrittenTimer.style.display = "none";
        EditContainer.style.display = "none";
        TimerContainer.classList.add('full-screen-mode');
        buttonContainer.style.gridTemplateColumns = "repeat(2, 220px)";
        FullScreenContainer.classList.add('absolute-positioned');
        FullScreenContainer.innerText = "Exit Full Screen";
    } else {
        Sidebar.style.display = "flex";
        QuoteBody.style.display = "block";
        TextaboveTimer.style.display = "block";
        WrittenCringe.style.display = "block";
        WrittenTimer.style.display = "block";
        EditContainer.style.display = "flex";
        TimerContainer.classList.remove('full-screen-mode');
        buttonContainer.style.gridTemplateColumns = "repeat(2, 200px)";
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

        TextaboveTimer.style.display = "none";
        Sidebar.style.display = "none";
        FullScreenContainer.style.opacity = 0;
        FullScreenContainer.style.pointerEvents = 'none';
        StarTimerButt.style.display = "none";
        ReSetTimer.style.display = "none";
        QuoteBody.style.display = "none";
        WrittenTimer.style.display = "none";
        WrittenCringe.style.display = "none";
        TimerContainer.classList.add('edit-mode-active');
        document.body.style.overflow = 'hidden';
        document.querySelectorAll('.time-block').forEach(block => {
            block.classList.add('edit-mode');
        });
        EditContainer.classList.add('absolute-positioned');
        EditContainer.innerText = "Exit Edit Screen";
        WheelUpdown();
    } else {
        TextaboveTimer.style.display = "block";
        Sidebar.style.display = "flex";
        FullScreenContainer.style.opacity = 1;
        FullScreenContainer.style.pointerEvents = 'auto';
        StarTimerButt.style.display = "flex";
        ReSetTimer.style.display = "flex";
        QuoteBody.style.display = "block";
        WrittenCringe.style.display = "block";
        WrittenTimer.style.display = "block";
        TimerContainer.classList.remove('edit-mode-active');
        document.body.style.overflow = 'hidden';
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
    if (editflag) return; 

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
