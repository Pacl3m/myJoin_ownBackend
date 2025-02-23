// let addedSubtasks = [];

/**
 * Opens the input field for adding a new subtask.
 * Clears the container and inserts input field, close button, separator, and add button.
 * @returns {void}
 */
function openSubtaskInput() {
    let addSubtaskContainer = document.getElementById('addNewSubtask');
    addSubtaskContainer.innerHTML = "";
    addSubtaskContainer.innerHTML += `
        <input type="text" placeholder="New subtask" id="added_subtask">
        <button class="close-category-input-btn" onclick="cancelSubtaskInput()">${smallXSVG}</button>
        <svg height="40" width="3">
            <line x1="2" y1="8" x2="2" y2="32" style="stroke:#d1d1d1;stroke-width:2" />
        </svg>
        <button class="add-category-btn" onclick="addSubtask()">${checkedSmallSVG}</button>
        `;
}

/**
 * Cancels the input of a new subtask.
 * Clears the container and restores the default "Add new subtask" message with an icon.
 * @returns {void}
 */
function cancelSubtaskInput() {
    let addSubtaskContainer = document.getElementById('addNewSubtask');
    addSubtaskContainer.innerHTML = "";
    addSubtaskContainer.innerHTML = `<p style="width: 100%; cursor: text;" onclick="openSubtaskInput()">Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput()">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

/**
 * Handles the addition of a new subtask.
 * It gets the input value for the subtask name, generates the subtask element,
 * updates the UI, and adds the subtask to the list of subtasks.
 * @returns {void}
 */
function addSubtask() {
    let addSubtaskContainer = document.getElementById('addNewSubtask');
    let addedSubtaskNameInput = document.getElementById('added_subtask').value;
    addSubtaskContainer.innerHTML = "";
    addSubtaskContainer.innerHTML = `<p style="width: 100%; cursor: text;" onclick="openSubtaskInput()">Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput()">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    let addedSubtask = {
        "nameSub": addedSubtaskNameInput,
        "status": "unchecked"
    };
    addedSubtasks.push(addedSubtask);
    window.subtasks = addedSubtasks;
    generateTheNewSubtask();
}

/**
 * Generates a new subtask element with the provided name and adds it to the subtask container.
 * @param {string} addedSubtaskNameInput - The name of the new subtask.
 * @returns {void}
 */
function generateTheNewSubtask() {
    let subtaskMain = document.getElementById('added_subtasks_main');
    subtaskMain.innerHTML = '';
    for (let i = 0; i < addedSubtasks.length; i++) {
        let subtask = addedSubtasks[i].nameSub;
        subtaskMain.innerHTML += returnSubtaskHTML(subtask, i);
    }
}

/**
 * Generates HTML for a subtask and returns it as a string.
 * @param {string} subtask - The subtask text.
 * @param {number} i - The index of the subtask.
 * @returns {string} The HTML string for the subtask.
 */
function returnSubtaskHTML(subtask, i) {
    return /* html */`
            <div class="boxes" id="boxes${i}">
                <li>${subtask}</li>
                <div class="subtask_del">
                    <div onclick="delAddedSubtask(${i})"><img src="assets/img/addtask/delete.png" alt=""></div>
                    <svg height="40" width="3">
                        <line x1="2" y1="8" x2="2" y2="32" style="stroke:black;stroke-width:2"></line>
                    </svg>
                    <div onclick="editSubtask(${i})"><img src="assets/img/addtask/edit.png" alt=""></div>
                </div>
            </div>`;
}

/**
 * Deletes the specified subtask from the addedSubtasks array and regenerates the subtask display.
 * @param {number} i - The index of the subtask to be deleted.
 */
function delAddedSubtask(i) {
    addedSubtasks.splice(i, 1);
    generateTheNewSubtask();
}

/**
 * Allows editing of the specified subtask by replacing it with an input field.
 * @param {number} i - The index of the subtask to be edited.
 */
