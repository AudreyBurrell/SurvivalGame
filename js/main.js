//Steps (for now)
/*
    2 (or more like 1). Decide on whether or not I want to have a tutorial (probably yes, make sure it has a 
    button to get out of it though and keep the variables from that as the new initializers)
        Note: might as well keep the tutorial on main.html
*/

let population = 12; //LEFT OFF: MAKING A HELPER FUNCTION JUST TO INTIALIZE THE VARIABLES NOW AND AFTER TUTORIAL
let homelessPopulation;
let birthRate;
let deathRate;
let happiness;
let health = 100; //percentage
let food = 50;
let dangerLevel = 0; //percentage
let defenseStrength;
let raidChance = 0; //percentage, again
let naturalDisasterRisk = 0;
let wood;
let stone;
let tools;
let day = 1;
let weather;
let houseCapacity = 4;
//later add variables to store how many people in the jobs and stuff

let justStarting = true; //turns to false after doing the tutorial/skipping the tutorial

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('settingsBtn').disabled = true;
    document.getElementById('nextDayBtn').disabled = true;
    setTimeout(() => {
        document.getElementById("screenOverlay").style.display = "block";
        document.getElementById("tutorialPopup").style.display = "block";
    }, 3000); 
});

document.getElementById('continueTutorialBtn').addEventListener("click", () => {
    //to save space, execute code that is located in a different file
});

document.getElementById('leaveTutorialBtn').addEventListener("click", () => {
    //update the variables to whatever they are after tutorial
    document.getElementById('settingsBtn').disabled = false;
    document.getElementById('nextDayBtn').disabled = false;
    document.getElementById('screenOverlay').style.dispaly = "none";
    document.getElementById("tutorialPopup").style.display = "none";
});
