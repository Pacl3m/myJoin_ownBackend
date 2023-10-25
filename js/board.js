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
            listTypes[0]['amount']++;
            document.getElementById('cardBoardToDo').innerHTML +=
                renderBoardTemplate(i);
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
        listTypes[1]['amount']++;
        document.getElementById('cardBoardInProgress').innerHTML +=
            renderBoardTemplate(i);
        renderBoardFunctionsTemplate(i);
    } else { renderBoardCardsAwaitingFeedback(i) };
}

/**
 * Render all AwaitingFeedback cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardCardsAwaitingFeedback(i) {
    if (cards[i]['listType'] == 'Awaitingfeedback') {
        listTypes[2]['amount']++;
        document.getElementById('cardBoardAwaitingfeedback').innerHTML +=
            renderBoardTemplate(i);
        renderBoardFunctionsTemplate(i);
    } else { renderBoardCardsDone(i) };
}

/**
 * Render all Done cards in board
 * @param {number} i - index of the Cards array
 */
function renderBoardCardsDone(i) {
    if (cards[i]['listType'] == 'Done') {
        listTypes[3]['amount']++;
        document.getElementById('cardBoardDone').innerHTML +=
            renderBoardTemplate(i);
    } else { }
    renderBoardFunctionsTemplate(i);
}

/**
 * HTML temnplate for render functions
 * @param {number} i 
 * @returns html content
 */
