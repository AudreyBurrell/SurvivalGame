import { saveToStorage, loadFromStorage } from "../utils/storage.js";

//initialize the variables (note that for everything that is undefined, I will need to eventually
// fill in values for.)

const INITIAL_STATE = {
    // actual values
    population: 12,
    "house capacity": 4,
    "homeless population": undefined,
    food: 50,
    wood: 0,
    stone: 0,
    tools: 0,

    // percentages
    "birth rate": undefined,
    "death rate": undefined,
    happiness: 100,
    health: 100,
    "danger level": 0,
    "defense strength": undefined,
    "raid chance": 0,
    "natural disaster risk": 0,

    // time/state
    day: 1,
    weather: undefined
};

export function initializeVariables() {
    for (const [key, value] of Object.entries(INITIAL_STATE)) {
        saveToStorage(key, value);
    }
}

