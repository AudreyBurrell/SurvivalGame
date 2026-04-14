import {
    initializeVariables
} from "./data/updateVariables.js";
import {
    initializeTutorial
} from "./tutorial/tutorial.js";

let open = false;

document.addEventListener("DOMContentLoaded", function () {
    initializeVariables();
    const buildToggleBtn = document.getElementById('buildToggleBtn');
    const buildOptions = document.getElementById('buildOptions');
    buildToggleBtn.addEventListener("click", () => {
        open = !open;
        if (open) {
            buildOptions.classList.remove("hidden");
            buildToggleBtn.style.transform = "rotate(180deg)";
        } else {
            buildOptions.classList.add("hidden");
            buildToggleBtn.style.transform = "rotate(0deg)";
        }
    });
    document.getElementById('settingsBtn').disabled = true;
    document.getElementById('nextDayBtn').disabled = true;
    buildToggleBtn.disabled = true;

    setTimeout(() => {
        document.getElementById("screenOverlay").style.display = "block";
        document.getElementById("tutorialPopup").style.display = "block";
    }, 3000); 
});

//tutorial stuff
document.getElementById('continueTutorialBtn').addEventListener("click", () => {
    //to save space, execute code that is located in a different file
    initializeTutorial();
});

document.getElementById('leaveTutorialBtn').addEventListener("click", () => {
    //update the variables to whatever they are after tutorial
    document.getElementById('settingsBtn').disabled = false;
    document.getElementById('nextDayBtn').disabled = false;
    document.getElementById('buildToggleBtn').disabled = false;;
    document.getElementById('screenOverlay').style.display = "none";
    document.getElementById("tutorialPopup").style.display = "none";
});


