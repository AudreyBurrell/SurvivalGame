import {
    initializeVariables
} from "./data/updateVariables.js";
import {
    updateHeader
} from "./data/headerData.js";
import {
    initializeTutorial
} from "./tutorial/tutorial.js";
import {
    loadFromStorage,
    saveToStorage
} from "./utils/storage.js";
import {
    initializeWorkerAmounts,
    determineEmployed,
    updateWorkers
} from "./settings/updateWorkers.js";

let open = false;

document.addEventListener("DOMContentLoaded", function () {
    initializeVariables();
    updateHeader();
    const buildOptions = document.getElementById('buildOptions');
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext("2d");
    const TILE_SIZE = 40;
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    document.getElementById('settingsBtn').disabled = true;
    document.getElementById('nextDayBtn').disabled = true;
    document.getElementById('buildToggleBtn').disabled = true;

    setTimeout(() => {
        document.getElementById("screenOverlay").style.display = "block";
        document.getElementById("tutorialPopup").style.display = "block";
    }, 3000); 

});

//OTHER EVENT LISTENERS
//tutorial stuff
document.getElementById('continueTutorialBtn').addEventListener("click", () => {
    //to save space, execute code that is located in a different file
    initializeTutorial();
});

document.getElementById('leaveTutorialBtn').addEventListener("click", () => {
    //update the variables to whatever they are after tutorial
    document.getElementById('settingsBtn').disabled = false;
    document.getElementById('nextDayBtn').disabled = false;
    document.getElementById('buildToggleBtn').disabled = false;
    document.getElementById('screenOverlay').style.display = "none";
    document.getElementById("tutorialPopup").style.display = "none";    
});

//popups that are for everything
//settings
document.getElementById('settingsBtn').addEventListener("click", () => {
    document.getElementById('screenOverlay').style.display = "block";
    document.getElementById('settingsPopup').classList.add('open');
    let population = loadFromStorage('population');
    initializeWorkerAmounts();
    let employed = determineEmployed();
    document.getElementById('populationSettingsDisplay').textContent = `Employed: ${employed}/${population}`;
});

document.getElementById('leaveSettingsBtn').addEventListener("click", () => {
    document.getElementById('settingsPopup').classList.remove('open');
    document.getElementById('screenOverlay').style.display = "none";
});
//the actual -/+ buttons functionality goes here LEFT OFF HERE ------------------------------------------------------------
//(need to add more checks in the updateWorkers to make sure users can't add and add and add)
document.getElementById('minusFarmer').addEventListener("click", () => {
    updateWorkers("farm", -1);
    initializeWorkerAmounts();
})
document.getElementById('plusFarmer').addEventListener("click", () => {
    updateWorkers("farm", +1);
    initializeWorkerAmounts();
})

//<button id="minusFarmer"> - </button>
 //               <p id="farmerWorkersAmount"></p>
   //             <button id="plusFarmer"> + </button>





//build menu
document.getElementById('buildToggleBtn').addEventListener("click", () => {
    console.log("build toggle button clicked");
    open = !open;
    if (open) {
        buildOptions.classList.remove("hidden");
        buildToggleBtn.style.transform = "rotate(180deg)";
    } else {
        buildOptions.classList.add("hidden");
        buildToggleBtn.style.transform = "rotate(0deg)";
    }
});


