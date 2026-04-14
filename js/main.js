import {
    initializeVariables
} from "./data/updateVariables.js";
import {
    initializeTutorial
} from "./tutorial/tutorial.js";
//Steps (for now)
/*
    2 (or more like 1). Decide on whether or not I want to have a tutorial (probably yes, make sure it has a 
    button to get out of it though and keep the variables from that as the new initializers)
        Note: might as well keep the tutorial on main.html
*/


let justStarting = true; //turns to false after doing the tutorial/skipping the tutorial

document.addEventListener("DOMContentLoaded", function () {
    initializeVariables();
    document.getElementById('settingsBtn').disabled = true;
    document.getElementById('nextDayBtn').disabled = true;
    setTimeout(() => {
        document.getElementById("screenOverlay").style.display = "block";
        document.getElementById("tutorialPopup").style.display = "block";
    }, 3000); 
});

document.getElementById('continueTutorialBtn').addEventListener("click", () => {
    //to save space, execute code that is located in a different file
    initializeTutorial();
});

document.getElementById('leaveTutorialBtn').addEventListener("click", () => {
    //update the variables to whatever they are after tutorial
    document.getElementById('settingsBtn').disabled = false;
    document.getElementById('nextDayBtn').disabled = false;
    document.getElementById('screenOverlay').style.display = "none";
    document.getElementById("tutorialPopup").style.display = "none";
});
