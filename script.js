var port;

function messageSenderAndReceiver() {
  // listen for messages
  window.addEventListener(
    "message",
    function (event) {
        if (event.ports[0] != null) {
          port = event.ports[0];
          port.onmessage = function (event) {
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

    // Send the 'LOADING_CANCEL' message to the WebView
    if (port) {
      port.postMessage("LOADING_CANCEL");
    }
  });

  // Call the messageSenderAndReceiver() function to set up message handling
  messageSenderAndReceiver();
});
