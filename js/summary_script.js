/**
 * Define mobile width
 */
const mediaQueryMobile = window.matchMedia('(max-width: 992px)');


/**
 * Define of times of day for welcome message
 */
const morningstart = 6;
const morningend = 11;
const daystart = 12;
const dayend = 14;
const afternoonstart = 15;
const afternoonend = 17;
const eveningstart = 18;
const eveningend = 22;
const nightstart = 23;
const nightend = 24;
const nightstart2 = 0;
const nightend2 = 5;


/**
 * Initiates the welcome message for logged in user and card datas.
 */
async function init() {
    await getContactsFromStorage();
    await getCardsFromStorage();
    welcomeMsgTime();
    welcomeMsgUser();
    addClassMobile();
    summaryTasks();
    filterCardsPrioHigh();
}


/**
 * Initiates the welcome message. Checks the current time.
 */
function welcomeMsgTime() {
    const currenttime = new Date().getHours();
    checkCurrentTime(currenttime);
}


/**
 * Compares current time with conditions
 */
function checkCurrentTime(currenttime) {
    let messageTime = document.getElementById('welcomemsgtime');
    if (messageTime) {
        if (currenttime >= morningstart && currenttime <= morningend) {
            messageTime.innerHTML = "Good morning";
        };
        if (currenttime >= daystart && currenttime <= dayend) {
            messageTime.innerHTML = "Good day";
        };
        if (currenttime >= afternoonstart && currenttime <= afternoonend) {
            messageTime.innerHTML = "Good afternoon";
        };
        if (currenttime >= eveningstart && currenttime <= eveningend) {
            messageTime.innerHTML = "Good evening";
        };
        if ((currenttime >= nightstart && currenttime <= nightend) || (currenttime >= nightstart2 && currenttime <= nightend2)) {
            messageTime.innerHTML = "Good night";
        };
    }
}


/**
 * Greeting the logged in user by name.
 */
async function welcomeMsgUser() {
    let messageUser = await document.getElementById('welcomemsguser');
    if (messageUser) {
        await getContactsFromStorage();
        if (currentUser !== 1000) {
            let user = await Contacts[currentUser].name;
            if (currentUser || '0') {
                messageUser.innerHTML = user;
            }
        } else {
            messageUser.innerHTML = '';
        }
    }
}


/**
 * Mobile width check and adding class for mobile animation of welcome message. 
 */
function addClassMobile() {
    let messageContainer = document.getElementById('welcomemsg');
    if (messageContainer) {
        setTimeout(function hideWelcome() {
            if (mediaQueryMobile.matches) {
                messageContainer.classList.add('remove');
                setTimeout(
                    function hideContainer() {
                        messageContainer.style.display = "none";
                    }, 1000);
            }
            else {
                messageContainer.classList.remove('remove');
                messageContainer.style.display = 'flex';
            }
        }, 2000);
    }
}


// Checks the media query conditions when changes BOM width
window.addEventListener('resize', addClassMobile);


/**
 * Count the tasks in categories. 
 */
function summaryTasks() {
    // Tasks in board
    let allBox = document.getElementById('sum-1');
    if (allBox) {
        allBox.innerHTML = `${cards.length}`;
        countProgressTasks();
    }
}


// Count tasks
function countProgressTasks() {
    // In progress tasks
    let progressBox = document.getElementById('sum-2');
    const countProg = cards.filter(item => item.listType === 'InProgress').length;
    progressBox.innerHTML = `${countProg}`;
    // Awaiting feedback tasks
    let awaitBox = document.getElementById('sum-3');
    const countAwait = cards.filter(item => item.listType === 'Awaitingfeedback').length;
    awaitBox.innerHTML = `${countAwait}`;
    // Urgent tasks
    let prioBox = document.getElementById('sum-4');
    const countPrio = cards.filter(item => item.prio === 'Urgent').length;
    prioBox.innerHTML = `${countPrio}`;
    // To do tasks
    let toDoBox = document.getElementById('sum-5');
    const countToDo = cards.filter(item => item.listType === 'ToDo').length;
    toDoBox.innerHTML = `${countToDo}`;
    // Done tasks
    let doneBox = document.getElementById('sum-6');
    const countDone = cards.filter(item => item.listType === 'Done').length;
    doneBox.innerHTML = `${countDone}`;
}


/**
 * Filter tasks with prio "high" and get the next due date. 
 */
let filteredPrioHigh = [];
function filterCardsPrioHigh() {
    for (f = 0; f < cards.length; f++) {
        if (cards[f].prio == 'Urgent') {
            filteredPrioHigh.push(cards[f].dueDate);
        }
    };
    sortCardsPrioHigh();
}


/**
 * Format and show the next due date.
 */
function sortCardsPrioHigh() {
    let urgentDate = new Date(filteredPrioHigh[0]);
    let urgenDateFormatted = urgentDate.toLocaleString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
    filteredPrioHigh.forEach(function (role) {
        role = role.replace('-', '');
    });
    let upComingDeadline = document.getElementById('upcomingDeadline');
    let upComingDeadlineTitle = document.getElementById('upcomingDeadlineTitle');
    if (upComingDeadline && upComingDeadlineTitle) {
        if (filteredPrioHigh.length > 0) {
            upComingDeadline.innerHTML = urgenDateFormatted;
        } else {
            upComingDeadline.innerHTML = "No urgent tasks";
            upComingDeadlineTitle.innerHTML = "";
        }
    }
}



