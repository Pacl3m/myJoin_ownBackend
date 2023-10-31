const STORAGE_TOKEN = 'NXG6821GC3N8UKZYZ3LB1K13W6AEIKIER4AO8G0M';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/**
 * Saves the contacts array to the storage using a POST request.
 * @async
 * @function
 * @returns {Promise<Object>} A Promise that resolves to the response from the storage.
 */
async function saveContactsToStorage() {
    let key = 'contacts';
    let value = Contacts;
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}


/**
 * Loads contacts from the storage
 */
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


/**
 * Save and load cards in remoteStorage
 * @returns {Promise<Object>} A Promise that resolves to the response from the storage.
 */
async function saveCardsToStorage() { 
    let key = 'cards';
    let value = cards;
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}


/**
 * Loads cards from the storage
 */
async function getCardsFromStorage() { 
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


/**
 * Saves categories in the storage
 * @returns {Promise<Object>} A Promise that resolves to the response from the storage. 
 */
async function saveCategoriesToStorage() {
    let key = 'categories';
    let value = categories;
    let payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)}).then(res => res.json());
}


/**
 * Loads categories from the storage
 */
async function getCategoriesFromStorage() {
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