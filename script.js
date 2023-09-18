var port;

function messageSenderAndReceiver() {
  console.log('message event received');
  // listen for messages
  window.addEventListener(
    "message",
    function (event) {
        console.log('trigger message function');
        console.log(event.ports[0]);
        if (event.ports[0] != null) {
          port = event.ports[0];
          console.log('port assigned:', port);
          port.onmessage = function (event) {
            console.log('trigger onmessage function');
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
    console.log('before port');
    // Send the 'LOADING_CANCEL' message to the WebView
    if (port) {
      console.log('found port');
      console.log(port);
      port.postMessage("LOADING_CANCEL");
    }
  });

  // Call the messageSenderAndReceiver() function to set up message handling
  messageSenderAndReceiver();
});
