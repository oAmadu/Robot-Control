// Define variables for storing the path
var path = [];
var canvas = null;
var ctx = null;

// Get the canvas element and context
canvas = document.getElementById("path-canvas");
ctx = canvas.getContext("2d");
const toggleCanvas = document.getElementById("toggle-canvas");
const pathCanvas = document.getElementById("path-canvas");

toggleCanvas.addEventListener("change", () => {
  if (toggleCanvas.checked) {
    pathCanvas.style.display = "block";
  } else {
    pathCanvas.style.display = "none";
  }
});

// Define the starting point of the path
var startPoint = {x: canvas.width/2, y: canvas.height/2};
path.push(startPoint);

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the path on the canvas
function drawPath() {
  clearCanvas();
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  for (var i = 1; i < path.length; i++) {
    ctx.lineTo(path[i].x, path[i].y);
  }
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Add the command to the path variable
function addToPath(command) {
  var x = startPoint.x;
  var y = startPoint.y;

  // Calculate the new coordinates based on the command
  switch (command) {
    case "forward":
      y -= 10;
      break;
    case "backward":
      y += 10;
      break;
    case "left":
      x -= 10;
      break;
    case "right":
      x += 10;
      break;
    default:
      return;
  }

  // Draw the line segment on the canvas
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Add the new coordinates to the path variable
  path.push({x: x, y: y});

  // Update the start point for the next line segment
  startPoint = {x: x, y: y};
}

// Send the command to the server
function sendCommand(event) {
  console.log("Sending command...");
  event.preventDefault();
  var command = event.submitter.value;
  console.log("Command: " + command); // Log the command parameter
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Response: " + this.responseText); // Log the response from the server
      document.getElementById("last-command").innerHTML = command;
      addToPath(command);
    }
  };
  xmlhttp.open("POST", "controller.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("command=" + command);
}

// Listen for double clicks on the canvas
canvas.addEventListener("dblclick", function() {
  // Get the last two points on the path
  var lastPoint = path[path.length-1];
  var secondLastPoint = path[path.length-2];

  // Calculate the direction of the last line segment
  var dx = lastPoint.x - secondLastPoint.x;
  var dy = lastPoint.y - secondLastPoint.y;

  // Calculate the angle of the last line segment
  var angle = Math.atan2(dy, dx);

  // Calculate the new coordinates for the two new points
  var distance = 10;
  var x1 = lastPoint.x + distance * Math.cos(angle - Math.PI/4);
  var y1 = lastPoint.y + distance * Math.sin(angle - Math.PI/4);
  var x2 = lastPoint.x + distance * Math.cos(angle + Math.PI/4);
  var y2 = lastPoint.y + distance * Math.sin(angle + Math.PI/4);

  // Add the new points to the path variable
  path.push({x: x1, y: y1});
  path.push({x: x2, y: y2});

  // Draw the updated path on the canvas
  drawPath();
});