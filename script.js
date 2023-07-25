// Define variables for storing the path
var path = [];
var canvas = null;
var ctx = null;

// Get the canvas 
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

// send drawn path
function sendPath() {
  console.log("Sending path: " + JSON.stringify(path));
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Path stored in database.");
    }
  };
  xmlhttp.open("POST", "store_path.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("path=" + JSON.stringify(path));
}

// Define the starting point 
var startPoint = {x: canvas.width/2, y: canvas.height/2};
path.push(startPoint);

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Drawing the path 
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

// Add the command to the path
function addToPath(command) {
  var x = startPoint.x;
  var y = startPoint.y;


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

   //Draw the line of the path
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();


  path.push({x: x, y: y});


  startPoint = {x: x, y: y};
}

// Send the command to the db and add it to the path
function sendCommand(event) {
  console.log("Sending command...");
  event.preventDefault();
  var command = event.submitter.value;
  console.log("Command: " + command); // for debugging
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log("Response: " + this.responseText); // for debugging
      document.getElementById("last-command").innerHTML = command;
      addToPath(command);
    }
  };
  xmlhttp.open("POST", "controller.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("command=" + command);

  // Send the path
  sendPath();
}


canvas.addEventListener("dblclick", function() {
  var lastPoint = path[path.length-1];
  var secondLastPoint = path[path.length-2];

  var dx = lastPoint.x - secondLastPoint.x;
  var dy = lastPoint.y - secondLastPoint.y;

  var angle = Math.atan2(dy, dx);


  var distance = 10;
  var x1 = lastPoint.x + distance * Math.cos(angle - Math.PI/4);
  var y1 = lastPoint.y + distance * Math.sin(angle - Math.PI/4);
  var x2 = lastPoint.x + distance * Math.cos(angle + Math.PI/4);
  var y2 = lastPoint.y + distance * Math.sin(angle + Math.PI/4);


  path.push({x: x1, y: y1});
  path.push({x: x2, y: y2});

  // Draw the updated path on the canvas
  drawPath();
  
});