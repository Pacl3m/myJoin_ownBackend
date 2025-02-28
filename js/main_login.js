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
function checkLogInOld() {
    getContactsFromStorage();
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput1');
    let isLoggedIn = false;
    let rememberMeImg = document.getElementById('rememberMe');

    if (rememberMeImg.classList.contains('checkBox')) {
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
            break;
        }
    }

    if (!isLoggedIn) {
        passwordAlert.textContent = "Wrong password Ups! Try again";
        passwordInput.parentElement.classList.add('redInput');

        setTimeout(() => {
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
    if (stordeRememberMe !== null) {
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


async function checkLogIn() {
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput1');
    let isLoggedIn = false;
    let rememberMeImg = document.getElementById('rememberMe');

    const url = `${URL}login/`;
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput1').value;
    let value = {
        "email": email,
        "password": password
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(value)
        });

        const data = await response.json();

        if (data.success) {
            await getContactsFromStorage();
            sortContactsAlphabetically(Contacts);
            for (let i = 0; i < Contacts.length; i++) {
                if (Contacts[i].email === data.email) {
                    localStorage.setItem('currentUser', i);
                    break;
                }
            }
            window.location.href = "summary.html";
        }
        if (!data.success) {
            passwordAlert.textContent = "Wrong password Ups! Try again";
            passwordInput.parentElement.classList.add('redInput');

            setTimeout(() => {
                passwordAlert.textContent = "";
                passwordInput.parentElement.classList.remove('redInput');
            }, 3000);
        }
    } catch (error) {
        console.error("Fehler beim Login:", error);
    }
}
