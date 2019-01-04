window.onload = function() {
    let welcome_messages = ["Edmond Liu's personal website: GNU bash, version 3.2.57(1)-release", "These shell commands are defined internally. Type 'help' to see this list.", "Contact me at emyliu@edu.uwaterloo.ca, or my LinkedIn at ......"]
    for (let i = 0; i < welcome_messages.length; i++) {
        // create nodes for each line of the welcome messages.
        let paragraph = document.createElement("p");
        document.getElementById("main").appendChild(paragraph);
    }
    let nodeList = document.getElementById("main").querySelectorAll("p");
    
    for (let i = 0; i < welcome_messages.length; i++) {
        let message = welcome_messages[i];
        let pos = 0;
        increment();
        function increment() {
            console.log("Call");
            if (pos < message.length) {
            nodeList[i].innerHTML += message.charAt(pos)
            pos++;
            setTimeout(increment, 20);
            }
        }

    }
    
    
    
};
    