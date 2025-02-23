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

let isFormValidated = false;

/**
 * This is the main function that gets the two arrays from remote storage and generates a needed array.
 */
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

/** 
 * This function checks for assigned users to the task and makes them a global variable to later be added to the array "Cards". 
 */
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

/** 
 * This function makes the priority a global variable to later be added to the array "Cards".
 */
function setPriority() {
    if (priority == '0') { window.prio = "Urgent" };
    if (priority == '1') { window.prio = "Medium" };
    if (priority == '2') { window.prio = "Low" };
}

let addedSubtasks = [];

/** 
 * This function gets all the values from the input fields and generates an object that is later going to be added to the array "Cards".
 */
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

/** 
 * This function navigates to board.html with a timer of 1500 milliseconds.
 */
function navigateToBoard() {
    setTimeout(() => {
        document.location.href = "board.html";
    }, 1500);

}

/**
 * This function generates and saves the card in to the remote storage with help of all the small help-functions that are called inside of it.
 */
async function addTaskToBoard(currentListType) {
    checkForInput();
    if (isFormValidated) {
        addTheUsers();
        setPriority();
        if (addedSubtasks.length === 0) {
            subtasks = [];
        };
        cards = []
        await generateNewTaskObject(currentListType);
        // await getCardsFromStorage();
        await cards.push(theNewTask);
        await saveCardsToStorage();
        showTaskCreationSuccess();
        navigateToBoard();
    }
}

function clearAddTaskInput() {
    priority = '';
    addedIds = '';
    theChosenCategory = '';
    addedSubtasks = [];
    subtasks = '';
    clearAddedContacts();
    let taskFormContainer = document.querySelector('.includeTaskForm');
    taskFormContainer.innerHTML = '';
    taskFormContainer.setAttribute('w3-include-html', 'templates/task_form2.html');
    includeHTML();
}

function clearAddedContacts() {
    for (let i = 0; i < Contacts.length; i++) {
        const added = addedContacts[i].added;
        if (added === 'yes') {
            addedContacts[i].added = 'no';
        }
    }
}

/**
 * This function validates the input before allowing the card to be saved to remote storage.
 */
function checkForInput() {
    if (typeof theChosenCategory === 'undefined' || theChosenCategory === '') {
        document.getElementById('FieldCategory').style.display = 'block';
        return 0;
    } else if (typeof addedIds === 'undefined' || addedIds === '' || addedIds.length === 0) {
        document.getElementById('FieldContact').style.display = 'block';
        return 0;
    } else if (typeof priority === 'undefined' || priority === '') {
        document.getElementById('PrioCategory').style.display = 'block';
        return 0;
    } else {
        isFormValidated = true;
    }
}


/** 
 * This function generates the drop down menu with the avaliable categories.
 */
function openCategoryDropDown() {
    let transparentoverlay = document.getElementById('transparentoverlay');
    if (transparentoverlay.classList.contains("dropdownclosed")) {
        openTranspOverlay();
        let categoryMainContainer = document.getElementById('category');
        categoryMainContainer.classList.add('openCategory');
        categoryMainContainer.innerHTML = "";
        categoryMainContainer.innerHTML += `<h5>Category</h5><div class="selectContainer addcatph" onclick="closeCategoryInput()"> Select task category</div>
                                                         <div class="selectCategoryContainer" id="addCategory"> </div>`;
        let categoryContainer = document.getElementById('addCategory');
        categoryContainer.innerHTML = "";
        categoryContainer.innerHTML += `<div class="category-selection" onclick="openCategoryInput()">Add category</div>`;
        for (let i = 0; i < categories.length; i++) {
            const element = categories[i];
            categoryContainer.innerHTML += `<div class="category-selection" onclick="selectedCategory(${i})">${element['name']}<svg class="new-category-color">
        <circle cx="50%" cy="50%" r="12" stroke="black" stroke-width="0" fill="${element['color']}" />
        </svg> </div>`;
        }
    }
}

/**
 * This function generates the input field and color choice for the addition of a category.
 */
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

/** 
 * This function closes the category input field without selecting a category.
 */
function closeCategoryInput() {
    document.getElementById('category').innerHTML = "";
    document.getElementById('category').classList.remove('openCategory');
    document.getElementById('category').innerHTML = `<h5>Category</h5><div class="selectContainer addcatph" id="addCategory" onclick="openCategoryDropDown()">Select task category</div>`;
}

/**
 * Updates the selected category element and displays it in the UI.
 * @param {number} x - The index of the selected category.
 * @returns {void}
 */
function selectedCategory(x) {
    let transparentoverlay = document.getElementById('transparentoverlay');
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
    transparentoverlay.style.display = "none";
    document.getElementById('category').classList.remove('openCategory');
}

