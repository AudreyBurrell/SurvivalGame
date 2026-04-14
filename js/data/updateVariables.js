import { saveToStorage, loadFromStorage } from "../utils/storage.js";

//initialize the variables (note that for everything that is undefined, I will need to eventually
// fill in values for.)

const INITIAL_STATE = {
    // actual values
    population: 12,
    houseCapacity: 4,
    homelessPopulation: 12,
    food: 50,
    wood: 0,
    stone: 0,
    tools: 0,

    // percentages
    birthRate: undefined,
    deathRate: undefined,
    happiness: 50,
    health: 100,
    dangerLevel: 0,
    defenseStrength: 100,
    raidChance: 0,
    naturalDisasterRisk: 0,

    // time/state
    day: 1,
    weather: undefined
};

export function initializeVariables() {
    for (const [key, value] of Object.entries(INITIAL_STATE)) {
        saveToStorage(key, value);
    }
}

