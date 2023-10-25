let checkedSmallSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<mask id="mask0_75029_4578" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
<rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_75029_4578)">
<path d="M9.54996 15.65L18.025 7.175C18.225 6.975 18.4625 6.875 18.7375 6.875C19.0125 6.875 19.25 6.975 19.45 7.175C19.65 7.375 19.75 7.6125 19.75 7.8875C19.75 8.1625 19.65 8.4 19.45 8.6L10.25 17.8C10.05 18 9.81663 18.1 9.54996 18.1C9.2833 18.1 9.04996 18 8.84996 17.8L4.54996 13.5C4.34996 13.3 4.25413 13.0625 4.26246 12.7875C4.2708 12.5125 4.37496 12.275 4.57496 12.075C4.77496 11.875 5.01246 11.775 5.28746 11.775C5.56246 11.775 5.79996 11.875 5.99996 12.075L9.54996 15.65Z" fill="#2A3647"/>
</g>
</svg>`;
let smallXSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
let upArrow = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" transform="rotate(180)">
<mask id="mask0_77977_799" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" >
<rect width="24" height="24" fill="#D9D9D9" />
</mask>
<g mask="url(#mask0_77977_799)">
<path d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z" fill="#2A3647"/>
</g>
</svg>`;
let downArrow = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<mask id="mask0_77977_799" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" >
<rect width="24" height="24" fill="#D9D9D9" />
</mask>
<g mask="url(#mask0_77977_799)">
<path d="M11.3 14.3L8.69998 11.7C8.38331 11.3833 8.31248 11.0208 8.48748 10.6125C8.66248 10.2042 8.97498 10 9.42498 10H14.575C15.025 10 15.3375 10.2042 15.5125 10.6125C15.6875 11.0208 15.6166 11.3833 15.3 11.7L12.7 14.3C12.6 14.4 12.4916 14.475 12.375 14.525C12.2583 14.575 12.1333 14.6 12 14.6C11.8666 14.6 11.7416 14.575 11.625 14.525C11.5083 14.475 11.4 14.4 11.3 14.3Z" fill="#2A3647"/>
</g>
</svg>`;

/** This is the main function that gets the two arrays from remote storage and generates a needed array.*/
let addedSubtasks = [];
let isFormValidated = false;
async function main() {
    let contactsInTask = [];
    await getContactsFromStorage();
    await getCategoriesFromStorage();
    for (let j = 0; j < Contacts.length; j++) {
        const contact = Contacts[j];
        let addedContactFirstName = contact['firstName'];
        let addedContactLastName = contact['lastName'];
        let added = 'no';
        let addedContactToTask = {
            "firsName": addedContactFirstName,
            "lastName": addedContactLastName,
            "added": added,
        };
        contactsInTask.push(addedContactToTask);
    }
    window.addedContacts = contactsInTask;
};

/** This function checks for assigned users to the task and makes them a global variable to later be added to the array "Cards". */ 
function addTheUsers() {
    let usersToBeAdded = [];
    let fullNamesToBeAdded = [];
    for (let t = 0; t < addedIds.length; t++) {
        const element = addedIds[t];
        let addedUser = Contacts[element]['firstLetters'];
        usersToBeAdded.push(addedUser);
        let addedUserFullName = Contacts[element]['name'];
        fullNamesToBeAdded.push(addedUserFullName);
    };
    window.addedUsers = usersToBeAdded;
    window.addedUsersFullNames = fullNamesToBeAdded;
}

/** This function makes the priority a global variable to later be added to the array "Cards".*/ 
function setPriority() {
    if (priority == '0') { window.prio = "Urgent" };
    if (priority == '1') { window.prio = "Medium" };
    if (priority == '2') { window.prio = "Low" };
}

/** This function gets all the values from the input fields and generates an object that is later going to be added to the array "Cards".*/ 
function generateNewTaskObject(currentListType) {
    let inputTitle = document.getElementById('addTaskTitle').value;
    let description = document.getElementById('descriptionTextArea').value;
    let dueDate = document.getElementById('date').value;
    let theTaskToBeAdded = {
        "category": `${categories[theChosenCategory]['name']}`,
        "title": inputTitle,
        "description": description,
        "progress": "0",
        "assignedUser": addedUsers,
        "assignedUserFullName": addedUsersFullNames,
        "prio": prio,
        "dueDate": dueDate,
        "subtasks": subtasks,
        "listType": currentListType,
    };
    window.theNewTask = theTaskToBeAdded;
}

/** This function navigates to board.html with a timer of 1500 milliseconds.*/ 
function navigateToBoard() {
    setTimeout(() => {
        document.location.href = "board.html";
    }, 1500);

}

/** This function generates and saves the card in to the remote storage with help of all the small help-functions that are called inside of it.*/  
async function addTaskToBoard(currentListType) {
    checkForInput();
    if (isFormValidated) {
        addTheUsers();
        setPriority();
        if (addedSubtasks.length == '0') { subtasks = [] };
        generateNewTaskObject(currentListType);
        await getCardsFromStorage();
        cards.push(theNewTask);
        saveCardsToStorage();
        showTaskCreationSuccess();
        navigateToBoard();
    }
}

/** This function validates the input before allowing the card to be saved to remote storage.*/
function checkForInput() {
    let inputTitle = document.getElementById('addTaskTitle').value;
    let description = document.getElementById('descriptionTextArea').value;
    let dueDate = document.getElementById('date').value;
    if (!inputTitle) {
        alert("Please enter a title");
        return 0;
    }
    else if (!description) {
        alert("Please enter a description");
        return 0;
    }
    else if (!dueDate) {
        alert("Please set due date");
        return 0;
    }
    else if (typeof theChosenCategory === 'undefined') {
        document.getElementById('FieldCategory').style.display = 'block';
        return 0;
    }
    else if (typeof addedIds === 'undefined') {
        document.getElementById('FieldContact').style.display = 'block';
        return 0;
    }
    else if (typeof priority === 'undefined') {
        document.getElementById('PrioCategory').style.display = 'block';
        return 0;
    } else {
        isFormValidated = true;
    }
}

/** This function generates the drop down menu with the avaliable categories.*/ 
function openCategoryDropDown() {
    let categoryMainContainer = document.getElementById('category');
    categoryMainContainer.innerHTML = "";
    categoryMainContainer.innerHTML += `<h5>Category</h5><div class="selectContainer addcatph" onclick="closeCategoryInput()"> Select task category</div>
                                                         <div class="selectCategoryContainer" id="addCategory"> </div>`;
    let categoryContainer = document.getElementById('addCategory');
    categoryContainer.innerHTML = "";
    ;
    categoryContainer.innerHTML += `<div class="category-selection" onclick="openCategoryInput()">Add category</div>`;
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        categoryContainer.innerHTML += `<div class="category-selection" onclick="selectedCategory(${i})">${element['name']}<svg class="new-category-color">
        <circle cx="50%" cy="50%" r="12" stroke="black" stroke-width="0" fill="${element['color']}" />
        </svg> </div>`;
    }
}

/** This function generates the input field and color choice for the addition of a category.*/
function openCategoryInput() {
    let categoryContainer = document.getElementById('addCategory');
    categoryContainer.innerHTML = "";
    let categoryMainContainer = document.getElementById('category');
    categoryMainContainer.innerHTML = "";
    categoryMainContainer.innerHTML = `
     <h5>Category</h5>
     <div class="add-category-container">
        <input class="added-category-name" id="added_category_name" type="text" placeholder="New category name">
        <button class="close-category-input-btn" onclick="closeCategoryInput()">${smallXSVG}</button>
        <svg height="40" width="3"> <line x1="2" y1="8" x2="2" y2="32" style="stroke:#d1d1d1;stroke-width:2" /> </svg>
        <button class="add-category-btn" onclick="addCategory()">${checkedSmallSVG}</button>
     </div>
     <div class="selectable-category-colors" id="selectable_category_colors"> </div>
     `;
    renderSelectableCategoryColors();
}

/** This function closes the category input field without selecting a category.*/
function closeCategoryInput() {
    document.getElementById('category').innerHTML = "";
    document.getElementById('category').innerHTML = `<h5>Category</h5><div class="selectContainer addcatph" id="addCategory" onclick="openCategoryDropDown()">Select task category</div>`;
}

/** This function closes the category input field and returns a global variable of the chosen category.*/
function selectedCategory(x) {
    let element = categories[x];
    document.getElementById('category').innerHTML = `
    <h5>Category</h5>
    <div class="selectContainer" id="addCategory" onclick="openCategoryDropDown()">
        <div class="category-selection">${element['name']} 
            <svg class="new-category-color">
            <circle cx="12" cy="12" r="10" stroke="black" stroke-width="0" fill="${element['color']}" />
            </svg>
        </div>
    </div>`;
    window.theChosenCategory = x;
}

/** This function renders the available colors to assign to the newly created category.*/ 
function renderSelectableCategoryColors() {
    let selectableColorsMainDIV = document.getElementById('selectable_category_colors');
    selectableColorsMainDIV.innerHTML = "";
    for (let y = 0; y < categoryColors.length; y++) {
        const element = categoryColors[y];
        selectableColorsMainDIV.innerHTML += `
            <div class="selected-category-color" id="${element}" onclick="selectedCategoryColor('${element}')">
                <svg class="new-category-color">
                <circle id="circle_${element}" cx="12" cy="12" r="10" stroke="black" stroke-width="0" fill="${element}" />
                </svg>
            </div>`;
    }
}

/** This function returns a global variable of the selected color for the new category.*/
function selectedCategoryColor(x) {
    renderSelectableCategoryColors();
    window.newCategoryColor = x;
    let selectedColorContainer = document.getElementById(`circle_${x}`);
    selectedColorContainer.classList.add('stroke-width-2');
}

/** This function creates and adds the new category to remote storage.*/
async function addCategory() {
    let categoryNameInput = document.getElementById('added_category_name').value;
    categoryValue = categoryNameInput.toLowerCase();
    let newCategory = {
        name: categoryNameInput,
        color: newCategoryColor,
        value: categoryValue,
    };
    categories.push(newCategory);
    openCategoryDropDown();
    await saveCategoriesToStorage()
    await getCardsFromStorage()
}

/** This function generates the selectable contacts drop down list. */
function openDropdownContact() {
    openTranspOverlay();
    removeClassTranspOverlay();
    generateOpenAddContactMainContainer();
    let addContactContainer = document.getElementById('addContact');
    addContactContainer.innerHTML = "";
    for (let j = 0; j < Contacts.length; j++) {
        const element = Contacts[j];
        const element2 = addedContacts[j];
        const theValue = 'yes';
        if (element2['added'] == theValue) {
            generateSelectedContact(j, element);
            currentUserCheck(j);
        }
        else {
            generateUnselectedContact(j, element);
            currentUserCheck(j);
        }
    }
}

/** This function generates the empty body of the selectable contacts list.*/ 
function generateOpenAddContactMainContainer(){
    let addContactMainContainer = document.getElementById('assigned_to');
    addContactMainContainer.innerHTML = "";
    addContactMainContainer.innerHTML += `<h5>Assigned to</h5>
    <input type="text" class="selectContainer" placeholder="Select contacts to assign" onclick="closeDropdownContact()"> </input>
    <div class="contacts_list_add_task" id="addContact"></div>`;
}

/** This function generates the contacts that have not been added to the selected contacts list.*/ 
function generateUnselectedContact(j, element) {
    let addContactContainer = document.getElementById('addContact');
    let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
    addContactContainer.innerHTML += `
    <div class="add-task-contact" id="addTaskContact_${j}" onclick="selectedContact(${j})">
        <div class="frame_212">
            <div class="frame_79">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 42 42" fill="none">
                <circle cx="50%" cy="50%" r="20" fill="${nameTagsColors[j]}" stroke="white" stroke-width="3px"/>
                </svg>
                <p>${firstTwoLetters}</p>
            </div>    
            <div class="add-task-contact-name">
                ${element['firstName']} ${element['lastName']} <span id="currentUserCheck${j}"></span>
            </div>
        </div>
        <div class="add-task-contact-checkbox"><input type="checkbox" id="checkBox_${j}" onclick="selectedContact(${j})"></div>
    </div>`
}

/** This function generates the contacts that have been added to the selected contacts list. */ 
function generateSelectedContact(j, element) {
    let addContactContainer = document.getElementById('addContact');
    let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
    addContactContainer.innerHTML += `
        <div class="add-task-contact col_2A3647" id="addTaskContact_${j}" onclick="selectedContact(${j})">
            <div class="frame_212">
                <div class="frame_79">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 42 42" fill="none">
                    <circle cx="50%" cy="50%" r="20" fill="${nameTagsColors[j]}" stroke="white" stroke-width="3px"/>
                    </svg>
                    <p>${firstTwoLetters}</p>
                </div>    
                <div class="add-task-contact-name">
                    ${element['firstName']} ${element['lastName']} <span id="currentUserCheck${j}"></span>
                </div>
            </div>
            <div class="add-task-contact-checkbox"><input type="checkbox" id="checkBox_${j}" onclick="selectedContact(${j})" checked></div>
        </div>`
}

/** This function generates a transparent overlay that is used to close the dropdown contact list */
function openTranspOverlay() {
    let transparentOverlay = document.getElementById('transparentoverlay');
    transparentOverlay.style.display = "block";
}

/** This function closes the dropdown contact list and at the same time removes the transparent overlay that is used to close that same list */
function closeTranspOverlay() {
    let transparentOverlay = document.getElementById('transparentoverlay');
    transparentOverlay.style.display = "none";
    if (!transparentOverlay.classList.contains("dropdownclosed")) {
        closeDropdownContact();
    }
}

/** This is a help function that adds a certain classlist to the corresponding object id  */
function classToTranspOverlay() {
    let transparentOverlay = document.getElementById('transparentoverlay');
    transparentOverlay.classList.add("dropdownclosed");
}

/** This is a help function that removes a certain classlist to the corresponding object id  */
function removeClassTranspOverlay() {
    let transparentOverlay = document.getElementById('transparentoverlay');
    transparentOverlay.classList.remove("dropdownclosed");
}

/** This function finds the currently logged in user in the contacts list, and adds the word (You) next to the same contact when generating the contacts */ 
function currentUserCheck(j) {
    let currentUserLabel = document.getElementById(`currentUserCheck${j}`);
    if (currentUser < Contacts.length) {
        if (Contacts[currentUser]['name'] == Contacts[j]['name']) {
            currentUserLabel.innerHTML = "(You)";
        }
    }
}

/** This function generates two arrays from the added contacts to the task. The first array is for the first and last name of the added contact,
 * and the second array is for the ids from the array Contacts, of the added contacts to the task. */
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
        }
        else {
            generateTheNotAddedContact(contact);
            addedContactsToTask.push(addedContactToTask);
        }
    }
    window.addedContacts = addedContactsToTask;
    window.addedIds = addedIdsToTask;
}

/** This function generates the object to be added to the addedContactsToTask array from the assigned contact.*/
function generateTheAddedContact(contact){
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

/** This function generates the object to be added to the addedContactsToTask array from the unassigned contact.*/
function generateTheNotAddedContact(contact){
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



/** This funtion closes the drop down menu and generates the button for openning the same menu for the selection of a contact from the contact list.*/
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

/** This function renders the nametags of the selected contacts.*/ 
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

/** This function checks the checkbox and changes the appearance of the contact in the contact list depending on if the contact has been added to the task or not.*/ 
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

/** This function toggles the active state prio options  */
function addActiveState(j) {
    let btnsTip = document.getElementById('prioButtons').getElementsByClassName('SubTaskPrios');
    if (btnsTip[j].classList.contains('active-state')) {
        btnsTip[j].classList.remove('active-state');
    }
    else {
        for (i = 0; i < btnsTip.length; i++) {
            btnsTip[i].classList.remove('active-state');
        };
        btnsTip[j].classList.add('active-state');
    }
    let priorityNumber = j;
    window.priority = priorityNumber;
};

/** This function generates the input field for the creation of new subtask.*/
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

/** This function closes the subtask input field and generates the button for the opening of the addition of a new subtask.*/ 
function cancelSubtaskInput() {
    let addSubtaskContainer = document.getElementById('addNewSubtask');
    addSubtaskContainer.innerHTML = "";
    addSubtaskContainer.innerHTML = `<p>Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput()">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

