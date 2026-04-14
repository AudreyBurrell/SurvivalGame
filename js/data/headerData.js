import { loadFromStorage } from "../utils/storage.js";

//puts all the necessary header information inside the header
export function updateHeader() {
    let populationAmount = loadFromStorage("population");
    let homelessAmount = loadFromStorage("homelessPopulation");
    document.getElementById("populationDisplay").textContent = `Population: ${populationAmount}`;
    document.getElementById("homelessDisplay").textContent = `Homeless: ${homelessAmount}`;
} 


