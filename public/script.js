const gridSize = 32; // Size of the grid (32x32 pixels)
const pixelGrid = document.getElementById('pixel-grid');
let currentColor = '#000000'; // Default color
let isPainting = false; // Flag for global paint mode

// Create the pixel grid
function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const pixel = document.createElement('div');
        pixel.addEventListener('click', () => placePixel(pixel));
        pixel.addEventListener('mousedown', () => startPainting(pixel));
        pixel.addEventListener('mousemove', (e) => paint(e, pixel));
        pixel.addEventListener('mouseup', () => stopPainting());
        pixelGrid.appendChild(pixel);
    }
}

// Place a pixel with the selected color
function placePixel(pixel) {
    pixel.style.backgroundColor = currentColor;
    autoSave(); // Automatically save after each click
}

// Start painting when mouse is pressed
function startPainting(pixel) {
    isPainting = true;
    placePixel(pixel); // Paint on initial click
}

// Paint multiple pixels if mouse is moved while pressed
function paint(event, pixel) {
    if (isPainting) {
        placePixel(pixel);
    }
}

// Stop painting when mouse is released
function stopPainting() {
    isPainting = false;
}

// Select a color from the palette
document.querySelectorAll('.color').forEach(colorDiv => {
    colorDiv.addEventListener('click', () => {
        currentColor = colorDiv.dataset.color;
        // Optional: Highlight the selected color
        document.querySelectorAll('.color').forEach(div => div.style.outline = '');
        colorDiv.style.outline = '2px solid #000';
    });
});

// Auto-save the artwork every time a pixel is changed
function autoSave() {
    const pixels = Array.from(pixelGrid.children).map(pixel => pixel.style.backgroundColor || 'transparent');
    const artworkData = JSON.stringify(pixels);

    // Send artwork data to the backend to save (or save it locally)
    fetch('/save-artwork', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ artwork: artworkData })
        })
        .then(response => response.json())
        .then(data => console.log('Artwork auto-saved!'))
        .catch(error => console.error('Error saving artwork:', error));
}

// Load artwork from the server (Optional, but would be nice to restore artwork on page load)
function loadArtwork() {
    fetch('/load-artwork')
        .then(response => response.json())
        .then(data => {
            const pixels = JSON.parse(data.artwork);
            const pixelElements = Array.from(pixelGrid.children);
            pixels.forEach((color, index) => {
                pixelElements[index].style.backgroundColor = color;
            });
        })
        .catch(error => console.error('Error loading artwork:', error));
}

// Initialize grid on page load and attempt to load artwork
createGrid();
loadArtwork(); // Optional: Load saved artwork on page load