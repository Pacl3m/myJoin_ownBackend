let cards = [];

let categories = [];

let categoryColors = ['#FFC701', '#1FD7C1', '#0038FF', '#FF7A00', '#FF0000', '#E200BE'];

let listTypes = [{
    name: "ToDo",
    amount: 0,
},
{
    name: "InProgress",
    amount: 0,
},
{
    name: "Awaitingfeedback",
    amount: 0,
},
{
    name: "Done",
    amount: 0,
}
];

let currentListType = "";

let currentDraggedElement;

/**
 * svg graphics which shows arrows for mobile view to move cards to other status
 */
let svgArrowRight = `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
<rect width="16" height="16" rx="10" ry="10" fill="#D3D3D3" />
<path d="M2 8L12 8M12 8L8 4M12 8L8 12" stroke="#696969" stroke-width="2" />
</svg>`;
let svgArrowLeft = `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
<rect width="16" height="16" rx="10" ry="10" fill="#D3D3D3" />
<path d="M14 8L4 8M4 8L8 4M4 8L8 12" stroke="#696969" stroke-width="2" />
</svg>
`;


/**
 * Render all cards in board by loading from remote storage
 */
async function renderBoard() {
    await getCardsFromStorage();
    clearAllListTypesAmount();
    renderBoardCards();
    getCategoriesFromStorage();
}


/**
 * Render all ToDo cards in board
 */
async function renderBoardCards() {
    await getContactsFromStorage();
    await getCardsFromStorage();
    clearBoardCards();
    for (let i = 0; i < cards.length; i++) {
        if (cards[i]['listType'] == 'ToDo') {
            let id = cards[i].id;
            listTypes[0]['amount']++;
            document.getElementById('cardBoardToDo').innerHTML +=
                renderBoardTemplate(i, id);
            renderBoardFunctionsTemplate(i);
        } else {
            renderBoardCardsInProgress(i)
        };
    } renderNoCardsInCardBoard();
}


/**
 * Render all InProgress cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardCardsInProgress(i) {
    if (cards[i]['listType'] == 'InProgress') {
        let id = cards[i].id;
        listTypes[1]['amount']++;
        document.getElementById('cardBoardInProgress').innerHTML +=
            renderBoardTemplate(i, id);
        renderBoardFunctionsTemplate(i);
    } else { renderBoardCardsAwaitingFeedback(i) };
}


/**
 * Render all AwaitingFeedback cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardCardsAwaitingFeedback(i) {
    if (cards[i]['listType'] == 'Awaitingfeedback') {
        let id = cards[i].id;
        listTypes[2]['amount']++;
        document.getElementById('cardBoardAwaitingfeedback').innerHTML +=
            renderBoardTemplate(i, id);
        renderBoardFunctionsTemplate(i);
    } else { renderBoardCardsDone(i) };
}


/**
 * Render all Done cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardCardsDone(i) {
    if (cards[i]['listType'] == 'Done') {
        let id = cards[i].id;
        listTypes[3]['amount']++;
        document.getElementById('cardBoardDone').innerHTML +=
            renderBoardTemplate(i, id);
    } else { }
    renderBoardFunctionsTemplate(i);
}


/**
 * HTML temnplate for render functions
 * @param {number} i 
 * @returns html content
 */
