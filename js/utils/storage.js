export function saveToStorage(key, value) {
    try {
        const json = JSON.stringify(value);
        sessionStorage.setItem(key, json);
    } catch (e) {
        console.log("Error saving to storage:", e)
    }
}

export function loadFromStorage(key) {
    try {
        const json = sessionStorage.getItem(key);
        return json ? JSON.parse(json) : null;
    } catch (e) {
        console.log("Error loading from storage", e);
        return null;
    }
}