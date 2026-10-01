//HOME and Character Customization
const startScreen = document.querySelector("#start-screen");
const charScreen = document.querySelector("#char-screen");
const gameScreen = document.querySelector("#game-screen");

const playButton = document.querySelector("#play-button");
const charButton = document.querySelectorAll(".character");

// Click play
playButton.addEventListener("click", () => {
    // Hide home screen
    startScreen.classList.add("hidden");

    // Reveal character selection screen
    charScreen.classList.remove("hidden");
});



import { createImage, startGame } from "./script.js";

const characters = {
    yotsugi: {
        snake: createImage("../static/images/yotsugi/snake.jpg"),
        food: createImage("../static/images/yotsugi/food.jpg")
        // background: "../static/images/yotsugi/background.png"
    },

    shinobu: {
        snake: createImage("../static/images/shinobu/snake.jpg"),
        food: createImage("../static/images/shinobu/food.jpg")
        // background: "../static/images/shinobu/background.png"
    }
};


//Choose character
charButton.forEach((button) =>{

    button.addEventListener("click", () => {

        //set data for the selected chara
        const selectedName = button.dataset.character;
        const chosenChara = characters[selectedName];
        
        //Hide character selection screen
        charScreen.classList.add("hidden");

        //Reveal game screen
        gameScreen.classList.remove("hidden");


        startGame(chosenChara);
    });

});


