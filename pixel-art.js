document.addEventListener('DOMContentLoaded', function() {

    let brushColor = 'white';
    let defaultPaletteColors = ['white', 'silver', 'gray', 'black', 'red', 'maroon', 'yellow', 'olive', 'lime', 'green', 'aqua', 'teal', 'blue', 'navy', 'fuchsia', 'purple'];
    let customPaletteColors = [];

    document.body.querySelector('section[id="palette-area"]').addEventListener('click', function(event){
        brushColor = getComputedStyle(event.target).backgroundColor;
        let currentBrushColor = brushColor;
        document.getElementById('current-color-value').innerHTML = currentBrushColor;
    });

    function addCustomColorToBrush() {
        brushColor = event.target.value;
        updateCurrentColorDisplay();
    }

    function updateCurrentColorDisplay() {
        document.getElementById('current-color-value').innerHTML = brushColor;
    }

    document.querySelector('#color-picker').addEventListener('change', addCustomColorToBrush);

    function addPixels(percent) {
        let loops = (100/percent)*(80/percent);
        for (let i=0; i<loops; i++){
            let square = document.createElement('div');
            square.style.cssText = `box-sizing: border-box; width: ${percent}%; float: left; padding-bottom: ${percent}%; border: 1px solid gray;`;
            square.style.backgroundColor = 'rgb(255, 255, 255)';
            document.querySelector('section[id="canvas-area"]').appendChild(square);
        }
    }
    addPixels(10);

    function buildColorPalette() {
        let paletteArea = document.querySelector('section[id="palette-area"]');
        defaultPaletteColors.forEach(function(color){
            let colorOption = document.createElement('div');
            colorOption.classList.add('color-option');
            colorOption.style.backgroundColor = color;
            paletteArea.querySelector('section[id="default-colors"]').appendChild(colorOption);
        });
    }
    buildColorPalette();

    document.querySelector('#canvas-area').addEventListener('mousedown', startBrushStroke);

    function startBrushStroke() {
        console.log('start');
        event.preventDefault();
        colorCell(event);
        document.querySelector('#canvas-area').addEventListener('mouseover', drawBrushStroke);
        document.querySelector('html').addEventListener('mouseup', releaseBrushStroke);
    }

    function drawBrushStroke(){
        console.log("draw");
        event.preventDefault();
        colorCell(event);
    }

    function releaseBrushStroke(){
        console.log("released");
        event.preventDefault();
        document.querySelector('#canvas-area').removeEventListener('mouseover', drawBrushStroke);
    }

    function colorCell(event){
        event.target.style.backgroundColor = brushColor;
        event.target.style.borderColor = brushColor;
    }

    document.getElementById('canvas-area').addEventListener('mouseover', getCellColor);
    document.getElementById('canvas-area').addEventListener('dblclick', startFloodFill);

    let startingColor;
    
    function getCellColor() {
        startingColor = getComputedStyle(event.target).backgroundColor;
        console.log(startingColor);
    }
    

    function startFloodFill() {
        let startingIndex = (Array.from(event.currentTarget.childNodes).indexOf(event.target));
        console.log(Array.from(event.currentTarget.childNodes));
        floodFill(startingIndex);
        return;
        }

    function floodFill(currentIndex){
        let north = event.currentTarget.childNodes[currentIndex - 10];
        let east = event.currentTarget.childNodes[currentIndex + 1];
        let south = event.currentTarget.childNodes[currentIndex + 10];
        let west = event.currentTarget.childNodes[currentIndex - 1];
        if (currentIndex - 10 > 2) {
            if (north.style.backgroundColor === startingColor) {
                north.style.backgroundColor = brushColor;
                north.style.borderColor = brushColor;
                console.log(currentIndex - 10);
                floodFill(currentIndex - 10);
            }
        }
        if (currentIndex + 1 < 83){
            if (east.style.backgroundColor === startingColor){
                east.style.backgroundColor = brushColor;
                east.style.borderColor = brushColor
                console.log(currentIndex + 1);
                floodFill(currentIndex + 1);
            }
        }
        if (currentIndex + 10 < 83){
            if (south.style.backgroundColor === startingColor){
                south.style.backgroundColor = brushColor;
                south.style.borderColor = brushColor;
                console.log(currentIndex + 10);
                floodFill(currentIndex + 10)
            }
        }
        if (currentIndex - 1 > 2){
            if (west.style.backgroundColor === startingColor){
                west.style.backgroundColor = brushColor;
                west.style.borderColor = brushColor;
                console.log(currentIndex - 1);
                floodFill(currentIndex - 1);
            }
        }
        else {
            return;
        }    
    }
});