/**
 * The currently logged-in user's index.
 * @type {number}
 */
let currentUser;

let rememberMe;


loadcurrentUser();


/**
 * Checks the login credentials against stored contacts.
 * If successful, sets the current user, stores it in local storage, and redirects to the summary page.
 * If unsuccessful, displays an error message and highlights the password input field.
 */
function checkLogIn() {
    getContactsFromStorage();
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput');
    let isLoggedIn = false; // Variable to track if the login check was successful
    let rememberMeImg = document.getElementById('rememberMe');

    if(rememberMeImg.classList.contains('checkBox')) {
        localStorage.setItem('rememberMe', 1);
    }

    for (let i = 0; i < Contacts.length; i++) {
        let email = Contacts[i].email;
        let password = Contacts[i].password;

        if (emailInput.value === email && passwordInput.value === password) {
            isLoggedIn = true;

            currentUser = i;
            localStorage.setItem('currentUser', currentUser);
            window.location.href = 'summary.html';
            break; // Exit the loop since no further checking is needed
        }
    }

    if (!isLoggedIn) { 
        passwordAlert.textContent = "Wrong password Ups! Try again";
        passwordInput.parentElement.classList.add('redInput');

        setTimeout(() => { // Clear the error message and remove the red highlight after 3 seconds
            passwordAlert.textContent = "";
            passwordInput.parentElement.classList.remove('redInput');
        }, 3000);
    }
}


/**
 * Loads the current user from local storage.
 */
function loadcurrentUser() {
    let storedCurrentUser = localStorage.getItem('currentUser');
    let stordeRememberMe = localStorage.getItem('rememberMe');
    if (storedCurrentUser !== null) {
        currentUser = parseInt(storedCurrentUser);
    }
    if(stordeRememberMe !== null) {
        rememberMe = parseInt(stordeRememberMe);
    }
}


/**
 * Logs in as a guest user and redirects to the summary page.
 */
function guestLogIn() {
    localStorage.setItem('currentUser', 1000);
    window.location.href = 'summary.html';
}