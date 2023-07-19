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
      }
    };
    xmlhttp.open("POST", "controller.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("command=" + command);
  }