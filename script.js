javascript document.addEventListener("DOMContentLoaded", 
   function() { 
     var sendMessageButton = document.getElementById("sendMessageButton");

      // Add click event listener to the "Send Message to WebView" button 
      sendMessageButton.addEventListener("click", 
        function() { 
          // Send message to the WebView using window.postMessage() 
          window.postMessage("Hello from the webpage"); 
        });

    // Listen for messages coming from the WebView 
    window.addEventListener("message", 
       function(event) { 
         // Handle the received message here 
         var receivedMessage = event.data; 
         console.log("Received message from WebView:", receivedMessage); 
       }); 
    }
);
