/**
 * set style of priority button according to choosen priority
 */
function prioButtonStyle(i) {
    let prioBtnDetail = document.getElementById('priobtndetail');
    let prioBtnDetailImg = document.getElementById('prioImg');
    removePrio();
    if (cards[i]['prio'] == "Urgent") {
        prioBtnDetail.classList.add('prio-high-btn');
        prioBtnDetailImg.src = "assets/img/addtask/prio-high-w.svg";
    } else if (cards[i]['prio'] == "Medium" || cards[i]['prio'] == "Mid") {
        prioBtnDetail.classList.add('prio-med-btn');
        prioBtnDetailImg.src = "assets/img/addtask/prio-medium-w.svg";
    } else if (cards[i]['prio'] == "Low") {
        prioBtnDetail.classList.add('prio-low-btn');
        prioBtnDetailImg.src = "assets/img/addtask/prio-low-w.svg";
    }
}

/**
 * Removes priority classes and resets the image source of the priority button.
 * @function
 * @returns {void}
 */
function removePrio() {
    let prioBtnDetail = document.getElementById('priobtndetail');
    let prioBtnDetailImg = document.getElementById('prioImg');
    for (y = 0; y < cards.length; y++) {
        prioBtnDetail.classList.remove('prio-high-btn');
        prioBtnDetail.classList.remove('prio-med-btn');
        prioBtnDetail.classList.remove('prio-low-btn');
        prioBtnDetailImg.src = "";
    };
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
    selectbox.innerHTML = `<input type="text" placeholder="Select Contacts to assign" id="inputassigneduser" onclick="openDropdownContact2(${i})" onkeyup="openDropdownSearch(${i})">`;
    editCardSave.innerHTML = `<div onclick='saveEditedCard(${[i]})'>Ok`;
    loadActiveStatePrio(i);
    loadSubtasksEditform(i);
    loadAssignedUserEditForm(i);
}

/**
 * Render the current prio state of card
 */
function renderPrioState(i) {
    return /* html */ `
    <div class="addTaskPrios" id="prioButtons2">
                                    <button class="SubTaskPrios2 red" id="prioSelect0" onclick="addActiveState2(${i},0)">Urgent<img
                                            src="./assets/img/addtask/prio-high.svg" alt="" class="default"><img
                                            src="./assets/img/addtask/prio-high-w.svg" alt="" class="active"></button>
                                    <button class="SubTaskPrios2 yellow" id="prioSelect1" onclick="addActiveState2(${i},1)">Medium<img
                                        src="./assets/img/addtask/prio-medium.svg" alt="" class="default"><img
                                        src="./assets/img/addtask/prio-medium-w.svg" alt="" class="active"></button>
                                    <button class="SubTaskPrios2 green" id="prioSelect2" onclick="addActiveState2(${i},2)">Low<img
                                        src="./assets/img/addtask/prio-low.svg" alt="" class="default"><img
                                        src="./assets/img/addtask/prio-low-w.svg" alt="" class="active"></button>
                                </div>`;
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
    } else if (currentPrioSelection == "Mid" || currentPrioSelection == "Medium") {
        let prioSelect1 = document.getElementById('prioSelect1');
        prioSelect1.classList.add('active-state');
    } else if (currentPrioSelection == "Low") {
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
    } else {
        for (f = 0; f < btnsTip.length; f++) {
            btnsTip[f].classList.remove('active-state');
        };
        btnsTip[j].classList.add('active-state');
    }
    let priorityNumber = j;
    window.priority = priorityNumber;
    prioValueForSaving(i, j);
}

/**
 * set prio depending on value 
 * @param {*} i - index of the Cards array
 * @param {*} h - priority number value
 */
function prioValueForSaving(i, h) {
    if (h == 0) {
        prioValue = "Urgent";
    } else if (h == 1) {
        prioValue = "Mid";
    } else if (h == 2) {
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

/**
 * open dropdown menu for contacts in board card
 * @param {number} i - index of the Cards array
 */
function openDropdownContact2(i) {
    let addContactDropdown = document.getElementById('selectuser');
    let selectBoxActivated = document.getElementById('selectbox');
    addContactDropdown.innerHTML = "";
    if (addContactDropdown.style.display == "none") {
        addContactDropdown.style = "display: flex;";
        selectBoxActivated.classList.add('active');
    } else {
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
        addContactDropdown.innerHTML += /* html */ `
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