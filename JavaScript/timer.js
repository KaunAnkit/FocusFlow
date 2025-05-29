//Getting All
let hours = document.getElementById('hrs');
let minutes = document.getElementById('mins');
let seconds = document.getElementById('sec');
let FullScreenContainer = document.getElementById('fullbutton');
let EditContainer = document.getElementById('edit');
let SideBigcontainer = document.getElementById('wholecontainer');
let Sidebar = document.getElementById('Side');
let TimerContainer = document.getElementById('promodoro');
let TextaboveTimer = document.getElementById('TimerText');
let StarTimerButt = document.getElementById('StartTimer');
let UpArrow = document.getElementsByClassName('up');
let DownArrow = document.getElementsByClassName('down');
let ReSetTimer = document.getElementById('Reset');
let Quote=document.getElementById('QuoteState');
let QuoteBody=document.getElementById('quoateofthedaay');

//Buttons click
let fullflag = true;
FullScreenContainer.addEventListener('click', () => {
    if (fullflag) {
        TextaboveTimer.innerText = '';
        Sidebar.style.display = "none";
        EditContainer.style.display = "none";
        StarTimerButt.style.display = "none";
        ReSetTimer.style.display = "none";
        QuoteBody.style.display = "none";
        
        TimerContainer.style.top = "25vh";
        TimerContainer.style.left = "10vw";

        FullScreenContainer.style.right = "37.5vw";
        FullScreenContainer.style.top = "65vh";
        FullScreenContainer.innerText = "Exit Full Screen";

    }
    else {
        TextaboveTimer.innerText = 'Pomodoro Timer';
        Sidebar.style.display = "inline-block";
        EditContainer.style.display = "flex";
        StarTimerButt.style.display = "flex";
        ReSetTimer.style.display = "flex";
        QuoteBody.style.display = "inline-block";

        TimerContainer.style.top = "0vh";
        TimerContainer.style.left = "20vw";

        FullScreenContainer.style.right = "2vw";
        FullScreenContainer.style.top = "40vh";
        FullScreenContainer.innerText = "Full Screen";
    }
    fullflag = !fullflag;
})

let editflag = true;
EditContainer.addEventListener('click', () => {
    if (editflag) {
        TextaboveTimer.innerText = '';
        Sidebar.style.display = "none";
        FullScreenContainer.style.opacity = 0;
        StarTimerButt.style.display = "none";
        ReSetTimer.style.display = "none";
        QuoteBody.style.display = "none";
        
        document.body.style.overflow = 'hidden';

        Array.from(UpArrow).forEach(up => {
            up.style.display = "inline-block";
        })

        Array.from(DownArrow).forEach(up => {
            up.style.display = "inline-block";
        })

        TimerContainer.style.top = "20vh";
        TimerContainer.style.left = "10vw";

        EditContainer.style.right = "37.5vw";
        EditContainer.style.top = "75vh";
        EditContainer.innerText = "Exit Edit Screen";

        WheelUpdown();
    }
    else {
        TextaboveTimer.innerText = 'Pomodoro Timer';
        Sidebar.style.display = "inline-block";
        FullScreenContainer.style.opacity = 1;
        StarTimerButt.style.display = "flex";
        ReSetTimer.style.display = "flex";
        document.body.style.overflow = 'hidden';
        QuoteBody.style.display = "inline-block";
        
        
        Array.from(UpArrow).forEach(up2 => {
            up2.style.display = "none";
        })

        Array.from(DownArrow).forEach(up => {
            up.style.display = "none";
        })

        TimerContainer.style.top = "0vh";
        TimerContainer.style.left = "20vw";

        EditContainer.style.right = "52vw";
        EditContainer.style.top = "40vh";
        EditContainer.innerText = "Edit Timer";
    }
    editflag = !editflag;
})


//Variables for timer
let seccng = 0;
let mincng = 0;
let hrscng = 0;

//Adding Setting Up/Down events
UpArrow[0].addEventListener('click', () => {
    if (seccng < 59 && seccng >= 0) {
        seccng++;
        seconds.innerText = String(seccng).padStart(2, "00");
    }
})
UpArrow[1].addEventListener('click', () => {
    if (mincng < 59 && mincng >= 0) {
        mincng++;
        minutes.innerText = String(mincng).padStart(2, "00");
    }
})
UpArrow[2].addEventListener('click', () => {

    hrscng++;
    hours.innerText = String(hrscng).padStart(2, "00");

})

