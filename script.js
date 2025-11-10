// 🎯 ACCESS ALL ELEMENTS
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;  // X starts the game

// 🏆 All Winning Patterns
const winPatterns = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Col 1
    [1, 4, 7], // Col 2
    [2, 5, 8], // Col 3
    [0, 4, 8], // Diagonal 1
    [2, 4, 6], // Diagonal 2
];

// 🎮 MAIN GAME LOGIC — WHEN A BOX IS CLICKED
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnX === true) {
            box.innerText = "X";
            box.style.color = "aqua";
            box.style.fontFamily = "'Orbitron', sans-serif";
            turnX = false;  // Now O Will Play Next
        } else {
            box.innerText = "O";
            box.style.color = "#FFFF33";
            box.style.fontFamily = "'Orbitron', sans-serif";
            turnX = true; // Now X Will Play Next
        }
        box.disabled = true;
        checkWinner();
    })
})

// CHECK WINNER / CHECK DRAW FUNCTION
const checkWinner = () => {
    let hasWin = false;

    // CHECK EVERY WIN PATTERN
    for (let patterns of winPatterns) {
        let indx1 = boxes[patterns[0]].innerText;
        let indx2 = boxes[patterns[1]].innerText;
        let indx3 = boxes[patterns[2]].innerText;

        if (indx1 !== "" && indx2 !== "" && indx3 !== "") {
            if (indx1 === indx2 && indx2 === indx3) {
                hasWin = true;
                showWinner(indx1);
            }
        }
    }

    // DRAW CHECK - if all boxes filled but no winner
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {   
            allFilled = false;
        }
    });

    if (!hasWin && allFilled) {
        showDraw();
    }
};


// DISPLAY WINNER
const showWinner = (winner) => {
    msg.innerText = `🎉🏆 Congratulations, Winner is ${winner}`;
    msg.style.fontFamily = "'Orbitron', sans-serif";
    msg.style.color = "white" 
    msg.style.textShadow = "2px 2px 5px rgba(0, 0, 0, 0.323)";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// DISPLAY DRAW MESSAGE
const showDraw = () => {
    msg.innerText = "😅 It's a Draw!";
    msg.style.fontFamily = "'Orbitron', sans-serif";
    msg.style.color = "white";
    msg.style.textShadow = "2px 2px 5px rgba(0,0,0,0.3)";
    msgContainer.classList.remove("hide");
    disableBoxes()
    
}

// ENABLE ALL BOXES 
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

// DISABLE ALL BOXES
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}


// RESET GAME
const resetGame = () => {
  turnX = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// BUTTON LISTENER 
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);