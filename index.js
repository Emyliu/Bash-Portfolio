window.onload = () => { const particlesJSON = {
    "particles": {
            "number": {
                "value": 95,
                "density": {
                    "enable": true,
                    "value_area": 700 //Denser the smaller the number.
                }
            },
            "color": { //The color for every node, not the connecting lines.
                "value": "#01579b" //Or use an array of colors like ["#9b0000", "#001378", "#0b521f"]
            },
            "shape": {
                "type": "circle", // Can show circle, edge (a square), triangle, polygon, star, img, or an array of multiple.
                "stroke": { //The border
                    "width": 1,
                    "color": "#145ea8"
                },
                "polygon": { //if the shape is a polygon
                    "nb_sides": 5
                },
                "image": { //If the shape is an image
                    "src": "",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.2,
                "random": true
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": false,
                "distance": 200, //The radius before a line is added, the lower the number the more lines.
                "color": "#007ecc",
                "opacity": 0.3,
                "width": 0.5
            },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "top", //Move them off the canvas, either "none", "top", "right", "bottom", "left", "top-right", "bottom-right" et cetera...
                "random": true,
                "straight": false, //Whether they'll shift left and right while moving.
                "out_mode": "out", //What it'll do when it reaches the end of the canvas, either "out" or "bounce".
                "bounce": false, 
            }
        },
        "retina_detect": true
    }
    
    particlesJS("particles-js", particlesJSON)
}