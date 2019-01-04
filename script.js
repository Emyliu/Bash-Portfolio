window.onload = function() {
    sessionStorage.setItem('first_load', 'true');
    sessionStorage.setItem('path', '~');
      
    
    let welcome_messages = ["Hi, my name is Edmond Liu. Welcome to my terminal-themed personal website!", "Login Time: " + Date(), "Inspired by GNU bash, version 1.0.1b", "The shell commands are defined internally. Type 'help' to see this list of commands.", "To change the appearance of this terminal, type 'settings' into the prompt", "Source code for this website available at: https://github.com/Emyliu/Bash-Portfolio"];
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
        let input = elem.getElementsByClassName("invisible_textbox")[0].value;
        
        if (input.trim() != "") {
        commands.push(input);
        command_index = commands.length - 1;
        }
        
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
        generate_space();
        generate_text("This is a command-line interface. Type your command next to the blinking cursor and press ENTER to execute your command.");
        generate_space();
        generate_text("ls - lists the files and directories in your current directory. Assume that files with no extension are directories.");
        generate_text("cd [dir] - navigates to the specified directory. Use .. to access parent directory");
        generate_text("cat [filename] - opens the requested file");
        generate_text("contact - displays my contact information");
        generate_text("help - displays this help page");
        generate_space();
        
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
            if (index == -1 || sessionStorage.getItem('path') == '~') {
                let err = "-bash: " + arr[0] + ": " + arr[1] + ": No such file";
                generate_text(err); 
            } else {
                open_file(arr[1]);
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

function generate_link(input, url) {
    console.log("URL given: " + url);
    let button = document.createElement("button");
    button.onclick = function() { window.open(url, '_blank'); return false};
    button.innerHTML = input;
    button.className = "invisible_button";
    
    
    document.getElementById("main").appendChild(button);
}

function open_file(input) {
    console.log("Input: " + input);
    generate_space();
    let arr = text_info[input];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "\n") {
            generate_space();
        } else if (arr[i].substring(0,4) == "LINK") {
            generate_link(arr[i].substring(4), link_info[input]);
            // remove this line if you don't want a space after each buttton
            generate_text("");
        } else {
            generate_text(arr[i]);
        }
    } 
    generate_space();
}


let listing = {'~' : ["Projects", "Resume", "About"], 'Projects' : ["Partylist.txt", "CitySnap.txt", "Casino++.txt", "ObscuraChess.txt"], 'About' : ["AboutMe.txt", "Music.txt"], 'Resume' : ["Skills.txt", "Experience.txt"]};

let text_info = {
             "Partylist.txt" : ["LINKClick on this line to see a live demo at Partylist.xyz", "\n", "Partylist is a collaborative Spotify playlist creator and themed web player built with a JavaScript front-end and PHP + SQL backend.", "The web player features color blending with any song's album art in order to create a beautiful ambience.", "This app is built on top of Spotify's API endpoints and utilizes OAuth 2.0 for authentication with Spotify services."],
             "CitySnap.txt" : ["LINKClick on this line to view the source code of CitySnap", "\n", "CitySnap is an iOS application that allows people in Toronto to easily report hazards and items needing repair to the city authoriries.", "It was developed during Elevate Hackathon 2018, and my main role was a backend developer.", "I wrote a grid system and ranking algorithm to combine reports in close proximity, and setup a Node.js server connected to Firebase for storage."],
             "Casino++.txt" : ["LINKClick on this line to view the source code of Casino++", "\n", "Casino++ is a C++ console application that implements Las Vegas Blackjack with card-resplitting, as well as a poker hand analyzer.", "It is built upon Card, Player, and Game classes. Through this, I gained experience with Object Oriented techniques such as Inheritance and Data Abstraction", "I wrote a unit testing suite using the Catch2 testing framework."],
             "ObscuraChess.txt" : ["LINKClick on this line to view the source code of ObscuraChess", "\n", "ObscuraChess is an intuitive voice interface for Amazon Alexa to play blindfold chess using algebraic chess notation.", "I augmented the existing Sunfish.py chess engine to support interrupted operation through voice interface, adjustable computation time, and a toggle to play as Black"],
             "AboutMe.txt" : ["My name is Edmond Liu, and I'm a second-year computer science student at the University of Waterloo. I am currently working at IBM Canada with the Cloud Platform team as a application developer.", "I have experience with many aspects of software development, and my main focus right now is full-stack development."],
             "Music.txt" : ["Heres a short list of my favorite songs at the moment: ", "Alvvays - Dreams Tonite", "Vallis Alps - Reprieve", "CHVRCHES - Wonderland", "Milk & Bone - KIDS"],
             "Skills.txt" : ["Languages: C++, JavaScript, Python, C, CSS, HTML, SQL, Scheme", "Tools and Technologies: Bash scripting, Git, Angular, REST API, Node.js, Flask, JQuery, Bootstrap"],
             "Experience.txt" : ["Home Trust Company: IT Engineering and Software Developer", "Developed employee vacation tracker in JS"]
};

let link_info = {
            "Partylist.txt" : "http://www.partylist.xyz",
            "CitySnap.txt" : "https://github.com/CitySnaps/CitySnap",
            "Casino++.txt" : "https://github.com/Emyliu/CasinoPlusPlus",
            "ObscuraChess.txt" : "https://github.com/Emyliu/ObscuraChess"
};



// This code is used to implement the arrowup and arrowdown to cycle through old commands in bash.

window.addEventListener("keydown", commands, false);

function commands(event) {
    if (event.keyCode == 40) {
        let max = commands.length
        if (command_index < max - 1) {
            command_index += 1;
        }
        document.getElementById('main').lastChild.getElementsByClassName('invisible_textbox')[0].value = commands[command_index];

    } else if (event.keyCode == 38) {
         if (command_index > 0) {
             command_index -= 1;
        }
        document.getElementById('main').lastChild.getElementsByClassName('invisible_textbox')[0].value = commands[command_index];
    }
}

var commands = [""]
var command_index = 0;


    