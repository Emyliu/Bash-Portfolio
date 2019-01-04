window.onload = function() {
    sessionStorage.setItem('first_load', 'true');
    sessionStorage.setItem('path', '~');
    let welcome_messages = ["Hi, my name is Edmond Liu. Welcome to my personal website!", "Login Time: " + Date(), "GNU bash (custom version), version 1.0.0", "The shell commands are defined internally. Type 'help' to see this list of commands.", "Contact me at emyliu@edu.uwaterloo.ca, or connect with my LinkedIn at https://www.linkedin.com/in/emyliu/"];
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
            nodeList[i].innerHTML += message[pos];
            pos++;
            setTimeout(increment, 20);
            }
        }

    }
    generate_space();
    
    generate_input();
};



function generate_input() {
    let form = document.createElement("form");
    form.setAttribute("onsubmit", "loop(this); return false;");
    
    let user_id = document.createElement("label");
    user_id.innerHTML = 'root@eliu:' + sessionStorage.getItem('path') + '$&nbsp;';
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
        elem.getElementsByClassName("invisible_textbox")[0].disabled = true;
        let input = elem.getElementsByClassName("invisible_textbox")[0].value
        generate_output(input);
        generate_input();
    }
    
}

function generate_output(input) {
    let trimmed = input.replace(/\s+/g, ' ').trim()
    let arr = trimmed.split(' ');
    console.log(trimmed);
    if (arr[0] == 'cd') {
        if (arr.length == 1) {
            sessionStorage.setItem('path', '~');
        } else if (arr[1] == "..") {
            sessionStorage.setItem('path', '~');
        } else if (arr[1] == "Projects" && sessionStorage.getItem('path') == '~') {
            sessionStorage.setItem('path', 'Projects');
        } else if (arr[1] == "Resume" && sessionStorage.getItem('path') == '~') {
            sessionStorage.setItem('path', 'Resume');
        } else if (arr[1] == "About" && sessionStorage.getItem('path') == '~') {
            sessionStorage.setItem('path', 'About');
        }  else if (arr[1] == "../Projects" && sessionStorage.getItem('path') != '~') {
            sessionStorage.setItem('path', 'Projects');
        } else if (arr[1] == "../Resume" && sessionStorage.getItem('path') != '~') {
            sessionStorage.setItem('path', 'Resume');
        } else if (arr[1] == "../About" && sessionStorage.getItem('path') != '~') {
            sessionStorage.setItem('path', 'About');
        } else {
            let err = "-bash: " + arr[0] + ": " + arr[1] + ": No such directory";
            generate_text(err);
        }
    } else if (arr[0] == '') {
        
    } else if (arr[0] == "contact") {
        generate_space();
        generate_text("Email: emyliu@edu.uwaterloo.ca");
        generate_text("LinkedIn: https://www.linkedin.com/in/emyliu/");
        generate_text("GitHub: https://github.com/Emyliu")
        generate_space();
    
        
    } else if (arr[0] == 'help') {
        generate_text("ls - lists the files and directories in your current directory. Assume that files with no extension are directories.");
        generate_text("cd [dir] - navigates to the specified directory. Use .. to access parent directory");
        generate_text("cat [filename] - opens the requested file");
        generate_text("contact - displays my contact information");
        generate_text("help - displays this help page");
        
    } else if (arr[0] == 'ls') {
        let path = sessionStorage.getItem('path');
        if (arr.length > 1) {
            let err = "-bash: " + arr[0] + ": expected 0 arguments";
            generate_text(err);
        } else {
            let arr = listing[sessionStorage.getItem('path')];
            let str = arr.join('&nbsp;&nbsp;&nbsp;&nbsp;');
            generate_text(str);
        }
    } else if (arr[0] == 'cat') {
        if (arr.length < 2) {
            let err = "-bash: " + arr[0] + ": expected 1 arguments";
            generate_text(err);
        } else {
            let files = listing[sessionStorage.getItem('path')];
            let index = files.indexOf(arr[1]);
            if (index == -1) {
                let err = "-bash: " + arr[0] + ": " + arr[1] + ": No such file";
                generate_text(err); 
            } else {
                open_file(files[index]);
            }
            
        }
    }
    
    else {
        let err = "-bash: " + arr[0] + ": command not found";
        generate_text(err);
    }
}


function generate_text(input) {
    let paragraph = document.createElement("p");
    paragraph.innerHTML = input;
    document.getElementById('main').appendChild(paragraph);
}

function generate_space() {
    let br = document.createElement("br");
    document.getElementById("main").appendChild(br);
}

function open_file(input) {
    console.log(input);
}

let listing = {'~' : [], 'Projects' : ["Partylist.txt", "CitySnap.txt", "Casino++.txt", "ObscuraChess.txt"], 'About' : ["AboutMe.txt", "Music.txt"], 'Resume' : ["Skills.txt", "Experience.txt", "Contact.txt"]};



    