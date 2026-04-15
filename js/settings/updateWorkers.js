import { loadFromStorage, saveToStorage } from "../utils/storage.js";


//need to add checks for if the worker amount is now = population, is 0, etc. to disable certain buttons
export function initializeWorkerAmounts() {
    let farmWorkerAmount = Number(loadFromStorage('farmWorkers')) || 0;
    let woodWorkerAmount = Number(loadFromStorage('woodWorkers')) || 0;
    let stoneWorkerAmount = Number(loadFromStorage('stoneWorkers')) || 0;
    let warriorWorkerAmount = Number(loadFromStorage('warriors')) || 0;
    let totalEmployed = determineEmployed();
    document.getElementById('farmerWorkersAmount').textContent = `Farm Workers: ${farmWorkerAmount}`;
    if (loadFromStorage('farmAmount') == 0) { //put an or statement in here to check total employed
        // document.getElementById('minusFarmer').disabled = true;
        // document.getElementById('plusFarmer').disabled = true;
    } else {
        document.getElementById('minusFarmer').disabled = false;
        document.getElementById('plusFarmer').disabled = false;
    }
    document.getElementById('woodWorkersAmount').textContent = `Wood Workers: ${woodWorkerAmount}`;
    if (loadFromStorage('woodShopAmount') == 0) {
        // document.getElementById('minusWood').disabled = true;
        // document.getElementById('plusWood').disabled = true;
    } else {
        document.getElementById('minusWood').disabled = false;
        document.getElementById('plusWood').disabled = false;
    }
    document.getElementById('stoneWorkersAmount').textContent = `Stone Workers: ${stoneWorkerAmount}`;
    if (loadFromStorage('stoneShopAmount') == 0) {
        // document.getElementById('minusStone').disabled = true;
        // document.getElementById('plusStone').disabled = true;
    } else {
        document.getElementById('minusStone').disabled = false;
        document.getElementById('plusStone').disabled = false;
    }
    document.getElementById('warriorWorkersAmount').textContent = `Warriors: ${warriorWorkerAmount}`;
    //warriors don't have a location to be added first
}
export function determineEmployed() {
    let sum = Number(loadFromStorage('farmWorkers')) +
        Number(loadFromStorage('woodWorkers')) +
        Number(loadFromStorage('stoneWorkers')) +
        Number(loadFromStorage('warriors'));
    let population = loadFromStorage('population');
    document.getElementById('populationSettingsDisplay').textContent = `Employed: ${sum}/${population}`
    return sum;
}

export function updateWorkers(job, change) {
    //TO-DO: need to make sure to have functionality from removing workers from jobs when someone dies
    let key;
    if (job == "wood" || job == "stone" || job == "farm") {
        key = `${job}Workers`;
    } else {
        key = "warriors";
    }
    let current = loadFromStorage(key) || 0;
    const totalWorkers = (loadFromStorage("farmWorkers") || 0) +
        (loadFromStorage("woodWorkers") || 0) +
        (loadFromStorage("stoneWorkers") || 0) +
        (loadFromStorage("warriors") || 0);
    const population = loadFromStorage("population") || 0;
    let newValue = current + change;
    if (newValue < 0) newValue = 0;
    if (change > 0 && totalWorkers >= population) {
        return current;
    }
    saveToStorage(key, newValue);
    return newValue;

}
