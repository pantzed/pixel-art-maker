document.addEventListener('DOMContentLoaded', function() {

    let brushColor = 'silver';
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
            document.querySelector('section[id="canvas-area"]').appendChild(square);
        }
    }
    addPixels(2.5);

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
        document.querySelector('#canvas-area').addEventListener('mouseup', releaseBrushStroke);
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
});