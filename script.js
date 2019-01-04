window.onload = function() {
    sessionStorage.setItem('first_load', 'true');
    let welcome_messages = [Date(), "GNU bash, version 3.2.57(1)-release", "These shell commands are defined internally. Type 'help' to see this list.", "Contact me at emyliu@edu.uwaterloo.ca, or connect with my LinkedIn at https://www.linkedin.com/in/emyliu/"]
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
            if (pos < message.length) {
            nodeList[i].innerHTML += message.charAt(pos)
            pos++;
            setTimeout(increment, 20);
            }
        }

    }
    let br = document.createElement("br");
    
    document.getElementById("main").appendChild(br);
    
    generate_input();
};



function generate_input() {
    let form = document.createElement("form");
    form.setAttribute("onsubmit", "loop(this); return false;");
    
    let user_id = document.createElement("label");
    user_id.innerHTML = "root@eliu:~$&nbsp;";
    user_id.className = "inline-label";
    
    
    let input = document.createElement('input');
    input.type = "text";
    input.className = "invisible_textbox";
    
    
    let button = document.createElement('input');
    button.type = "submit";
    button.style.display = "none";
    button.className = "button";
    
    
    form.appendChild(user_id);
    form.appendChild(input);
    form.appendChild(button);
    document.getElementById("main").appendChild(form);
    
    input.focus();
    sessionStorage.setItem('first_load', 'false');
}

function loop(elem) {
    if (sessionStorage.getItem('first_load') == "false") {
        console.log(elem.getElementsByClassName("invisible_textbox")[0].value);
        generate_input();
    }
    
}



    