/** This function generates the container with the added subtask, also creates an entry in the addedSubtasks array with the newly added subtask.*/
function addSubtask() {

    let addSubtaskContainer = document.getElementById('addNewSubtask');
    let addedSubtaskNameInput = document.getElementById('added_subtask').value;
    addSubtaskContainer.innerHTML = "";
    addSubtaskContainer.innerHTML = `<p>Add new subtask</p>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onclick="openSubtaskInput()">
        <path d="M12.0011 12.0002L12.0018 19.4149M4.58641 12.0008L12.0011 12.0002L4.58641 12.0008ZM19.4159 11.9995L12.0004 11.9995L19.4159 11.9995ZM12.0004 11.9995L12.0005 4.58545L12.0004 11.9995Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    generateTheNewSubtask(addedSubtaskNameInput);
    let addedSubtask = {
        "nameSub": addedSubtaskNameInput,
        "status": "unchecked"
    };
    addedSubtasks.push(addedSubtask);
    window.subtasks = addedSubtasks;
}

/** This function generates the container with the added subtask. */
function generateTheNewSubtask(addedSubtaskNameInput){
    let subtaskMain = document.getElementById('subtask_main');
    subtaskMain.innerHTML += `<div class="boxes">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
        viewBox="0 0 18 17" fill="none">
        <rect x="1" y="0.5" width="16" height="16" rx="3"
            fill="url(#paint0_linear_71853_3184)" stroke="black" />
        <defs>
            <linearGradient id="paint0_linear_71853_3184" x1="9" y1="0.5" x2="9"
                y2="16.5" gradientUnits="userSpaceOnUse">
                <stop stop-color="#F9F9F9" />
                <stop offset="1" stop-color="#F0F0F0" />
            </linearGradient>
        </defs>
    </svg>${addedSubtaskNameInput}
</div>`;
}

/** This function generates and animates the small floating info-box at the task creation success.*/
function showTaskCreationSuccess() {
    let theContainerToShow = document.getElementById('task_creation_success');
    theContainerToShow.classList.remove('d-none');
    theContainerToShow.classList.add('frame_73_animate');
}