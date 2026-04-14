import { loadFromStorage, saveToStorage } from "../utils/storage.js";

let farmWorkerAmount = loadFromStorage('farmWorkers'); //NOTE: the buttons should be disabled if there isn't an item of these on the board
let woodWorkerAmount = loadFromStorage('woodWorkers');
let stoneWorkerAmount = loadFromStorage('stoneWorkers');
let warriorWorkerAmount = loadFromStorage('warriors');

//need to add checks for if the worker amount is now = population, is 0, etc. to disable certain buttons
export function initializeWorkerAmounts() {
    determineEmployed();
    document.getElementById('farmerWorkersAmount').textContent = `Farm Workers: ${farmWorkerAmount}`;
    if (loadFromStorage('farmAmount') == 0) {
        document.getElementById('minusFarmer').disabled = true;
        document.getElementById('plusFarmer').disabled = true;
    } else {
        document.getElementById('minusFarmer').disabled = false;
        document.getElementById('plusFarmer').disabled = false;
    }
    document.getElementById('woodWorkersAmount').textContent = `Wood Workers: ${woodWorkerAmount}`;
    if (loadFromStorage('woodShopAmount') == 0) {
        document.getElementById('minusWood').disabled = true;
        document.getElementById('plusWood').disabled = true;
    } else {
        document.getElementById('minusWood').disabled = false;
        document.getElementById('plusWood').disabled = false;
    }
    document.getElementById('stoneWorkersAmount').textContent = `Stone Workers: ${stoneWorkerAmount}`;
    if (loadFromStorage('stoneShopAmount') == 0) {
        document.getElementById('minusStone').disabled = true;
        document.getElementById('plusStone').disabled = true;
    } else {
        document.getElementById('minusStone').disabled = false;
        document.getElementById('plusStone').disabled = false;
    }
    document.getElementById('warriorWorkersAmount').textContent = `Warriors: ${warriorWorkerAmount}`;
    //warriors don't have a location to be added first
}
export function determineEmployed() {
    return loadFromStorage('farmWorkers') + loadFromStorage('stoneWorkers') + loadFromStorage('woodWorkers') + loadFromStorage('warriors');
}

export function updateWorkers(job, change) {
    //TO-DO: need to make sure to have functionality from removing workers from jobs when someone dies

}