function editSubtask(i) {
    let editBox = document.getElementById(`boxes${i}`);
    editBox.innerHTML = /* html */ `
    <input id="input${i}" style="height: 24px; color: black;" type="text">
    <div class="subtask_del_edit">
        <div onclick="delAddedSubtask(${i})"><img src="assets/img/addtask/delete.png" alt=""></div>
        <svg height="40" width="3">
            <line x1="2" y1="8" x2="2" y2="32" style="stroke:black;stroke-width:2"></line>
        </svg>
        <div onclick="changeSubtask(${i})"><img src="assets/img/addtask/check.png" alt=""></div>
    </div>
    `;
    document.getElementById(`input${i}`).value = addedSubtasks[i].nameSub;
}

/**
 * Changes the specified subtask to the new value provided in the input field and regenerates the subtask display.
 * @param {number} i - The index of the subtask to be changed.
 */
function changeSubtask(i) {
    let newSubtask = document.getElementById(`input${i}`).value;
    addedSubtasks[i].nameSub = newSubtask;
    generateTheNewSubtask();
}

/** 
 * This function generates two arrays from the added contacts to the task. The first array is for the first and last name of the added contact,
 * and the second array is for the ids from the array Contacts, of the added contacts to the task. 
 */
function addContactToTask() {
    let addedContactsToTask = [];
    let addedIdsToTask = [];
    getContactsFromStorage();
    for (let z = 0; z < Contacts.length; z++) {
        const checkbox = document.getElementById("checkBox_" + z);
        const contact = Contacts[z];
        if (checkbox.checked) {
            generateTheAddedContact(contact);
            addedContactsToTask.push(addedContactToTask);
            addedIdsToTask.push(z);
        } else {
            generateTheNotAddedContact(contact);
            addedContactsToTask.push(addedContactToTask);
        }
    }
    window.addedContacts = addedContactsToTask;
    window.addedIds = addedIdsToTask;
}

/**
 * This function generates the object to be added to the addedContactsToTask array from the assigned contact
 * @function
 * @param {Array} contact - The contact object containing firstName and lastName properties.
 * @returns {void}
 */
function generateTheAddedContact(contact) {
    let addedContactFirstName = contact['firstName'];
    let addedContactLastName = contact['lastName'];
    let added = 'yes';
    let theAddedContact = {
        "firstName": addedContactFirstName,
        "lastName": addedContactLastName,
        "added": added,
    };
    window.addedContactToTask = theAddedContact;
}

/**
 * Generates an object representing a not added contact based on the provided contact information.
 * This function creates an object with firstName, lastName, and added properties, indicating that the contact has not been added.
 * @function
 * @param {Object} contact - The contact object containing firstName and lastName properties.
 * @returns {void}
 */
function generateTheNotAddedContact(contact) {
    let addedContactFirstName = contact['firstName'];
    let addedContactLastName = contact['lastName'];
    let added = 'no';
    let theAddedContact = {
        "firstName": addedContactFirstName,
        "lastName": addedContactLastName,
        "added": added,
    };
    window.addedContactToTask = theAddedContact;
}

/**
 * Closes the dropdown contact selection, adds selected contacts to the task, and updates the UI accordingly.
 * This function clears the assigned_to container, re-renders the contact selection input, and updates the overlay classes.
 * @function
 * @returns {void}
 */
function closeDropdownContact() {
    addContactToTask();
    let addContactMainContainer = document.getElementById('assigned_to');
    addContactMainContainer.innerHTML = "";
    addContactMainContainer.innerHTML += `<h5>Assigned to</h5>
        <input type="text" class="selectContainer" placeholder="Select contacts to assign" onclick="openDropdownContact()">
            </input>`;
    renderAddedContactLabels();
    classToTranspOverlay();
    //closeTranspOverlay();
}

/**
 * Renders the labels for added contacts in the 'assigned_to' container.
 * This function dynamically creates and updates the HTML content based on the 'addedContacts' array.
 * @function
 * @returns {void}
 */
