/**
 * Initializes the application by starting the animation and retrieving contacts from storage.
 */
function init() {
    startAnimation();
    getContactsFromStorage();
    window.addEventListener('resize', handleMaxWidthChange);
}


/**
 * Initiates the animation sequence. Changes the logo source for small screens,
 * fades out the start background, and removes it from the DOM after the animation.
 */
function startAnimation() {
    if (window.innerWidth < 510) {
        logo.src = "img/joinlogomobil.png";
    }
    setTimeout(() => {
        let logo = document.getElementById("logo");
        let background = document.getElementById('startBackground');

        setTimeout(() => { logo.src = "img/joinlogo.png"; }, 80)
        logo.classList.add('imgLogo');
        background.style.backgroundColor = "rgba(246, 247, 248, 0%)";
        setTimeout(() => {
            if (background && background.parentNode) {
                background.parentNode.removeChild(background);
            }
        }, 500);
        handleMaxWidthChange();
    }, 500);
}


/**
* Toggles the visibility of the password input field based on the provided index.
* 
* @param {number} i - The index to identify which password input field to toggle (1 or 2).
*/
function togglePasswordVisibility(i) {
    let passwordInput = document.getElementById('passwordInput' + i);
    let passwordImage = document.getElementById('passwordImage' + i);

    if (!passwordImage.src.includes('/assets/img/logInSignUp/lock.svg')) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordImage.src = './assets/img/logInSignUp/eye.svg';
        } else {
            passwordInput.type = 'password';
            passwordImage.src = './assets/img/logInSignUp/hiddeneye.svg';
        }
    }
}


/**
 * Sets up event listeners for password input fields.
 * @function
 * @returns {void}
 */
function setupPasswordInputEventListeners() {
    const passwordInputs = document.querySelectorAll('.passwordInput');
    passwordInputs.forEach((passwordInput) => {
        const passwordImage = passwordInput.nextElementSibling;
        passwordInput.addEventListener('focus', function () {
            updatePasswordImageSrc(passwordInput, passwordImage);
        });
        passwordInput.addEventListener('input', function () {
            updatePasswordImageSrc(passwordInput, passwordImage);
        });
        passwordInput.addEventListener('focusout', function () {
            updatePasswordImageSrc(passwordInput, passwordImage);
        });
    });
}

/**
     * Updates the password image source based on input and focus.
     * @param {HTMLInputElement} passwordInput - The password input field.
     * @param {HTMLImageElement} passwordImage - The associated password image.
     * @returns {void}
     */
function updatePasswordImageSrc(passwordInput, passwordImage) {
    if (passwordInput.value.trim().length > 0) {
        handlePasswordImage(passwordInput, passwordImage)
    } else {
        passwordImage.src = './assets/img/logInSignUp/lock.svg';
    }
}

/**
 * handles the password image change
 * @param {HTMLInputElement} passwordInput - The password input field.
 * @param {HTMLInputElement} passwordImage - The associated password image.
 */
function handlePasswordImage(passwordInput, passwordImage) {
    if (passwordInput.type === 'password') {
        passwordImage.src = './assets/img/logInSignUp/hiddeneye.svg';
    } else {
        passwordImage.src = './assets/img/logInSignUp/eye.svg';
    }
}


/**
 * Function called when the "Remember Me" button is clicked
 */
function checkBox() {
    let rememberMeImg = document.getElementById('rememberMe');
    if (rememberMeImg.classList.contains('checkBox')) {
        localStorage.setItem('rememberMe', 0);
    }
    if (rememberMeImg.classList.contains('uncheckBox')) {
        rememberMeImg.classList.remove('uncheckBox');
        rememberMeImg.classList.add('checkBox');
    } else {
        rememberMeImg.classList.add('uncheckBox');
        rememberMeImg.classList.remove('checkBox');
    }
}

/**
 * Checks if 'Remember Me' option is enabled and sets the corresponding values in the form.
 * @async
 * @function
 * @returns {Promise<void>}
 * @throws {Error} Throws an error if there is an issue retrieving contacts from storage.
 */
async function checkRememberMe() {
    await getContactsFromStorage()
    let rememberMeCheckBox = document.getElementById('rememberMe');
    let emailInput = document.getElementById('emailInput');
    let passwordInput = document.getElementById('passwordInput1');

    if (rememberMe === 1 && currentUser !== 1000) {
        rememberMeCheckBox.click();
        emailInput.value = Contacts[currentUser].email;
        passwordInput.value = Contacts[currentUser].password;
    }
}


/**
 * Function to render the LogIn form
 */
function renderLogIn() {
    let contentbox = document.getElementById('contentbox');

    contentbox.innerHTML = returnLogInHTML();
    setupPasswordInputEventListeners();
    checkRememberMe();
    document.getElementById('headerRight').classList.remove('d-none');
    document.getElementById('footer').classList.remove('d-none');
}


