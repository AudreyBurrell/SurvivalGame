import { saveToStorage, loadFromStorage } from "../utils/storage.js";
import { updateHeader } from "./headerData.js";

//initialize the variables (note that for everything that is undefined, I will need to eventually
// fill in values for.)

const INITIAL_STATE = {
    // actual values
    population: 12,
    houseCapacity: 4,
    homelessPopulation: 12,
    food: 50,
    wood: 50,
    stone: 50,

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
    weather: undefined,

    //workers
    farmWorkers: 0,
    woodWorkers: 0,
    stoneWorkers: 0,
    warriors: 0,

    //board state
    houses: 0,
    woodShopAmount: 0,
    stoneShopAmount: 0,
    farmAmount: 0,
    fortificationAmount: 0,
    placedObjects: [] //stores the x, y, width, and height of each object
};

export function initializeVariables() {
    for (const [key, value] of Object.entries(INITIAL_STATE)) {
        saveToStorage(key, value);
    }
}

export function updateBoardAfterClick(item) {
    //need to add in checks to subtract supplies, disable buttons if needed, etc.
    //let's say house needs 10 wood 10 stone
    //farm needs 10 wood 10 stone 10 food
    //wood shop needs 20 wood 10 stone
    //stone shop needs 10 wood 20 stone
    //fortification needs 25 wood 25 stone
    let data;
    let woodAmount = loadFromStorage('wood');
    let stoneAmount = loadFromStorage('stone');
    let foodAmount = loadFromStorage('food');
    if (item == "house") {
        data = loadFromStorage('houses');
        data += 1;
        woodAmount -= 10;
        stoneAmount -= 10;
        saveToStorage('houses', data);
        saveToStorage('wood', woodAmount);
        saveToStorage('stone', stoneAmount);
        //this also influences homeless amount
        let homeless = loadFromStorage('homelessPopulation');
        if (homeless > 0) {
            homeless = Math.max(0, homeless - 4);
            saveToStorage('homelessPopulation', homeless);
        }
    } else if (item == "farm") {
        data = loadFromStorage('farmAmount');
        data += 1;
        woodAmount -= 10;
        stoneAmount -= 10;
        foodAmount -= 10;
        saveToStorage("farmAmount", data);
        saveToStorage('wood', woodAmount);
        saveToStorage('stone', stoneAmount);
        saveToStorage('food', foodAmount);
    } else if (item == "wood") {
        data = loadFromStorage('woodShopAmount');
        data += 1;
        woodAmount -= 20;
        stoneAmount -= 10;
        saveToStorage('woodShopAmount', data);
        saveToStorage('wood', woodAmount);
        saveToStorage('stone', stoneAmount);
    } else if (item == "stone") {
        data = loadFromStorage('stoneShopAmount');
        data += 1;
        woodAmount -= 10;
        stoneAmount -= 20;
        saveToStorage('stoneShopAmount', data);
        saveToStorage('wood', woodAmount);
        saveToStorage('stone', stoneAmount);
    } else if (item == 'fortification') {
        data = loadFromStorage('fortificationAmount');
        data += 1;
        woodAmount -= 25;
        stoneAmount -= 25;
        saveToStorage('fortificationAmount', data);
        saveToStorage('wood', woodAmount);
        saveToStorage('stone', stoneAmount);
    }
    disableButtons(woodAmount, stoneAmount, foodAmount);
    updateHeader();
} 

function disableButtons(woodAmount, stoneAmount, foodAmount) {
    let disableHouse = (woodAmount < 10 || stoneAmount < 10);
    let disableFood = (woodAmount < 10 || stoneAmount < 10 || foodAmount < 10);
    let disableWood = (woodAmount < 20 || stoneAmount < 10);
    let disableStone = (woodAmount < 10 || stoneAmount < 20);
    let disableFortification = (woodAmount < 25 || stoneAmount < 25);
    if (disableHouse) {
        document.getElementById('placeHouseBtn').disabled = true;
    }
    if (disableFood) {
        document.getElementById('placeFarmBtn').disabled = true;
    }
    if (disableWood) {
        document.getElementById('placeWoodBtn').disabled = true;
    }
    if (disableStone) {
        document.getElementById('placeStoneBtn').disabled = true;
    }
    if (disableFortification) {
        document.getElementById('placeFortBtn').disabled = true;
    }
}

