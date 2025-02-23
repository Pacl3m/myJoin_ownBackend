const DATABASE_URL = 'https://myjoin-2a48d-default-rtdb.europe-west1.firebasedatabase.app/';
const TEST_URL = 'http://127.0.0.1:8000/api/'
// Speichern von Kontakten
async function saveContactsToStorage() {
    const key = 'contacts/';
    const value = Contacts[0];
    const url = `${TEST_URL}${key}`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
    } catch (error) {
        console.error("Error saving contacts:", error);
    }
}


// Speichern von edit Kontakten oder löschen von Kontakten
async function saveContactToStorage(pk, method, updatedContact) {
    const key = 'contacts/';
    const url = `${TEST_URL}${key}${pk}`;
    try {
        if (method === 'save') {
            await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedContact)
            });
        }
        if (method === 'delete') {
            await fetch(url, {
                method: 'DELETE',
            });
        }
    }
    catch (error) {
        console.error('Fehler bei der API-Anfrage:', error);
    }
}

// Abrufen von Kontakten
async function getContactsFromStorage() {
    const key = 'contacts/';
    const url = `${TEST_URL}${key}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching contacts");
        }
        const data = await response.json();
        if (data) {
            Contacts = Object.values(data).flat();
        } else {
            Contacts = [];
        }
    } catch (error) {
        console.error("Error fetching contacts:", error);
    }
}

// Speichern von Cards
async function saveCardsToStorage() {
    const key = 'cards/';
    const value = cards[0]
    const url = `${TEST_URL}${key}`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        });
    } catch (error) {
        console.error("Error saving cards:", error);
    }
}

// Speichern von Cards
async function saveCardToStorage(id, method, updatedCard) {
    const key = 'cards/';
    const url = `${TEST_URL}${key}${id}`;
    try {
        if (method === 'save') {
            await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCard)
            });
        }
        if (method === 'delete') {
            await fetch(url, {
                method: 'DELETE'
            });
        }
    } catch (error) {
        console.error("Error saving cards:", error);
    }
}

// Abrufen von Cards
async function getCardsFromStorage() {
    const key = 'cards/';
    const url = `${TEST_URL}${key}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error fetching cards");
        }

        const data = await response.json();
        if (data) {
            cards = Object.values(data).flat();
        } else {
            cards = [];
        }
    } catch (error) {
        console.error("Error fetching cards:", error);
    }
}

// Speichern von Categories
async function saveCategoriesToStorage() {
    const key = 'categories/';
    const value = categories;
    // const url = `${DATABASE_URL}${key}.json`;
    const url = `${TEST_URL}${key}`;

    try {
        await fetch(url, {
            method: 'DELETE'
        });
        for (let category of categories) {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(category)
            });

        }
    } catch (error) {
        console.error("Error saving categories:", error);
    }
}

// Abrufen von Categories
async function getCategoriesFromStorage() {
    const key = 'categories/';
    // const url = `${DATABASE_URL}${key}.json`;
    const url = `${TEST_URL}${key}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error fetching categories");
        }

        const data = await response.json();
        if (data) {
            categories = Object.values(data).flat();
            // console.log("Categories loaded:", categories);
        } else {
            // console.log("No categories found!");
            categories = [];
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