DownArrow[0].addEventListener('click', () => {
    if (seccng <=59 && seccng > 0) {
        seccng--;
        seconds.innerText = String(seccng).padStart(2, "00");
    }
})
DownArrow[1].addEventListener('click', () => {
    if (mincng <=59 && mincng > 0) {
        mincng--;
        minutes.innerText = String(mincng).padStart(2, "00");
    }
})
DownArrow[2].addEventListener('click', () => {
    if (hrscng > 0) {
        hrscng--;
        hours.innerText = String(hrscng).padStart(2, "00");
    }

})

//Wheel For Timer
function WheelUpdown() {
    hours.addEventListener('wheel', (eve) => {
        if (eve.deltaY < 0) {
            hrscng++;
            hours.innerText = String(hrscng).padStart(2, "00");
        }
        else {
            if (hrscng > 0) {
                hrscng--;
                hours.innerText = String(hrscng).padStart(2, "00");
            }
        }
    })

    minutes.addEventListener('wheel', (eve) => {
        if (eve.deltaY < 0) {
            if (mincng < 59 && mincng >= 0) {
                mincng++;
                minutes.innerText = String(mincng).padStart(2, "00");
            }
        }

        else {
            if (mincng <=59 && mincng >= 0) {
                mincng--;
                minutes.innerText = String(mincng).padStart(2, "00");
            }
        }
    })

    seconds.addEventListener('wheel', (eve) => {
        if (eve.deltaY < 0) {
            if (seccng < 59 && seccng >= 0) {
                seccng++;
                seconds.innerText = String(seccng).padStart(2, "00");
            }
        }

        else {
            if (seccng <=59 && seccng >= 0) {
                seccng--;
                seconds.innerText = String(seccng).padStart(2, "00");
            }
        }
    })

}

//Main Timer Logic

//Timer Variables
let SecText = 0;
let MinText = 0;
let HrsText = 0;

let SetTimer = null;
function BackTimer() {
    if (SecText === 0 && MinText === 0 && HrsText === 0) {
        clearInterval(SetTimer);
        SetTimer = null;
        StarTimerButt.innerText = "Start Timer";
        StartFlag = true;
        return;
    }
    else {
        if (SecText > 0) {
            SecText--;
        }

        else {
            if (MinText > 0 || HrsText > 0) {
                SecText = 59;
                if (MinText > 0) {
                    MinText--;
                }
                else {
                    if (HrsText > 0) {
                        MinText = 59;
                        HrsText--;
                    }
                }
            }

        }

    }

    hours.innerText = String(HrsText).padStart(2, "00");
    minutes.innerText = String(MinText).padStart(2, "00");
    seconds.innerText = String(SecText).padStart(2, "00");
}

let StartFlag = true;
StarTimerButt.addEventListener('click', () => {
    SecText = seccng;
    MinText = mincng;
    HrsText = hrscng;

    if (StartFlag) {
        StarTimerButt.innerText = "Stop Timer";
        SetTimer = setInterval(BackTimer, 1000);
    }
    else {
        StarTimerButt.innerText = "Start Timer";
        clearInterval(SetTimer);
        SetTimer = null;
        seccng = parseInt(seconds.innerText);
        mincng = parseInt(minutes.innerText);
        hrscng = parseInt(hours.innerText);
    }
    StartFlag = !StartFlag;
})


//Reset Timer
function TimerReset() {
    StarTimerButt.innerText = "Start Timer";
    clearInterval(SetTimer);
    SetTimer = null;
    StartFlag = true;
    seccng = 0;
    mincng = 0;
    hrscng = 0;

    SecText = seccng;
    MinText = mincng;
    HrsText = hrscng;

    hours.innerText = String(00).padStart(2, "00");
    minutes.innerText = String(00).padStart(2, "00");
    seconds.innerText = String(00).padStart(2, "00");
}

ReSetTimer.addEventListener('click', () => {
    TimerReset();
})


//Random Quote display
let arrayOFquote = [
  "Dekhi jayegi","Dekh lenge",
  "phele hum sochte hai ki jo hoga dekha jayega pr phir jo hota hau woh dekha nhi jata",
  "Kar doosron ka bhala aur kehla nalla"
];

function GettingRandomQuotes(max, min) {
  let RandomX = Math.floor(Math.random() * (max - min + 1)) + min;
  Quote.innerText=arrayOFquote[RandomX];
}

GettingRandomQuotes(arrayOFquote.length - 1, 0);