function renderAddedContactLabels() {
    let addContactMainContainer = document.getElementById('assigned_to');
    addContactMainContainer.innerHTML += `<div class="added-contacts-name-tags-main" id="added_contacts_name_tags_main"> </div>`;
    for (let p = 0; p < addedContacts.length; p++) {
        const element = addedContacts[p];
        let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
        let addedContactsNameTagsMain = document.getElementById('added_contacts_name_tags_main');
        if (element['added'] == 'yes') {
            addedContactsNameTagsMain.innerHTML += `
        <div class="added-contact-name-tag">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="60" fill="${nameTagsColors[p]}"/>
                </svg>
                <p>${firstTwoLetters}</p>
        </div>
        `
        }
    }
}

/**
 * Handles the selection of a contact.
 * Toggles the checkbox state and applies a CSS class to visually indicate selection.
 * @function
 * @param {number} y - The index of the contact to be selected.
 * @returns {void}
 */
function selectedContact(y) {
    let checkBox = document.getElementById(`checkBox_${y}`);
    checkBox.click();
    let selectedBox = document.getElementById(`addTaskContact_${y}`);
    let hasTheClass = selectedBox.classList.contains('col_2A3647');
    if (hasTheClass) {
        selectedBox.classList.remove('col_2A3647');
    } else {
        selectedBox.classList.add('col_2A3647');
    }
}

/**
 * render subtasks in detailed view of card
 * @param {number} i - index of the Cards array
 */
function renderSubtasksInBoardDetail(i, id) {
    if (cards[i]['subtasks'].length > 0) {
        for (let j = 0; j < cards[i]['subtasks'].length; j++) {
            document.getElementById(`cardDetailSubTasks${i}`).innerHTML += `
                <div id="SubTaskHead${j}" class="subtaskAndCheckbox"><input class="SubTaskCheckbox" id="SubTaskCheckbox${i}${j}" ${cards[i]['subtasks'][j]['status']} type="checkbox" onclick="ChangeCheckboxSubtasks(${i},${j},${id})"><div class="label-subtask">${cards[i]['subtasks'][j]['nameSub']}</div></div>
                `;
        }
    } else {
        subHead = document.getElementById(`SubtaskHeader${i}`);
        subHead.classList.add('d-none');
    }
}

/**
 * check and uncheck subtask checkbox of card
 */
async function ChangeCheckboxSubtasks(i, j, id) {
    if (cards[i]['subtasks'][j]['status'] == "checked") {
        cards[i]['subtasks'][j]['status'] = "unchecked";
        cards[i]['progress']--;
    } else {
        if (cards[i]['subtasks'][j]['status'] == "unchecked") {
            cards[i]['subtasks'][j]['status'] = "checked";
            cards[i]['progress']++;
        }
    }
    let updatedCard = {
        "subtasks": cards[i]['subtasks'],
        "progress": cards[i]['progress']
    };
    await saveCardToStorage(id, 'save', updatedCard);
    renderBoard();
}

/**
 * Render sub task mask
 */
