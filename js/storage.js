const STORAGE_TOKEN = '3ENG5I37YYIRIRHAMOTSPWZ7QUU5KTVYOANLRZYR';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

//Save and load contacts
// function saveContactsToStorage(){
//     let contactsAsString = JSON.stringify(Contacts);
//     localStorage.setItem('contacts', contactsAsString);
// }

// function getContactsFromStorage(){

//     let contactsAsString = localStorage.getItem('contacts');
//     if(contactsAsString){
//     Contacts = JSON.parse(contactsAsString);
// }
// }


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


//Save and load contacts in remoteStorage
async function saveContactsToStorage() { // Name muss dann angepasst werden
    let key = 'contacts';
    let value = Contacts;
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}

async function getContactsFromStorage() {
    let key = 'contacts';
    let url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.data) {
            Contacts = JSON.parse(data.data.value);
        } else {
            throw new Error(`Could not find data with key "${key}".`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}


//Save and load cards in remoteStorage
async function saveCardsToStorage() { // Name muss dann angepasst werden
    let key = 'cards';
    let value = cards;
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}

async function getCardsFromStorage() { // Name muss dann angepasst werden
    let key = 'cards';
    let url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.data) {
            cards = JSON.parse(data.data.value);
        } else {
            throw new Error(`Could not find data with key "${key}".`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}


//Save and load categories in remoteStorage
async function saveCategoriesToStorage() { // Name muss dann angepasst werden
    let key = 'categories';
    let value = categories;
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}

async function getCategoriesFromStorage() { // Name muss dann angepasst werden
    let key = 'categories';
    let url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.data) {
            categories = JSON.parse(data.data.value);
        } else {
            throw new Error(`Could not find data with key "${key}".`);
        }
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
}