/**
 * Function to render the SignUp form
 */
function renderSignUp() {
    let contentbox = document.getElementById('contentbox');

    contentbox.innerHTML = returnSignUpHTML();
    setupPasswordInputEventListeners();
    document.getElementById('headerRight').classList.add('d-none');
    document.getElementById('banner').innerHTML = 'You Signed Up succeccfully';
}


/**
 * Function to handle SignUp form submission
 */
async function signUpFormOld() {
    let nameInput = document.getElementById('nameInput');
    let emailInput = document.getElementById('emailInput');
    let password1 = document.getElementById('passwordInput1');
    let password2 = document.getElementById('passwordInput2');

    if (checkSamePasswort(password1, password2) && await checkEmail(emailInput.value) && checkTwoWordsforSignUp(nameInput)) {
        let nameArray = nameInput.value.split(' ');
        let firstName = nameArray[0];
        let lastName = nameArray[1];
        let firstTwoLetters = firstName.charAt(0) + lastName.charAt(0);

        saveNewUserData(firstName, lastName, emailInput, firstTwoLetters, nameInput, password1);
        sortContactsAlphabetically(Contacts);
        await saveContactsToStorage();
        resetInputField(nameInput, emailInput, password1, password2);
        show();
        setTimeout(() => { renderLogIn() }, 2000)
    }
}

async function signUpForm() {
    let nameInput = document.getElementById('nameInput');
    let emailInput = document.getElementById('emailInput');
    let password1 = document.getElementById('passwordInput1');
    let password2 = document.getElementById('passwordInput2');

    if (checkSamePasswort(password1, password2) && await checkEmail(emailInput.value) && checkTwoWordsforSignUp(nameInput)) {
        let nameArray = nameInput.value.split(' ');
        let firstName = nameArray[0];
        let lastName = nameArray[1];
        let firstTwoLetters = firstName.charAt(0) + lastName.charAt(0);
        let value = {
            "username": emailInput.value,
            "email": emailInput.value,
            "firstName": firstName,
            "lastName": lastName,
            "password1": password1.value
        }

        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(value)
        });

        if (response.ok) {
            await saveNewUserData(firstName, lastName, emailInput.value, firstTwoLetters, nameInput.value);
            sortContactsAlphabetically(Contacts);
            await saveContactsToStorage();
            resetInputField(nameInput, emailInput, password1, password2);
            show();
            setTimeout(() => { renderLogIn() }, 2000)
        }
    }
}

/**
 * Saves new user data to the Contacts list.
 * @param {string} firstName - The first name of the user.
 * @param {string} lastName - The last name of the user.
 * @param {HTMLInputElement} emailInput - The input element for the email.
 * @param {string} firstTwoLetters - The first two letters of the user's name.
 * @param {HTMLInputElement} nameInput - The input element for the user's name.
 * @param {HTMLInputElement} password1 - The input element for the password.
 * @returns {void}
 */
function saveNewUserData(firstName, lastName, emailInput, firstTwoLetters, nameInput) {
    let user = {
        "firstName": firstName,
        "lastName": lastName,
        "phone": 'Please add a phonenumber',
        "email": emailInput,
        "color": "black",
        "firstLetters": firstTwoLetters,
        "name": nameInput,
    };
    Contacts = [];
    Contacts.push(user);
}

/**
 * Resets the input fields by setting their values to an empty string.
 * @param {HTMLInputElement} name - The input field for the name.
 * @param {HTMLInputElement} email - The input field for the email.
 * @param {HTMLInputElement} password1 - The first password input field.
 * @param {HTMLInputElement} password2 - The second password input field.
 */
function resetInputField(name, email, password1, password2) {
    name.value = '';
    email.value = '';
    password1.value = '';
    password2.value = '';
}

/**
 * Check if the input field contains 2 words
 * @param {string} nameInput 
 * @returns {boolean}
 */
function checkTwoWordsforSignUp(nameInput) {
    let words = nameInput.value.trim().split(' ');
    if (words.length !== 2) {
        nameAlert.textContent = "Bitte Vor- und Nachname eingeben";
        nameInput.parentElement.classList.add('redInput');
        setTimeout(() => { nameAlert.textContent = ""; nameInput.parentElement.classList.remove('redInput'); }, 3000)
        return false;
    } else {
        return true;
    }
}


/**
 * Checks if an email already exists in the Contacts list.
 * @param {string} email - The email to check.
 * @returns {boolean} - Returns true if the email is not found, otherwise false.
 */
