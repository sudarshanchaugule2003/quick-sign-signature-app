let colorPicker = document.getElementById("colorPicker");
let canvasColor = document.getElementById("canvasColor");
let canvas = document.getElementById("myCanvas");
let clearButton = document.getElementById("clearButton");
let saveButton = document.getElementById("saveButton");
let fontPicker = document.getElementById("fontPicker");
let retrievebutton = document.querySelector("#clear");
let ctx = canvas.getContext("2d"); // Should be "2d", not "2D"

colorPicker.addEventListener("change", (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

let isDrawing = false; // Initialize isDrawing as false
let lastX = 0;
let lastY = 0;

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.offsetX; // Correct the event reference
    lastY = e.offsetY; // Correct the event reference
});

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY); // Fix typo in lineTo
        ctx.stroke();
        lastX = e.offsetX; // Correct the event reference
        lastY = e.offsetY; // Correct the event reference
    }
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false; // Stop drawing when the mouse is released
});

canvas.addEventListener("mouseout", () => {
    isDrawing = false; // Stop drawing when the mouse leaves the canvas
});

canvasColor.addEventListener("change",(e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,400);
})

fontPicker.addEventListener("change",(e)=>{
    ctx.lineWidth = e.target.value;
})

clearButton.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})
saveButton.addEventListener("click",()=>{
    localStorage.setItem("canvasContents",canvas.toDataURL());
    let link = document.createElement("a");
    link.download = "my-canvas.png";
    link.href = canvas.toDataURL();
    link.click();
});

retrievebutton.addEventListener("click",()=>{
    let savedCanvas= localStorage.getItem("canvasContents");

    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0);
    }
})