function renderBoardTemplate(i, id) {
    return /* html */`<div class="cardBoard" draggable="true" id="card${id}" ondragstart="startDragging(${id})" onclick='openCard(${i}, ${id})'>
    <div class="cardBoardInside">
        <div class="cardHeadMain">
        <div class="cardBoardInsideCategory"; id="cardBoardInsideCategory${i}">${cards[i]['category']}</div>
        <div class="svgImage"><div class="svgMinus90Degree" id="svgToLeft${i}" onclick="listTypeToLeft(${i}, ${id}, event)">${svgArrowLeft}</div><div class="svgPlus90Degree" id="svgToRight${i}" onclick="listTypeToRight(${i}, ${id}, event)">${svgArrowRight}</div></div>
        </div>
        <div class="cardBoardInsideTitleAndDescrption">
            <div class="cardBoardInsideTitle">${cards[i]['title']}</div>
            <div class="cardBoardInsideDescription">${cards[i]['description']}</div>
        </div>
        <div class="cardBoardInsideProgress" id="cardBoardInsideProgress${i}"><div class="progressBar"><div class="progress" id="progressBar${i}"></div></div>
        <div><p>${cards[i]['progress']}/${cards[i]['subtasks'].length} Done</p></div>
        </div>
        <div class="cardBoardInsideUserAndPrio">
        <div class="InsideUser" id="InsideUser${i}"></div><img src="./assets/img/board/${cards[i]['prio']}.svg" alt="">
        </div>
    </div>
</div>`;
}


/**
 * collection of other functions which are needed when render cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardFunctionsTemplate(i) {
    renderProgressBar(i);
    renderAssignedUserInBoard(i);
    renderBackgroundColorCategory(i);
    renderListTypeArrows(i);
}


/**
 * assign the correct color of the card category by compare category of the card with category array
 * @param {number} i - index of the Cards array
 */
function renderBackgroundColorCategory(i) {
    let cat = cards[i]['category'];
    let catClass = document.getElementById(`cardBoardInsideCategory${i}`);
    for (let k = 0; k < categories.length; k++) {
        if (cat == categories[k]['name']) {
            catClass.style['background-color'] = categories[k]['color'];
        } else { }
    };
}


/**
 * render progressbar in card by update the bar according to amount of subtasks and checked subtasks
 * @param {number} i - index of the Cards array
 */
function renderProgressBar(i) {
    let progressValue = cards[i]['progress'] * 100 / cards[i]['subtasks'].length;
    let progressBar = document.getElementById(`progressBar${i}`);
    if (cards[i]['subtasks'].length === 0) {
        document.getElementById(`cardBoardInsideProgress${i}`).classList.add("d-none");
    } else {
        progressBar.style.width = progressValue + '%';
    }
}


/**
 * render assigned user icon with initials in card
 * @param {number} i - index of the Cards array
 */
function renderAssignedUserInBoard(i) {
    for (let j = 0; j < cards[i]['assignedUser'].length; j++) {
        document.getElementById(`InsideUser${i}`).innerHTML += `
            <div class="label-card" style="background-color:${findUserColor(i, j)}">${cards[i]['assignedUser'][j]}</div>
            `;
    }
}


/**
 * render assigned user full name in card detailed view
 * @param {number} i - index of the Cards array
 */
function renderAssignedUserFullName(i) {
    const currentUserNumber = parseInt(currentUser);
    for (let j = 0; j < cards[i]['assignedUserFullName'].length; j++) {
        if (currentUser < Contacts.length) {
            if (cards[i]['assignedUserFullName'][j] == Contacts[currentUserNumber]['name']) {
                document.getElementById(`InsideUserFullName${i}`).innerHTML += `
            <div class="label-name">${cards[i]['assignedUserFullName'][j]} (You)</div>
            `;
            } else {
                document.getElementById(`InsideUserFullName${i}`).innerHTML += `
            <div class="label-name">${cards[i]['assignedUserFullName'][j]}</div>
            `;
            }
        } else {
            document.getElementById(`InsideUserFullName${i}`).innerHTML += `
        <div class="label-name">${cards[i]['assignedUserFullName'][j]}</div>`;
        }
    }
}


/**
 * render color of user icon according to assigned color in contacts array
 * @param {number} i - index of the Cards array
 * @param {number} j - index of assigned user in Cards JSON
 * @returns 
 */
