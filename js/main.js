import {
    initializeVariables,
    updateBoardAfterClick
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
import {
    canPlaceObject,
    resizeMask
} from "./logic/dropZone.js";

let open = false;
let placingObject = false;
let objectToPlace = "";
let canvas;
let ctx;
let mouseX = 0;
let mouseY = 0;

document.addEventListener("DOMContentLoaded", function () {
    initializeVariables();
    updateHeader();
    const buildOptions = document.getElementById('buildOptions');
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext("2d");
    const TILE_SIZE = 30;
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    document.getElementById('settingsBtn').disabled = true;
    document.getElementById('nextDayBtn').disabled = true;
    document.getElementById('buildToggleBtn').disabled = true; 


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
        placingObject = false;
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
    });
    document.getElementById('plusFarmer').addEventListener("click", () => {
        updateWorkers("farm", +1);
        initializeWorkerAmounts();
    });
    document.getElementById('minusWood').addEventListener("click", () => {
        updateWorkers("wood", -1);
        initializeWorkerAmounts();
    });
    document.getElementById('plusWood').addEventListener("click", () => {
        updateWorkers("wood", +1);
        initializeWorkerAmounts();
    });
    document.getElementById('minusStone').addEventListener("click", () => {
        updateWorkers("stone", -1);
        initializeWorkerAmounts();
    });
    document.getElementById('plusStone').addEventListener("click", () => {
        updateWorkers("stone", +1);
        initializeWorkerAmounts();
    });
    document.getElementById('minusWarrior').addEventListener("click", () => {
        updateWorkers("warrior", -1);
        initializeWorkerAmounts();
    });
    document.getElementById('plusWarrior').addEventListener("click", () => {
        updateWorkers("warrior", +1);
        initializeWorkerAmounts();
    });

    
    //drag and drop logic
    canvas.addEventListener("click", (e) => {
        let placedObjects = loadFromStorage('placedObjects') || [];
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = 30;
        if (canPlaceObject(x, y, size, size) && placingObject) {
            placedObjects.push({ x, y, width: size, height: size, type: objectToPlace });
            console.log("Placed!");
            saveToStorage('placedObjects', placedObjects);
            updateBoardAfterClick(objectToPlace)
            objectToPlace = "";
            placingObject = false;
        } else {
            console.log("Invalid placement");
        }
    });
    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    document.getElementById('placeHouseBtn').addEventListener("click", () => {
        placingObject = true;
        objectToPlace = "house";
    });
    document.getElementById('placeFarmBtn').addEventListener('click', () => {
        placingObject = true;
        objectToPlace = "farm";
    })

    

    //build menu
    document.getElementById('buildToggleBtn').addEventListener("click", () => {
        console.log("build toggle button clicked");
        placingObject = false;
        open = !open;
        if (open) {
            buildOptions.classList.remove("hidden");
            buildToggleBtn.style.transform = "rotate(180deg)";
        } else {
            buildOptions.classList.add("hidden");
            buildToggleBtn.style.transform = "rotate(0deg)";
        }
    });

    //creating the screen
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // TODO: redraw placed objects here later
        let placedObjects = loadFromStorage('placedObjects') || [];
        for (const obj of placedObjects) {
            if (obj.type == "house") { //later replace with the images
                ctx.fillStyle = "red";
            } else if (obj.type == "farm") {
                ctx.fillStyle = "purple";
            }
            ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
            
        }

        // draw preview LAST (on top)
        if (placingObject) {
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = "blue";
            ctx.fillRect(mouseX, mouseY, 30, 30);
            ctx.globalAlpha = 1;
        }

        requestAnimationFrame(render);
    }

    render();

    window.addEventListener("resize", () => {
        resizeCanvas();
        resizeMask();
    });
    setTimeout(() => {
        document.getElementById("screenOverlay").style.display = "block";
        document.getElementById("tutorialPopup").style.display = "block";
    }, 3000); 

});

function drawPreview() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "blue";
    ctx.fillRect(mouseX, mouseY, 30, 30);
    ctx.globalAlpha = 1;
}







