/**
 * Deletes a contact by its index.
 * @param {number} x - The index of the contact to be deleted.
 * @returns {void}
 * @throws {Error} When trying to delete the current user.
 */
async function deleteContact(x, id) {
    if (x === currentUser) {
        alert('Du kannst dich nicht selber löschen')
    } else {
        // await deleteContactInCards(x);
        Contacts.splice(x, 1);
        await saveContactToStorage(id, 'delete')
        if (currentUser > x && currentUser !== 1000) {
            currentUser--
            localStorage.setItem('currentUser', currentUser);
        };
        document.getElementById('floating_contact').innerHTML = '';
        // await saveContactsToStorage();
        renderContactsList();
    }
}


/**
 * Deletes a contact from cards data.
 * @param {number} x - The index of the contact to be deleted.
 * @returns {Promise<void>}
 */
async function deleteContactInCards(x) {
    await getCardsFromStorage();
    const searchedName = `${Contacts[x].firstName} ${Contacts[x].lastName}`;
    cards.forEach(card => {
        let index = card.assignedUserFullName.indexOf(searchedName);
        if (index !== -1) {
            card.assignedUserFullName.splice(index, 1);
            card.assignedUser.splice(index, 1);
        }
    });
    await saveCardsToStorage();
}


/** 
 * This function generates the HTML code used to display the add new contact overlay container.
 */
function renderAddNewContact() {
    let overlayNewContact = document.getElementById('overlay_new_contact');
    overlayNewContact.classList.remove('d-none');
    overlayNewContact.innerHTML = `<div class="new-contact-main new-contact-main-animate" onclick="doNotClose(event)" id="new_contact_main">
                                        <div class="frame-194">
                                            <div class="capa2">${capa2}</div>
                                            <div class="frame-210">
                                                <div class="frame-211">Add contact</div>
                                                <div class="frame-212">Tasks are better with a team!</div>
                                                <div class="vector-5">${vector5}</div>
                                            </div>
                                        </div>

                                        <div class="frame-79">
                                            <div class="group-9">
                                                    ${group9SVG}
                                                <div class="person">${personSVG} </div>
                                            </div>
                                        </div>
                                        
                                        <div class="frame-215">
                                        <p id="messageExistingContact" style="display: none;">This contact already exists. Please use other e-mail address!</p>
                                        <form  onsubmit="createNewContact(); return false;">
                                            <div class="add-contact-text-main">
                                                <div id="name_Frame" class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="text" required id="add_contact_name" placeholder="Vor- und Nachname">
                                                        ${personSmallSVG}
                                                    </div>
                                                </div>
                                                <div id="name_Alert"></div>
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="email" required id="add_contact_email" placeholder="Email">
                                                        ${emailSmallSVG}
                                                    </div>
                                                </div>
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="tel" id="add_contact_phone" placeholder="Phone" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))">
                                                        ${phoneSmallSVG}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="add-contact-buttons-main">                                                
                                                    <div class="add-contact-cancel" onclick="closeNewContact()">
                                                        <span>Cancel</span> 
                                                        ${xSmallSVG}
                                                    </div>
                                                    <button type="submit" class="add-contact-create"> 
                                                        <span>Create contact</span>
                                                        ${checkSmallSVG}
                                                    </button>
                                                
                                            </div>
                                            </form>
                                        </div>
    
                                    </div>`;

}

/** 
 * This function closes the add new contact overlay without saving the changes anywhere. 
 */
function closeNewContact() {
    let newContactOverlayDiv = document.getElementById('overlay_new_contact');
    let newContactMainDiv = document.getElementById('new_contact_main');
    newContactMainDiv.classList.add('close-new-contact-animate');

    setTimeout(() => {
        void newContactOverlayDiv.offsetWidth;
        newContactOverlayDiv.classList.add('d-none');
        newContactMainDiv.classList.remove('close-new-contact-animate')
    }, "220");

}

/** 
 * This is a generic all-purpose function that is used to stop the propagation of a certain function  
 */
function doNotClose(event) {
    event.stopPropagation();
}


/**
 * Creates a new contact and adds it to the contact list.
 *
 * @returns {Promise<void>}
 */
async function createNewContact() {
    const nameInput = document.getElementById('add_contact_name').value;
    if (checkTwoWords(nameInput)) {
        const [firstName, lastName] = nameInput.split(' ');
        const emailInput = document.getElementById('add_contact_email').value;
        const phoneInput = document.getElementById('add_contact_phone').value;
        const firstTwoLetters = firstName.charAt(0) + lastName.charAt(0);
        const alreadyUser = Contacts.some(contact => contact.email === emailInput);
        if (!alreadyUser) {
            const newContact = {
                "firstName": firstName,
                "lastName": lastName,
                "phone": phoneInput,
                "email": emailInput,
                "color": "black",
                "firstLetters": firstTwoLetters,
                "name": nameInput,
                "password": '1234',
            };
            Contacts = [];
            Contacts.push(newContact);
            sortContactsAlphabetically(Contacts);
            await saveContactsToStorage();
            await getContactsFromStorage();
            const theNewId = findContactIdByEmail(Contacts, emailInput);
            closeNewContact();
            await renderContactsList();
            const target = document.getElementById(`contact_${theNewId}`);
            setTimeout(() => {
                scrollToNewContact('contacts_list', `contact_${theNewId}`);
                setTimeout(() => {
                    target.click();
                }, 550);
            }, 550);
        } else {
            document.getElementById('messageExistingContact').style.display = 'block';
        }
    }
}


