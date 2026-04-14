import { loadFromStorage, saveToStorage } from "../utils/storage.js";
import { determineWeather } from "../logic/weather.js";

//puts all the necessary header information inside the header
export function updateHeader() {
    let populationAmount = loadFromStorage("population");
    let homelessAmount = loadFromStorage("homelessPopulation");
    let healthAmount = loadFromStorage("health");
    let happinessAmount = loadFromStorage("happiness")
    let strengthAmount = loadFromStorage("defenseStrength");
    let dangerAmount = determineDanger();
    let foodAmount = loadFromStorage("food");
    let woodAmount = loadFromStorage("wood");
    let stoneAmount = loadFromStorage("stone");
    let toolsAmount = loadFromStorage("tools");
    let weather = determineWeather(loadFromStorage('day'));
    document.getElementById("populationDisplay").textContent = `Population: ${populationAmount}`;
    document.getElementById("homelessDisplay").textContent = `Homeless: ${homelessAmount}`;
    document.getElementById('healthDisplay').textContent = `Health: ${healthAmount}%`;
    document.getElementById('happinessDisplay').textContent = `Happiness: ${happinessAmount}%`;
    document.getElementById('strengthDisplay').textContent = `Strength: ${strengthAmount}%`;
    document.getElementById('dangerDisplay').textContent = `Danger: ${dangerAmount}%`;
    document.getElementById('weatherDisplay').textContent = `${weather}`;
    document.getElementById('foodDisplay').textContent = `Food: ${foodAmount}`;
    document.getElementById('woodDisplay').textContent = `Wood: ${woodAmount}`;
    document.getElementById('stoneDisplay').textContent = `Stone: ${stoneAmount}`;
    document.getElementById('toolsDisplay').textContent = `Tools: ${toolsAmount}`;
} 

function determineDanger() {
    let sum = loadFromStorage('raidChance') + loadFromStorage('naturalDisasterRisk');
    saveToStorage('dangerLevel', sum);
    return sum;

    /*
    Notes on this function:
    Eventually need to base danger off of how many days the user is into the game, homeless amount, happiness amount, health, death rate, etc.
    natural disaster risk is going to be calculated based off days into the game and weather
    raid chance is going to be a random number also based off how many days the user is into the game
    * */
}
