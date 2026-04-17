import { loadFromStorage } from "../utils/storage.js";

const maskImage = new Image();
maskImage.src = "../../assets/Background_BW.png";

let maskCanvas, maskCtx;
let maskReady = false;

maskImage.onload = () => {
    maskCanvas = document.createElement("canvas");
    // Use window dimensions instead of canvas element dimensions
    maskCanvas.width = window.innerWidth;
    maskCanvas.height = window.innerHeight;
    maskCtx = maskCanvas.getContext("2d");
    maskCtx.drawImage(maskImage, 0, 0, maskCanvas.width, maskCanvas.height);
    maskReady = true;
};

// Call this from main.js whenever the window resizes
export function resizeMask() {
    if (!maskReady || !maskImage.complete) return;
    maskCanvas.width = window.innerWidth;
    maskCanvas.height = window.innerHeight;
    maskCtx.drawImage(maskImage, 0, 0, maskCanvas.width, maskCanvas.height);
}

export function canPlace(x, y) {
    if (!maskReady) return false;
    const pixel = maskCtx.getImageData(x, y, 1, 1).data;
    const brightness = (pixel[0] + pixel[1] + pixel[2]) / 3;
    return brightness > 150;
}

export function isOverlapping(x, y, w, h) {
    let placedObjects = loadFromStorage('placedObjects');
    if (!placedObjects) return false;
    return placedObjects.some(obj => {
        return !(
            x + w < obj.x ||
            x > obj.x + obj.width ||
            y + h < obj.y ||
            y > obj.y + obj.height
        );
    });
}

export function canPlaceObject(x, y, w, h) {
    return canPlace(x, y) && !isOverlapping(x, y, w, h);
}