function findUserColor(i, j) {
    for (let k = 0; k < Contacts.length; k++) {
        if (Contacts[k]['name'] == cards[i]['assignedUserFullName'][j]) {
            // return `${Contacts[k]['color']}`;
            return `${nameTagsColors[k]}`;
        } else { }
    }
}


/**
 * set list type 0 to clear value
 */
function clearAllListTypesAmount() {
    for (let k = 0; k < listTypes.length; k++) {
        listTypes[k]['amount'] = 0;
    }
}


/**
 * render 'no cards in board' placeholder for all columns
 */
function renderNoCardsInCardBoard() {
    for (let k = 0; k < listTypes.length; k++) {
        if (listTypes[k]['amount'] == 0) {
            document.getElementById(`cardBoard${listTypes[k]['name']}`).innerHTML += `
            <div class="NoCardsInBoardPlaceholder">No tasks in ${listTypes[k]['name']}</div>
            `;
        } else { }
    }
}


/**
 * clear all columns in board
 */
function clearBoardCards() {
    document.getElementById('cardBoardToDo').innerHTML = '';
    document.getElementById('cardBoardInProgress').innerHTML = '';
    document.getElementById('cardBoardAwaitingfeedback').innerHTML = '';
    document.getElementById('cardBoardDone').innerHTML = '';
}


/**
 * open addTask overlay in board
 */
function openAddTask(i) {
    const screenWidth = window.innerWidth;
    currentListType = `${i}`;
    if (screenWidth < 993) {
        document.getElementById('mobileAddTask').innerHTML = `<div class="includeTaskForm" w3-include-html="templates/task_form2.html"></div>`;
        main();
        includeTemplates();
    } else {
        document.getElementById('CardContainer').style = "display:block;";
        document.getElementById('overlay').classList.remove('d-none');
        main();
        // renderAddTask();
    }
}


/**
 * render addTask overlay by loading template
 */
function renderAddTask() {
    //     document.getElementById('CardContainer').innerHTML = `
    //     <div class="includeTaskForm" w3-include-html="templates/task_form2.html">
    //     `;
    includeTemplates();
}


/**
 * close addTask overlay in board
 */
function closeOverlay() {
    let overlayClose = document.getElementById('overlay');
    overlayClose.classList.add('overlay-close');
    setTimeout(() => {
        document.getElementById('overlay').classList.add('d-none');
        overlayClose.classList.remove('overlay-close');
    }, 0);
    document.getElementById('CardContainer').style = "display:none;";
    // document.getElementById('CardContainer').innerHTML = "";
    document.getElementById('CardDetail').style = "display:none;";
    document.getElementById('CardEditForm').style = "display:none;";
    renderBoard();
    removeDropDownClass();
}


/**
 * stop other function when multiple functions called the same time
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * filter cards and show or hide depending on title and description
 */