function renderSubTaskMask(i, id) {
    return /* html */ `
    <div class="subtask" id="subtask_main2">
        <h5>Subtasks</h5>
        <div id="addNewSubtask2" class="subtask-input">
            <p>Add new subtask</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput2(${i}, ${id})">
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
function loadSubtasksEditform(i, id) {
    let subtaskMain = document.getElementById('subtasklist');
    subtaskMain.innerHTML = '';
    for (b = 0; b < cards[i]['subtasks'].length; b++) {
        subtaskMain.innerHTML += `<div class="boxes" id="boxes${b}">• ${cards[i]['subtasks'][b].nameSub}<div class="actionlinks"><a href="#" onclick="editLoadedSubtasks(${i},${b},${id})" class="subTaskEdit"><img src="assets/img/board/edit-icon.svg"></a><a href="#" onclick="deleteEditedSubtasks(${i},${b},${id})" class="subTaskDel"><img src="assets/img/board/trash-icon.svg"></a></div></div>`;
    }
}

/**
 * edit subtasks in form 
 * @param {number} i - index of the Cards array
 * @param {number*} b - index of subtask in Cards JSON
 */
function editLoadedSubtasks(i, b, id) {
    let editSubtaskInput = document.getElementById(`subtasklist`);
    editSubtaskInput.innerHTML = `<input type="text" id='inputEditTask${b}'><div class="editactionlinks" style="display:none;" id="editsubtaskbtn"><a href="#" onclick="cancelEditedSubtask(${i},${b},${id})" class="subdellink"><img src="assets/img/board/trash-icon.svg"></a><a href="#" onclick="saveEditedSubtask(${i},${b},${id})" class="subedilink"><img src="assets/img/board/check-icon.svg"></a></div>`;
    document.getElementById('editsubtaskbtn').style.display = "flex";
    let editSubtaskInputValue = document.getElementById(`inputEditTask${b}`);
    editSubtaskInputValue.value = `${cards[i]['subtasks'][b].nameSub}`;
}

/**
 * save edited subtasks to card
 * @param {number} i - index of the Cards array 
 * @param {number} b - index of subtask in Cards JSON
 */
async function saveEditedSubtask(i, b, id) {
    document.getElementById('editsubtaskbtn').style.display = "none";
    let editSubtaskInputValue = document.getElementById(`inputEditTask${b}`);
    cards[i]['subtasks'][b].nameSub = editSubtaskInputValue.value;
    let updatedCard = { "subtasks": cards[i]['subtasks'] }
    await saveCardToStorage(id, 'save', updatedCard)
    loadSubtasksEditform(i, id);
}

/**
 * open subtask input form
 * @param {number} i - index of subtask in Cards JSON
 */
function openSubtaskInput2(i, id) {
    let addSubtaskContainer = document.getElementById('addNewSubtask2');
    addSubtaskContainer.innerHTML = "";
    addSubtaskContainer.innerHTML += `
        <input type="text" placeholder="New subtask" id="added_subtask">
        <button class="close-category-input-btn" onclick="cancelSubtaskInput2()">${smallXSVG}</button>
        <svg height="40" width="3">
            <line x1="2" y1="8" x2="2" y2="32" style="stroke:#d1d1d1;stroke-width:2" />
        </svg>
        <button class="add-category-btn" onclick="addSubtask2(${i}, ${id})">${checkedSmallSVG}</button>
        `;
}

/**
 * cancel edit subtask
 * @param {number} i - index of the Cards array 
 * @param {number} b - index of subtask in Cards JSON
 */
function cancelEditedSubtask(i, b, id) {
    loadSubtasksEditform(i, id);
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
async function addSubtask2(i, id) {
    let subtaskMain = document.getElementById('subtasklist');
    let addSubtaskContainer = document.getElementById('addNewSubtask2');
    let addedSubtask = document.getElementById('added_subtask').value;
    addSubtaskContainer.innerHTML = `<p>Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput2(${i}, ${id})">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    subtaskMain.innerHTML += `   <div class="boxes" id="boxes${b}">• ${addedSubtask}<div class="actionlinks"><a href="#" onclick="editLoadedSubtasks(${i},${b})" class="subTaskEdit"><img src="assets/img/board/edit-icon.svg"></a><a href="#" onclick="deleteEditedSubtasks(${i},${b},${id})" class="subTaskDel"><img src="assets/img/board/trash-icon.svg"></a></div></div>`
    cards[i]['subtasks'].push({ nameSub: addedSubtask, status: "unchecked" });
    addedSubtasks.push(addedSubtask);
    window.subtasks = addedSubtasks;
    let updatedCard = { "subtasks": cards[i]['subtasks'] }
    await saveCardToStorage(id, 'save', updatedCard)
}

/**
 * delete subtask in edit view
 * @param {number} i - index of the Cards array 
 * @param {number} b - index of subtask in Cards JSON
 */
async function deleteEditedSubtasks(i, b, id) {
    cards[i]['subtasks'].splice(b, 1);
    let updatedCard = { "subtasks": cards[i]['subtasks'] };
    await saveCardToStorage(id, 'save', updatedCard)
    loadSubtasksEditform(i, id);
}