var port; // Declare the port variable outside the function

function messageSenderAndReceiver() {
  // listen for messages
  window.addEventListener(
    "message",
    function (event) {
        if (event.ports[0] != null) {
          // the port is ready for communication,
          // so you can use port.postMessage(message); wherever you want
          port = event.ports[0];
          // To listen to messages coming from the Dart side, set the onmessage event listener
          port.onmessage = function (event) {
            // event.data contains the message data coming from the Dart side
            console.log(event.data);
          };
        }
    },
    false
  );
}

document.addEventListener("DOMContentLoaded", function () {
  var sendMessageButton = document.getElementById("sendMessageButton");

  // Add click event listener to the "Send Message to WebView" button
  sendMessageButton.addEventListener("click", function () {
    // Send message to the WebView using window.postMessage()
    window.postMessage("Hello from the webpage");
  });

  // Call the messageSenderAndReceiver() function to set up message handling
  messageSenderAndReceiver();

  // Send the 'LOADING_CANCEL' message to the WebView
  window.addEventListener("load", function () {
    if (port) {
      port.postMessage("LOADING_CANCEL");
    }
  });
});