async function checkEmail(email) { // check if an email exists
    await getContactsFromStorage();
    for (let i = 0; i < Contacts.length; i++) {
        let userEmail = Contacts[i].email;
        if (email === userEmail) {
            emailAlert.textContent = "E-Mail bereits vorhanden";
            emailInput.parentElement.classList.add('redInput');
            setTimeout(() => { emailAlert.textContent = ""; emailInput.parentElement.classList.remove('redInput'); }, 3000)
            return false;
        }
    }
    return true;
}


/**
 * Checks if two password inputs have the same value.
 * @param {HTMLInputElement} password1 - The first password input element.
 * @param {HTMLInputElement} password2 - The second password input element.
 * @returns {boolean} Returns true if the passwords match, otherwise false.
 */
function checkSamePasswort(password1, password2) {

    if (password1.value !== password2.value) {
        passwordAlert.textContent = "Die Passwörter stimmen nicht überein!";
        password2.parentElement.classList.add('redInput');
        setTimeout(() => {
            passwordAlert.textContent = "";
            password2.parentElement.classList.remove('redInput');
        }, 3000);
    } else {
        return true;
    }
}


/**
 * Function to render the Forgot Password form
 */
function renderForgotPW() {
    let contentbox = document.getElementById('contentbox');

    contentbox.innerHTML = returnForgotPWHTML();
    document.getElementById('headerRight').classList.add('d-none');
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('banner').innerHTML = '<img style="width: 32px" src="assets/img/logInSignUp/sendCheck.svg">An E-Mail has been sent to you';
}

/**
 * Function to check which user Password to reset
 */
function checkResetpassword() {
    let emailInput = document.getElementById('emailInput');
    let emailFound = false;

    for (let i = 0; i < Contacts.length; i++) {
        let userEmail = Contacts[i].email;
        if (emailInput.value === userEmail) {
            show();
            emailFound = true;
            setTimeout(() => { renderResetPassword(i) }, 2000);
            break;
        }
    } if (!emailFound) {
        emailAlert.textContent = "E-Mail nicht vorhanden";
        emailInput.parentElement.classList.add('redInput');
        setTimeout(() => { emailAlert.textContent = ""; emailInput.parentElement.classList.remove('redInput'); }, 3000);
    }

}

/**
 * Renders the reset password page for a given user.
 * @param {number} i - The user index.
 */
function renderResetPassword(i) {
    let contentbox = document.getElementById('contentbox');

    contentbox.innerHTML = returnResetPasswordHTML(i);
    document.getElementById('headerRight').classList.add('d-none');
    document.getElementById('footer').classList.add('d-none');
    document.getElementById('banner').innerHTML = 'You reset your password';
    setupPasswordInputEventListeners();
}

/**
 * Sets a new password for the user at index i.
 * @param {number} i - The index of the user.
 */
async function setNewPassword(i) {
    let user = Contacts[i];
    let password1 = document.getElementById('passwordInput1');
    let password2 = document.getElementById('passwordInput2');

    if (checkSamePasswort(password1, password2)) {
        user.password = password1.value;
        show();
        await saveContactsToStorage();
        setTimeout(() => { renderLogIn() }, 2000);
    }
}

/**
 * Displays a banner for a short duration.
 */
function show() {
    let banner = document.getElementById('banner');

    banner.classList.add("visible");
    setTimeout(() => {
        banner.classList.remove("visible");
    }, 2000)
}

/** 
 * Event listener that calls init() when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', handleMaxWidthChange);


/**
 * Moves the element with ID 'headerRight' to a new parent element.
 * @param {HTMLElement} newParent - The new parent element.
 */
function moveElementToNewPosition(newParent) {
    let elementToMove = document.getElementById('headerRight');
    let footerElement = document.getElementById('footer');

    if (elementToMove && newParent && footerElement) {
        newParent.insertAdjacentElement('beforebegin', elementToMove);
    }
}


/**
 * Handles the change in maximum width of the window.
 * If the window width is less than 510, moves the element with ID 'headerRight' before the footer.
 * If the window width is 510 or more, moves the element with ID 'headerRight' back to the header.
 */
function handleMaxWidthChange() {
    let moveBack = document.getElementById('header');
    let elementToMove = document.getElementById('headerRight');

    if (window.innerWidth < 510) {
        moveElementToNewPosition(document.getElementById('footer'));
    } else {
        if (moveBack && elementToMove)
            moveBack.appendChild(elementToMove);
    }
}


/**
 * Returns HTML code for a login form.
 * @returns {string} The HTML code for the login form.
 */
