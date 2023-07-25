// Get the canvas element and context
const canvas = document.getElementById("path-canvas");
const ctx = canvas.getContext("2d");

// Define the starting point of the path
const startPoint = {x: canvas.width/2, y: canvas.height/2};
const path = [startPoint];

// Define the direction offsets
const directions = {
  "forward": {x: 0, y: -10},
  "backward": {x: 0, y: 10},
  "left": {x: -10, y: 0},
  "right": {x: 10, y: 0}
};

// Draw the path on the canvas
function drawPath() {
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  path.forEach(point => {
    ctx.lineTo(point.x, point.y);
  });
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Add the command to the path variable
function addToPath(command) {
  const offset = directions[command];
  if (!offset) {
    return;
  }
  const x = startPoint.x + offset.x;
  const y = startPoint.y + offset.y;
  path.push({x: x, y: y});
  startPoint.x = x;
  startPoint.y = y;
}

// Send the command to the server
function sendCommand(event) {
  event.preventDefault();
  const command = event.submitter.value;
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Update the last command displayed on the page
      document.getElementById("last-command").innerHTML = command;
      // Add the command to the path and draw it on the canvas
      addToPath(command);
      drawPath();
    }
  };
  xmlhttp.open("POST", "controller.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("command=" + command);
}

// Toggle the canvas visibility
const toggleCanvas = document.getElementById("toggle-canvas");
toggleCanvas.addEventListener("change", () => {
  const pathCanvas = document.getElementById("path-canvas");
  pathCanvas.style.display = toggleCanvas.checked ? "block" : "none";
});

// Listen for double clicks on the canvas
canvas.addEventListener("dblclick", function() {
  // Get the last two points on the path
  const lastPoint = path[path.length-1];
  const secondLastPoint = path[path.length-2];
  // Calculate the new coordinates for the two new points
  const distance = 10;
  const x1 = lastPoint.x + directions["left"].x;
  const y1 = lastPoint.y + directions["up"].y;
  const x2 = lastPoint.x + directions["right"].x;
  const y2 = lastPoint.y + directions["up"].y;
  // Add the new points to the path variable and draw them on the canvas
  path.push({x: x1, y: y1});
  path.push({x: x2, y: y2});
  drawPath();
});