function renderBoardTemplate(i) {
    return `<div class="cardBoard" draggable="true" id="card${i}" ondragstart="startDragging(${i})" onclick='openCard(${i})'>
    <div class="cardBoardInside">
        <div class="cardHeadMain">
        <div class="cardBoardInsideCategory"; id="cardBoardInsideCategory${i}">${cards[i]['category']}</div>
        <div class="svgImage"><div class="svgMinus90Degree" id="svgToLeft${i}" onclick="listTypeToLeft(${i})">${svgArrowLeft}</div><div class="svgPlus90Degree" id="svgToRight${i}" onclick="listTypeToRight(${i})">${svgArrowRight}</div></div>
        </div>
        <div class="cardBoardInsideTitleAndDescrption">
            <div class="cardBoardInsideTitle">${cards[i]['title']}</div>
            <div class="cardBoardInsideDescription">${cards[i]['description']}</div>
        </div>
        <div class="cardBoardInsideProgress" id="cardBoardInsideProgress${i}"><div class="progressBar"><div class="progress" id="progressBar${i}"></div></div>
        <div><p>${cards[i]['progress']}/${cards[i]['subtasks'].length} Done</p></div>
        </div>
        <div class="cardBoardInsideUserAndPrio">
        <div class="InsideUser" id="InsideUser${i}"></div><img src="/assets/img/board/${cards[i]['prio']}.svg" alt="">
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
    if (cards[i]['subtasks'].length == 0) {
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
function openCard(i, event) {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('CardDetail').style = "display:block;";
    let cardDetailCat = document.getElementById('cardDetailCat');
    let cardDetailTitle = document.getElementById('cardDetailTitle');
    let cardDetailDesc = document.getElementById('cardDetailDesc');
    let cardDetailDueDate = document.getElementById('cardDetailDueDate');
    let cardDetailPrio = document.getElementById('cardDetailPrio');
    let cardDetailAssignedUser = document.getElementById('cardDetailAssignedUser');
    let cardDetailDelete = document.getElementById('deleteCard');
    let cardDetailEdit = document.getElementById('editCard');
    cardDetailCat.innerHTML = `<div class="cardBoardInsideCategory" id="cardBoardInsideCategoryDetail${i}">${cards[i]['category']}</div>`;
    cardDetailTitle.innerHTML = `${cards[i]['title']}`;
    cardDetailDesc.innerHTML = `${cards[i]['description']}`;
    cardDetailDueDate.innerHTML = `<span class="detlabel">Due date:</span>${cards[i]['dueDate']}`;
    cardDetailPrio.innerHTML = `<span class="detlabel">Priority:</span><div id="priobtndetail">${cards[i]['prio']}<img id="prioImg" src=""></div>`;
    cardDetailAssignedUser.innerHTML = `<div class="cardBoardInsideUserAndPrio FullNameSplit"><div class="InsideUser" id="InsideUserDetail${i}"></div><div id=InsideUserFullName${i}></div></div><div class="cardDetailSubtasksAll"><div class="detlabel" id="SubtaskHeader${i}">Subtasks:</div><div class="cardDetailSubTasks" id="cardDetailSubTasks${i}"></div></div>`;
    cardDetailDelete.innerHTML = `<div onclick='deleteCard(${[i]})'><img src="assets/img/board/delete.svg" class="default"><img src="assets/img/board/delete-blue.svg" class="hover">`;
    cardDetailEdit.innerHTML = `<div onclick='editCard(${[i]})'><img src="assets/img/board/edit.svg">`;
    renderCategoriesAndUser(i);
}


/**
 * Render Categorie and user details
 */
function renderCategoriesAndUser(i){
    renderBackgroundColorCategoryDetail(i);
    renderAssignedUserInBoardDetail(i);
    renderAssignedUserFullName(i);
    renderSubtasksInBoardDetail(i);
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
 * render subtasks in detailed view of card
 * @param {number} i - index of the Cards array
 */
function renderSubtasksInBoardDetail(i) {
    if (cards[i]['subtasks'].length > 0) {
        for (let j = 0; j < cards[i]['subtasks'].length; j++) {
            document.getElementById(`cardDetailSubTasks${i}`).innerHTML += `
                <div id="SubTaskHead${j}" class="subtaskAndCheckbox"><input class="SubTaskCheckbox" id="SubTaskCheckbox${i}${j}" ${cards[i]['subtasks'][j]['status']} type="checkbox" onclick="ChangeCheckboxSubtasks(${i},${j})"><div class="label-subtask">${cards[i]['subtasks'][j]['nameSub']}</div></div>
                `;
        }
    } else {
        subHead = document.getElementById(`SubtaskHeader${i}`);
        subHead.classList.add('d-none');
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
async function listTypeToLeft(i) {
    for (let j = 0; j < listTypes.length; j++) {
        if (cards[i].listType === listTypes[j].name) {
            const nextListTypeIndex = (j - 1) % listTypes.length;
            cards[i].listType = listTypes[nextListTypeIndex].name;
            break;
        }
    }
    event.stopPropagation();
    await saveCardsToStorage();
    renderBoard();
}

/**
 * change list type of card to next type in board
 * @param {number} i - index of the Cards array 
 */
async function listTypeToRight(i) {
    for (let j = 0; j < listTypes.length; j++) {
        if (cards[i].listType === listTypes[j].name) {
            const nextListTypeIndex = (j + 1) % listTypes.length;
            cards[i].listType = listTypes[nextListTypeIndex].name;
            break;
        }
    }
    event.stopPropagation();
    await saveCardsToStorage();
    renderBoard();
}

/**
 * check and uncheck subtask checkbox of card
 */
async function ChangeCheckboxSubtasks(i, j) {
    if (cards[i]['subtasks'][j]['status'] == "checked") {
        cards[i]['subtasks'][j]['status'] = "unchecked";
        cards[i]['progress']--;
    } else {
        if (cards[i]['subtasks'][j]['status'] == "unchecked") {
            cards[i]['subtasks'][j]['status'] = "checked";
            cards[i]['progress']++;
        }
    }
    await saveCardsToStorage();
    renderBoard();
}

/**
 * set style of priority button according to choosen priority
 */
function prioButtonStyle(i) {
    let prioBtnDetail = document.getElementById('priobtndetail');
    let prioBtnDetailImg = document.getElementById('prioImg');
    for (y = 0; y < cards.length; y++) {
        prioBtnDetail.classList.remove('prio-high-btn');
        prioBtnDetail.classList.remove('prio-med-btn');
        prioBtnDetail.classList.remove('prio-low-btn');
        prioBtnDetailImg.src = "";
    };
    if (cards[i]['prio'] == "Urgent") {
        prioBtnDetail.classList.add('prio-high-btn');
        prioBtnDetailImg.src = "assets/img/addtask/prio-high-w.svg";

    } else
        if (cards[i]['prio'] == "Medium" || cards[i]['prio'] == "Mid") {
            prioBtnDetail.classList.add('prio-med-btn');
            prioBtnDetailImg.src = "assets/img/addtask/prio-medium-w.svg";
        } else
            if (cards[i]['prio'] == "Low") {
                prioBtnDetail.classList.add('prio-low-btn');
                prioBtnDetailImg.src = "assets/img/addtask/prio-low-w.svg";
            }
}

/**
 * delete card from board
 * @param {number} i - index of the Cards array 
 */
async function deleteCard(i) {
    cards.splice(i, 1);
    await saveCardsToStorage();
    closeOverlay();
}

/**
 * edit card function in card detailed view
 * @param {number} i - index of the Cards array
 */
function editCard(i) {
    document.getElementById('CardDetail').style = "display:none;";
    document.getElementById('CardEditForm').style = "display:block;";
    document.getElementById('editCardTitle').value = `${cards[i]['title']}`;
    document.getElementById('editCardDescription').value = `${cards[i]['description']}`;
    document.getElementById('editCardDueDate').value = `${cards[i]['dueDate']}`;
    document.getElementById('editCardPrio2').innerHTML = renderPrioState(i);
    document.getElementById('editCardSubtasks').innerHTML = renderSubTaskMask(i);
    let addUserInput = document.getElementById('selectbox');
    addUserInput.innerHTML = `<input type="text" placeholder="Select Contacts to assign" id="inputassigneduser" onclick="openDropdownContact2(${i})" onkeyup="openDropdownSearch(${i})">`;
    let editCardSave = document.getElementById('editCardSave');
    editCardSave.innerHTML = `<div onclick='saveEditedCard(${[i]})'>Ok`;
    loadActiveStatePrio(i);
    loadSubtasksEditform(i);
    loadAssignedUserEditForm(i);
}

/**
 * Render the current prio state of card
 */
function renderPrioState(i) {
    return `
    <div class="addTaskPrios" id="prioButtons2">
                                    <button class="SubTaskPrios2 red" id="prioSelect0" onclick="addActiveState2(${i},0)">Urgent<img
                                            src="/assets/img/addtask/prio-high.svg" alt="" class="default"><img
                                            src="/assets/img/addtask/prio-high-w.svg" alt="" class="active"></button>
                                    <button class="SubTaskPrios2 yellow" id="prioSelect1" onclick="addActiveState2(${i},1)">Medium<img
                                        src="/assets/img/addtask/prio-medium.svg" alt="" class="default"><img
                                        src="/assets/img/addtask/prio-medium-w.svg" alt="" class="active"></button>
                                    <button class="SubTaskPrios2 green" id="prioSelect2" onclick="addActiveState2(${i},2)">Low<img
                                        src="/assets/img/addtask/prio-low.svg" alt="" class="default"><img
                                        src="/assets/img/addtask/prio-low-w.svg" alt="" class="active"></button>
                                </div>`;
}

/**
 * Render sub task mask
 */
function renderSubTaskMask(i){
    return `
    <div class="subtask" id="subtask_main2">
        <h5>Subtasks</h5>
        <div id="addNewSubtask2" class="subtask-input">
            <p>Add new subtask</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput2(${i})">
                <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        <div id="subtasklist"></div>
        <div class="checkboxes" id="added_subtasks_main">
        </div>
    </div>`;
}

/**
 * load form to edit subtasks in detailed view of card
 * @param {number} i - index of the Cards array
 */
function loadSubtasksEditform(i) {
    let subtaskMain = document.getElementById('subtasklist');
    subtaskMain.innerHTML = '';
    for (b = 0; b < cards[i]['subtasks'].length; b++) {
        subtaskMain.innerHTML += `<div class="boxes" id="boxes${b}">• ${cards[i]['subtasks'][b].nameSub}<div class="actionlinks"><a href="#" onclick="editLoadedSubtasks(${i},${b})" class="subTaskEdit"><img src="assets/img/board/edit-icon.svg"></a><a href="#" onclick="deleteEditedSubtasks(${i},${b})" class="subTaskDel"><img src="assets/img/board/trash-icon.svg"></a></div></div>`;
    }
}

/**
 * edit subtasks in form 
 * @param {number} i - index of the Cards array
 * @param {number*} b - index of subtask in Cards JSON
 */
function editLoadedSubtasks(i, b) {
    let editSubtaskInput = document.getElementById(`subtasklist`);
    editSubtaskInput.innerHTML = `<input type="text" id='inputEditTask${b}'><div class="editactionlinks" style="display:none;" id="editsubtaskbtn"><a href="#" onclick="cancelEditedSubtask(${i},${b})" class="subdellink"><img src="assets/img/board/trash-icon.svg"></a><a href="#" onclick="saveEditedSubtask(${i},${b})" class="subedilink"><img src="assets/img/board/check-icon.svg"></a></div>`;
    document.getElementById('editsubtaskbtn').style.display = "flex";
    let editSubtaskInputValue = document.getElementById(`inputEditTask${b}`);
    editSubtaskInputValue.value = `${cards[i]['subtasks'][b].nameSub}`;
}

/**
 * save edited subtasks to card
 * @param {number} i - index of the Cards array 
 * @param {number} b - index of subtask in Cards JSON
 */
function saveEditedSubtask(i, b) {
    document.getElementById('editsubtaskbtn').style.display = "none";
    let editSubtaskInputValue = document.getElementById(`inputEditTask${b}`);
    cards[i]['subtasks'][b].nameSub = editSubtaskInputValue.value;
    loadSubtasksEditform(i);
}

/**
 * open subtask input form
 * @param {number} i - index of subtask in Cards JSON
 */
function openSubtaskInput2(i) {
    let addSubtaskContainer = document.getElementById('addNewSubtask2');
    addSubtaskContainer.innerHTML = "";
    addSubtaskContainer.innerHTML += `
        <input type="text" placeholder="New subtask" id="added_subtask">
        <button class="close-category-input-btn" onclick="cancelSubtaskInput2()">${smallXSVG}</button>
        <svg height="40" width="3">
            <line x1="2" y1="8" x2="2" y2="32" style="stroke:#d1d1d1;stroke-width:2" />
        </svg>
        <button class="add-category-btn" onclick="addSubtask2(${i})">${checkedSmallSVG}</button>
        `;
}

/**
 * cancel edit subtask
 * @param {number} i - index of the Cards array 
 * @param {number} b - index of subtask in Cards JSON
 */
function cancelEditedSubtask(i, b) {
    loadSubtasksEditform(i);
}

/**
 * cancel edit subtask form
 */
function cancelSubtaskInput2() {
    let addSubtaskContainer = document.getElementById('addNewSubtask2');
    addSubtaskContainer.innerHTML = `<p>Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput2(${i})">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

/**
 * add new subtask to card in edit card view
 * @param {number} i - index of the Cards array
 */
function addSubtask2(i) {
    let subtaskMain = document.getElementById('subtasklist');
    let addSubtaskContainer = document.getElementById('addNewSubtask2');
    let addedSubtask = document.getElementById('added_subtask').value;
    addSubtaskContainer.innerHTML = `<p>Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput2(${i})">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    subtaskMain.innerHTML += `   <div class="boxes" id="boxes${b}">• ${addedSubtask}<div class="actionlinks"><a href="#" onclick="editLoadedSubtasks(${i},${b})" class="subTaskEdit"><img src="assets/img/board/edit-icon.svg"></a><a href="#" onclick="deleteEditedSubtasks(${i},${b})" class="subTaskDel"><img src="assets/img/board/trash-icon.svg"></a></div></div>`
    cards[i]['subtasks'].push({ nameSub: addedSubtask, status: "unchecked" });
    addedSubtasks.push(addedSubtask);
    window.subtasks = addedSubtasks;
}

/**
 * delete subtask in edit view
 * @param {number} i - index of the Cards array 
 * @param {number} b - index of subtask in Cards JSON
 */
function deleteEditedSubtasks(i, b) {
    cards[i]['subtasks'].splice(b, 1);
    loadSubtasksEditform(i);
}

/**
 * load current priority state
 * @param {number} i - index of the Cards array
 */
function loadActiveStatePrio(i) {
    let currentPrioSelection = cards[i]['prio'];
    if (currentPrioSelection == "Urgent") {
        let prioSelect0 = document.getElementById('prioSelect0');
        prioSelect0.classList.add('active-state');
    } else
        if (currentPrioSelection == "Mid" || currentPrioSelection == "Medium") {
            let prioSelect1 = document.getElementById('prioSelect1');
            prioSelect1.classList.add('active-state');
        } else
            if (currentPrioSelection == "Low") {
                let prioSelect2 = document.getElementById('prioSelect2');
                prioSelect2.classList.add('active-state');
            }
}

/**
 * remove or add prio state
 * @param {number} i - index of the Cards array
 * @param {number} j - index of priority number
 */
function addActiveState2(i, j) {
    let btnsTip = document.getElementById('prioButtons2').getElementsByClassName('SubTaskPrios2');
    if (btnsTip[j].classList.contains('active-state')) {
        btnsTip[j].classList.remove('active-state');
    }
    else {
        for (f = 0; f < btnsTip.length; f++) {
            btnsTip[f].classList.remove('active-state');
        };
        btnsTip[j].classList.add('active-state');
    }
    let priorityNumber = j;
    window.priority = priorityNumber;
    prioValueForSaving(i, j);
}

let prioValue;
/**
 * set prio depending on value 
 * @param {*} i - index of the Cards array
 * @param {*} h - priority number value
 */
function prioValueForSaving(i, h) {
    if (h == 0) {
        prioValue = "Urgent";
    } else
        if (h == 1) {
            prioValue = "Mid";
        } else
            if (h == 2) {
                prioValue = "Low";
            }
    cards[i]['prio'] = prioValue;
}

/**
 * save edited card to board
 * @param {number} i - index of the Cards array 
 */
async function saveEditedCard(i) {
    cards[i]['title'] = document.getElementById('editCardTitle').value;
    cards[i]['description'] = document.getElementById('editCardDescription').value;
    cards[i]['dueDate'] = document.getElementById('editCardDueDate').value;

    //cards[i]['assignedUser'] = document.getElementById('editCardAssignedTo').value;
    cards.push();
    await saveCardsToStorage();
    openCard(i);
    document.getElementById('CardEditForm').style = "display:none;";
}

/**
 * drag and drop function, start dragging element 
 * @param {number} i - index of the Cards array
 */
function startDragging(i) {
    currentDraggedElement = i;
    const cardElement = document.getElementById('card' + i);
    cardElement.classList.add('dragging'); // Füge die Klasse 'dragging' hinzu
}

/**
 * allow elements to drop in area with event
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * set new list type for card after dropped in new column of board
 * @param {string} listType - name of list type
 */
async function moveTo(listType) {
    getCardsFromStorage();
    cards[currentDraggedElement]['listType'] = listType.slice(9);
    await saveCardsToStorage();
    renderBoard();
}

//Save and load cards
// function saveCardsToStorage() {
//     let cardsAsString = JSON.stringify(cards);
//     localStorage.setItem('cards', cardsAsString);
// }

// function getCardsFromStorage() {

//     let cardsAsString = localStorage.getItem('cards');
//     if (cardsAsString) {
//         cards = JSON.parse(cardsAsString);
//     }
// }

/**
 * open dropdown menu for contacts in board card
 * @param {number} i - index of the Cards array
 */
function openDropdownContact2(i) {
    let addContactDropdown = document.getElementById('selectuser');
    let selectBoxActivated = document.getElementById('selectbox');
    let findContact = document.getElementById('inputassigneduser').value;
    let findContactFormatted = findContact.toLowerCase();
    addContactDropdown.innerHTML = "";
    if (addContactDropdown.style.display == "none") {
        addContactDropdown.style = "display: flex;";
        selectBoxActivated.classList.add('active');
    }
    else {
        addContactDropdown.style = "display: none;";
        selectBoxActivated.classList.remove('active');
    };
    showAssignedUserOfCard(i);
    openTransparentOverlay();
}


/**
 * Render assigned user in dropdown and add class
 */
function showAssignedUserOfCard(i) {
    for (p = 0; p < Contacts.length; p++) {
        loadAssignedUserToForm(i, p);
        if (cards[i]['assignedUserFullName'].includes(Contacts[p]['name'])) {
            let addClassAssignedUser = document.getElementById(`addusercard${p}`);
            addClassAssignedUser.classList.add('added');
            let changeCheckboxImg = document.getElementById(`userchecked${p}`);
            changeCheckboxImg.src = "assets/img/board/checkbox-checked.svg";
        };
    }
}


/**
 * add user to card
 * @param {number} i - index of the Cards array
 * @param {*} p 
 */
function addUser(i, p) {
    let indexOfUser = cards[i]['assignedUserFullName'].indexOf(Contacts[p]['name']);
    let addClassAssignedUser = document.getElementById(`addusercard${p}`);
    let changeCheckboxImg = document.getElementById(`userchecked${p}`);
    if (indexOfUser == -1) {
        addNewUser(i, p, addClassAssignedUser, changeCheckboxImg);
    }
    else if (cards[i]['assignedUserFullName'].includes(Contacts[p]['name'])) {
        removeUser(i, p, indexOfUser, addClassAssignedUser, changeCheckboxImg);
    };
}


/**
 * Assigned user dropdown: Add selected user to card.
 */
function addNewUser(i, p, addClassAssignedUser, changeCheckboxImg) {
    cards[i]['assignedUser'].push(Contacts[p]['firstLetters']);
    cards[i]['assignedUserFullName'].push(Contacts[p]['name']);
    addClassAssignedUser.classList.add('added');
    changeCheckboxImg.src = "assets/img/board/checkbox-checked.svg";
}


/**
 * Assigned user dropdown: Remove selected user from card.
 */
function removeUser(i, p, indexOfUser, addClassAssignedUser, changeCheckboxImg) {
    cards[i]['assignedUser'].splice(indexOfUser, 1);
    cards[i]['assignedUserFullName'].splice(indexOfUser, 1);
    addClassAssignedUser.classList.remove('added');
    changeCheckboxImg.src = "assets/img/board/checkbox-unchecked.svg";
}

/**
 * open dropdown search menu 
 * @param {number} i - index of the Cards array 
 */
function openDropdownSearch(i) {
    let findContact = document.getElementById('inputassigneduser').value;
    let findContactFormatted = findContact.toLowerCase();
    let addContactDropdown = document.getElementById('selectuser');
    addContactDropdown.style = "display: flex;";
    addContactDropdown.innerHTML = "";
    openTransparentOverlay();
    findContacts(i, findContactFormatted);
}

/**
 * Assigned user search
 */
function findContacts(i, findContactFormatted) {
    for (p = 0; p < Contacts.length; p++) {
        if (Contacts[p]['name'].toLowerCase().includes(findContactFormatted)) {
            loadAssignedUserToForm(i, p);
            openTransparentOverlay();
            if (cards[i]['assignedUserFullName'].includes(Contacts[p]['name'])) {
                let addClassAssignedUser = document.getElementById(`addusercard${p}`);
                addClassAssignedUser.classList.add('added');
                let changeCheckboxImg = document.getElementById(`userchecked${p}`);
                changeCheckboxImg.src = "assets/img/board/checkbox-checked.svg";
            };
        }
    }
}

/**
 * load assigned user to form
 * @param {number} i - index of the Cards array
 * @param {*} p 
 */
function loadAssignedUserToForm(i, p) {
    let findContact = document.getElementById('inputassigneduser').value;
    let findContactFormatted = findContact.toLowerCase();
    let addContactDropdown = document.getElementById('selectuser');
    if (Contacts[p]['name'].toLowerCase().includes(findContactFormatted)) {
        addContactDropdown.innerHTML += `
        <div class="addusertocard" onclick="addUser(${i}, ${p})" id="addusercard${p}">
        <div class="label-card" style="background-color:${nameTagsColors[p]}">${Contacts[p]['firstLetters']}</div>
        <div class="card-name" id="contactsname${i}${p}">${Contacts[p]['name']}</div>
        <img src="assets/img/board/checkbox-unchecked.svg" class="usercheckb default" id="userchecked${p}">
        <img src="assets/img/board/checkbox-checked.svg" class="usercheckb hover"></div>`;
    }
}

/**
 * Creates a transparent overlay on card
 */
function openTransparentOverlay() {
    let transparentOverlay = document.getElementById('overlaytransparent');
    transparentOverlay.style.display = "block";
}

/**
 * Close dropdown by click on transparent overlay
 */
function closeTransparentOverlay() {
    removeDropDownClass();
    let transparentOverlay = document.getElementById('overlaytransparent');
    transparentOverlay.style.display = "none";
}

/**
 * Closes the dropdown
 */
function removeDropDownClass() {
    let addContactDropdown = document.getElementById('selectuser');
    addContactDropdown.style = "display: none;";
}

/**
 * Render assigned user in edit card form.
 * @param {number} i - index of the Cards array
 */
function loadAssignedUserEditForm(i) {
    let assignedUserEditForm = document.getElementById('assignedUserEditForm');
    assignedUserEditForm.innerHTML = "";
    for (let j = 0; j < cards[i]['assignedUser'].length; j++) {
        assignedUserEditForm.innerHTML += `
            <div class="label-card" style="background-color:${findUserColor(i, j)}">${cards[i]['assignedUser'][j]}</div>`;
    }
}