/**
 * Check if the input field contains 2 words
 * @param {string} nameInput 
 * @returns {boolean}
 */
function checkTwoWords(nameInput) {
    let words = nameInput.trim().split(' ');
    if (words.length !== 2) {
        name_Alert.textContent = "Bitte Vor- und Nachname eingeben";
        name_Frame.classList.add('redBorder');
        setTimeout(() => { name_Alert.textContent = ""; name_Frame.classList.remove('redBorder'); }, 3000)
        return false;
    } else {
        return true;
    }
}


/**
 * Sorts an array of contacts alphabetically by first name.
 * @param {Array} contacts - The array of contacts to be sorted.
 */
function sortContactsAlphabetically(contacts) {
    contacts.sort((a, b) => {
        const nameA = a.firstName.toLowerCase();
        const nameB = b.firstName.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}



/**
 * Finds the ID of a contact based on the email address.
 * @param {Array} contacts - The array of contacts to search in.
 * @param {string} emailToBeFound - The email address to search for.
 * @returns {number} - The ID of the found contact, or -1 if no contact was found.
 */
function findContactIdByEmail(contacts, emailToBeFound) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].email === emailToBeFound) {
            return contacts[i].id;
        }
    }
    return -1;
}


/**
 * Scrolls to a new contact in a parent element.
 * @param {string} parentId - The ID of the parent element.
 * @param {string} childId - The ID of the child element (contact).
 * @returns {void}
 */
function scrollToNewContact(parentId, childId) {
    const parentElement = document.getElementById(parentId);
    const childElement = document.getElementById(childId);

    if (parentElement && childElement) {
        childElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
}


/**
 * This function generates the HTML code that is used to display the edit contact overlay container
 * @param {number} x 
 */
function renderEditContact(x, id) {
    let element = Contacts[x];
    let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
    let overlayNewContact = document.getElementById('overlay_new_contact');
    overlayNewContact.classList.remove('d-none');
    overlayNewContact.innerHTML = `<div class="new-contact-main new-contact-main-animate" onclick="doNotClose(event)" id="new_contact_main">
                                        <div class="frame-194">
                                            <div class="capa2">${capa2}</div>
                                            <div class="frame-210">
                                                <div class="frame-211">Edit contact</div>
                                                <div class="vector-5">${vector5}</div>
                                            </div>
                                        </div>

                                        <div class="frame-79">
                                            <div class="group-9">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
                                            <circle cx="60" cy="60" r="60" fill="${nameTagsColors[x]}"/>
                                            </svg>
                                            <p>${firstTwoLetters}</p>
                                            </div>
                                        </div>
                                        
                                        <div class="frame-215">
                                        <form  onsubmit="editContact(${x}, ${id}); return false;">
                                            <div class="add-contact-text-main">
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="text" id="edit_name" required placeholder="Name">
                                                        ${personSmallSVG}
                                                    </div>
                                                </div>
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="email" id="edit_email" required placeholder="Email">
                                                        ${emailSmallSVG}
                                                    </div>
                                                </div>
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="tel" id="edit_phone" placeholder="Phone" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))">
                                                        ${phoneSmallSVG}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="add-contact-buttons-main">                                                
                                                    <div class="add-contact-cancel" onclick="deleteContactFromEdit(${x}, ${id}))">
                                                        <span>Delete</span> 
                                                    </div>
                                                    <button type="submit" class="add-contact-create"> 
                                                        <span> Save </span>
                                                        ${checkSmallSVG}
                                                    </button>
                                                
                                            </div>
                                            </form>
                                        </div>
    
                                    </div>`;

    document.getElementById('edit_name').value = element['firstName'] + " " + element['lastName'];
    document.getElementById('edit_email').value = element['email'];
    document.getElementById('edit_phone').value = element['phone'];
    let subMenu = document.getElementById('edit-contact');
    subMenu.style = "display: none;";

}

/**
 * Deletes a contact from the edit view and updates the contact list.
 * @param {number} x - The index of the contact to be deleted.
 * @returns {Promise<void>}
 */
async function deleteContactFromEdit(x, id) {
    // deleteContact(x);
    closeNewContact();
    // await saveContactsToStorage();
    await saveContactToStorage(id, 'delete');
    renderContactsList();
}

/**
 * Edits the details of a contact and updates the contact list.
 * @param {number} x - The index of the contact to be edited.
 * @returns {void}
 */
async function editContact(x, id) {
    let nameInput = document.getElementById('edit_name').value;
    let nameArray = nameInput.split(' ');
    let newFirstName = nameArray[0];
    let newLastName = nameArray[1];
    let newEmail = document.getElementById('edit_email').value;
    let newPhone = document.getElementById('edit_phone').value;
    // let element = Contacts[x];

    // element.firstName = newFirstName;
    // element.lastName = newLastName;
    // element.email = newEmail;
    // element.phone = newPhone;
    // element.name = nameInput;

    const updatedContact = {
        "firstName": newFirstName,
        "lastName": newLastName,
        "email": newEmail,
        "phone": newPhone,
        "name": nameInput
    };
    await saveContactToStorage(id, 'save', updatedContact)
    closeNewContact();
    renderContactsList();
    document.getElementById('floating_contact').innerHTML = "";
    showContactDetails(id, x);
}