function returnLogInHTML() {
    return /* html */ `
        <form onsubmit="checkLogIn(); return false;" class="content">
            <div class="headingContainer">
                <h1>Log in</h1>
            </div>
            <div class="blueSeperator"></div>
            <div>
                <div class="inputBox">
                    <div class="inputField">
                        <input required id="emailInput" class="" type="email" placeholder="Email">
                        <img src="./assets/img/logInSignUp/mail.svg" alt="">
                    </div>
                    <div class="inputField">
                        <input required id="passwordInput1" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage1" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(1)">
                    </div>
                    <div id="passwordAlert"></div>
                    <div class="rememberMeForgetBox mobilView">
                        <div class="checkBoxLogIn">
                            <div onclick="checkBox()" id="rememberMe" class="uncheckBox"></div>
                            <span>Remember me</span>
                        </div>
                        <a id="fmp" href="#" onclick="renderForgotPW()"> Forget my password</a>
                    </div>
                </div>
            </div>
            <div class="logInButtonBox">
                <button type="onsubmit" class="logInButton">Log in</button>
                <button type="button" onclick="guestLogIn()" class="logInButton guestLogIn">Guest Log in</button>
            </div>
        </form>
    `;
}

/**
 * Returns HTML code for a sign-up form.
 * @returns {string} The HTML code for the sign-up form.
 */
function returnSignUpHTML() {
    return /* html */ `
        <form onsubmit="signUpForm(); return false;" class="content responsivSignUp">
            <div class="headingContainer">
                <div onclick="renderLogIn()" class="imgHeadingContainer backArrow"></div>
                <h1>Sign Up</h1>
                <div class="imgHeadingContainer"></div>
            </div>
            <div class="blueSeperator"></div>
            <div>
                <div class="inputBox">
                    <div class="inputField">
                        <input required id="nameInput" class="" type="text" placeholder="Vor- und Nachname">
                        <img src="./assets/img/logInSignUp/person.svg" alt="">
                    </div>
                    <div id="nameAlert"></div>
                    <div class="inputField">
                        <input required id="emailInput" class="" type="email" placeholder="Email">
                        <img src="./assets/img/logInSignUp/mail.svg" alt="">
                    </div>
                    <div id="emailAlert"></div>
                    <div class="inputField">
                        <input required id="passwordInput1" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage1" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(1)">
                    </div>
                    <div id="freeAlert"></div>
                    <div class="inputField">
                        <input required id="passwordInput2" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage2" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(2)">
                    </div>
                    <div id="passwordAlert"></div>
                    <div class="rememberMeForgetBox">
                        <div class="checkBoxSignIn">
                            <input type="checkbox" id="rememberMe" class="uncheckBox" required>
                            <span>I accept the </span>
                        </div>
                        <a id="fmp" href="#"> Privacy policy</a>
                    </div>
                </div>
            </div>
            <div class="logInButtonBox">
                <button id="signUp" type="onsubmit" class="logInButton">Sign up</button>
            </div>
        </form>
    `;
}

/**
 * Returns HTML content for the 'Forgot Password' form.
 * @returns {string} The HTML content.
 */
function returnForgotPWHTML() {
    return /* html */ `
        <form onsubmit="checkResetpassword(); return false;" class="content forgotPW">
            <div class="headingContainer">
                <div onclick="renderLogIn()" class="imgHeadingContainer backArrow"></div>
                <h1>I forgot my password</h1>
                <div class="imgHeadingContainer"></div>
            </div>
            <div class="blueSeperator"></div>
            <h2>Don't worry! We will send you an email with the instructions to reset your password.</h2>
            <div>
                <div class="inputBox">
                    <div class="inputField">
                        <input required id="emailInput" class="" type="email" placeholder="Email">
                        <img src="./assets/img/logInSignUp/mail.svg" alt="">
                    </div>
                    <div id="emailAlert"></div>
                </div>
            </div>
            <div class="logInButtonBox">
                <button id="signUp" type="onsubmit" class="sendEmailButton">Send me the email</button>
            </div>
        </form>
    `;
}

/**
 * Returns HTML content for the 'Reset Password' form.
 * @returns {string} The HTML content.
 */
function returnResetPasswordHTML(i) {
    return /* html */ `
        <form onsubmit="setNewPassword('${i}'); return false;" class="content forgotPW">
            <div class="headingContainer">
                <div onclick="renderLogIn()" class="imgHeadingContainer backArrow"></div>
                <h1>Reset your password</h1>
                <div class="imgHeadingContainer"></div>
            </div>
            <div class="blueSeperator"></div>
            <h2>Change your account password</h2>
            <div>
                <div class="inputBox">
                    <div class="inputField">
                        <input required id="passwordInput1" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage1" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(1)">
                    </div>
                    <div class="inputField">
                        <input required id="passwordInput2" class="passwordInput" type="password" placeholder="Password">
                        <img id="passwordImage2" class="passwordImage" src="./assets/img/logInSignUp/lock.svg" alt="" onclick="togglePasswordVisibility(2)">
                    </div>
                    <div id="passwordAlert"></div>
                </div>
            </div>
            <div class="logInButtonBox">
                <button id="signUp" type="onsubmit" class="continueButton">Continue</button>
            </div>
        </form>
    `;
}