function filterCards() {
    const query = document.getElementById("inputSearchBoard").value.toLowerCase();
    const cards = document.querySelectorAll(".cardBoard");
    cards.forEach((card) => {
        const title = card.querySelector(".cardBoardInsideTitle").innerHTML.toLowerCase();
        const description = card.querySelector(".cardBoardInsideDescription").innerHTML.toLowerCase();
        if (title.includes(query) || description.includes(query)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}


/**
 * open card in detailed view in board
 * @param {number} i - index of the Cards array
 * @param {*} event - help function to prevent from call unwanted function
 */
function openCard(i, id, event) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('CardDetail').style = "display:block;";
    let cardDetailDelete = document.getElementById('deleteCard');
    let cardDetailEdit = document.getElementById('editCard');
    cardDetailCat.innerHTML = `<div class="cardBoardInsideCategory" id="cardBoardInsideCategoryDetail${i}">${cards[i]['category']}</div>`;
    cardDetailTitle.innerHTML = `${cards[i]['title']}`;
    cardDetailDesc.innerHTML = `${cards[i]['description']}`;
    cardDetailDueDate.innerHTML = `<span class="detlabel">Due date:</span>${cards[i]['dueDate']}`;
    cardDetailPrio.innerHTML = `<span class="detlabel">Priority:</span><div id="priobtndetail">${cards[i]['prio']}<img id="prioImg" src=""></div>`;
    cardDetailAssignedUser.innerHTML = `<div class="cardBoardInsideUserAndPrio FullNameSplit"><div class="InsideUser" id="InsideUserDetail${i}"></div><div id=InsideUserFullName${i}></div></div><div class="cardDetailSubtasksAll"><div class="detlabel" id="SubtaskHeader${i}">Subtasks:</div><div class="cardDetailSubTasks" id="cardDetailSubTasks${i}"></div></div>`;
    cardDetailDelete.innerHTML = `<div onclick='deleteCard(${id})'><img src="assets/img/board/delete.svg" class="default"><img src="assets/img/board/delete-blue.svg" class="hover">`;
    cardDetailEdit.innerHTML = `<div onclick='editCard(${[i]}, ${id})'><img src="assets/img/board/edit.svg">`;
    renderCategoriesAndUser(i, id);
}


/**
 * Render Categorie and user details
 */
function renderCategoriesAndUser(i, id) {
    renderBackgroundColorCategoryDetail(i);
    renderAssignedUserInBoardDetail(i);
    renderAssignedUserFullName(i);
    renderSubtasksInBoardDetail(i, id);
    prioButtonStyle(i);
}


/**
 * render background color for category in detailed card view
 * @param {number} i - index of the Cards array
 */
function renderBackgroundColorCategoryDetail(i) {
    let cat = cards[i]['category'];
    let catClassDet = document.getElementById(`cardBoardInsideCategoryDetail${i}`);
    for (let k = 0; k < categories.length; k++) {
        if (cat == categories[k]['name']) {
            catClassDet.style['background-color'] = categories[k]['color'];
        } else { }
    };
}

/**
 * render assigned user in card detailed view
 * @param {number} i - index of the Cards array
 */
function renderAssignedUserInBoardDetail(i) {
    for (let j = 0; j < cards[i]['assignedUser'].length; j++) {
        document.getElementById(`InsideUserDetail${i}`).innerHTML += `
            <div class="label-card" style="background-color:${findUserColor(i, j)}">${cards[i]['assignedUser'][j]}</div>
            `;
    }
}


/**
 * help function for addTask to transfer currentListType to add task in correct column
 * @param {string} currentListType - current list type to create card to correct board column
 */
function addTaskToBoardMain(currentListType) {
    if (currentListType == "") {
        currentListType = "ToDo";
    }
    addTaskToBoard(currentListType);
}

/**
 * render arrows to transfer cards to next or previous column
 * @param {number} i - index of the Cards array
 */
function renderListTypeArrows(i) {
    if (cards[i].listType == "ToDo") {
        document.getElementById(`svgToLeft${i}`).classList.add('d-none');
    } else {
        if (cards[i].listType == 'Done') {
            document.getElementById(`svgToRight${i}`).classList.add('d-none');
        }
    }
}

/**
 * change list type of card to previous type in board
 * @param {number} i - index of the Cards array
 */
async function listTypeToLeft(i, id, event) {
    event.stopPropagation();
    for (let j = 0; j < listTypes.length; j++) {
        if (cards[i].listType === listTypes[j].name) {
            let updatedCard = { "listType": listTypes[j - 1].name }
            await saveCardToStorage(id, 'save', updatedCard)
        }
    }
    renderBoard();
}

/**
 * change list type of card to next type in board
 * @param {number} i - index of the Cards array 
 */
async function listTypeToRight(i, id, event) {
    event.stopPropagation();
    for (let j = 0; j < listTypes.length; j++) {
        if (cards[i].listType === listTypes[j].name) {
            let updatedCard = { "listType": listTypes[j + 1].name }
            await saveCardToStorage(id, 'save', updatedCard)
        }
    }
    renderBoard();
}