/**
 * Renders the selectable category colors in the UI.
 * @returns {void}
 */
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


/**
 * Handles the selection of a category color.
 * @function
 * @param {string} x - The selected category color.
 * @returns {void}
 */
function selectedCategoryColor(x) {
    renderSelectableCategoryColors();
    window.newCategoryColor = x;
    let selectedColorContainer = document.getElementById(`circle_${x}`);
    selectedColorContainer.classList.add('stroke-width-2');
}

/**
 * Adds a new category to the list of categories.
 * @async
 * @function
 * @returns {Promise<void>}
 */
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

/**
 * Opens the dropdown for selecting contacts.
 * This function generates and displays a container with selectable contacts.
 * It also checks if a contact has been added and handles it accordingly.
 * @function
 * @returns {void}
 */
function openDropdownContact() {
    const category = document.getElementById('category');
    if (!category.classList.contains('openCategory')) {
        openTranspOverlay();
        removeClassTranspOverlay();
        generateOpenAddContactMainContainer();
        returnAddedContacts();
    }
}

/**
 * Clears and populates the 'addContact' container based on the addedContacts array.
 * If an element in addedContacts has 'added' set to 'yes', it generates a selected contact,
 * otherwise, it generates an unselected contact.
 * @function
 * @returns {void}
 */
function returnAddedContacts() {
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


/**
 * This function generates the empty body of the selectable contacts list.
 */
function generateOpenAddContactMainContainer() {
    let addContactMainContainer = document.getElementById('assigned_to');
    addContactMainContainer.innerHTML = "";
    addContactMainContainer.innerHTML += `<h5>Assigned to</h5>
    <input type="text" class="selectContainer" placeholder="Select contacts to assign" onclick="closeDropdownContact()"> </input>
    <div class="contacts_list_add_task" id="addContact"></div>`;
}


/**
 * Generates HTML for an unselected contact and appends it to the 'addContact' container.
 * This function creates a visual representation of an unselected contact with a name, initials, and a checkbox.
 * @function
 * @param {number} j - The index of the contact.
 * @param {Object} element - The contact object containing firstName and lastName properties.
 * @returns {void}
 */
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

/**
 * Generates HTML for a selected contact and appends it to the 'addContact' container.
 * This function creates a visual representation of an unselected contact with a name, initials, and a checkbox.
 * @function
 * @param {number} j - the index of the contact. 
 * @param {Object} element - The contact object containing firstName and lastName properties.
 */
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


/**
 * This function generates a transparent overlay that is used to close the dropdown contact list
 */
function openTranspOverlay() {
    let transparentOverlay = document.getElementById('transparentoverlay');
    transparentOverlay.style.display = "block";
}

/** 
 * This function closes the dropdown contact list and at the same time removes the transparent overlay that is used to close that same list 
 */
function closeTranspOverlay() {
    let transparentOverlay = document.getElementById('transparentoverlay');
    let categoryMainContainer = document.getElementById('category');
    transparentOverlay.style.display = "none";
    if (!transparentOverlay.classList.contains("dropdownclosed") && !categoryMainContainer.classList.contains('openCategory')) {
        closeDropdownContact();
    }
    if (categoryMainContainer.classList.contains('openCategory')) {
        // console.log('PASST');
        closeCategoryInput();
    }
}

/** 
 * This is a help function that adds a certain classlist to the corresponding object id  
 */
function classToTranspOverlay() {
    let transparentOverlay = document.getElementById('transparentoverlay');
    transparentOverlay.classList.add("dropdownclosed");
}

/** 
 * This is a help function that removes a certain classlist to the corresponding object id  
 */
function removeClassTranspOverlay() {
    let transparentOverlay = document.getElementById('transparentoverlay');
    transparentOverlay.classList.remove("dropdownclosed");
}

/** 
 * This function finds the currently logged in user in the contacts list, and adds the word (You) next to the same contact when generating the contacts 
 */
function currentUserCheck(j) {
    let currentUserLabel = document.getElementById(`currentUserCheck${j}`);
    if (currentUser < Contacts.length) {
        if (Contacts[currentUser]['name'] == Contacts[j]['name']) {
            currentUserLabel.innerHTML = "(You)";
        }
    }
}

/**
 * This function toggles the active state prio options 
 * @param {number} j - The index of the priority button to be activated.
 * @returns {void}
 */
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

/**
 * Displays the task creation success container by removing the 'd-none' class and adding animation class.
 * @returns {void}
 */
function showTaskCreationSuccess() {
    let theContainerToShow = document.getElementById('task_creation_success');
    theContainerToShow.classList.remove('d-none');
    theContainerToShow.classList.add('frame_73_animate');
}