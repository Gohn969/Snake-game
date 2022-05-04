//variables
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let width = 10;

//dom selectors
const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const score = document.getElementById("score");

function createGrid() {
  //create 100 of elements
  for (let i = 0; i < 100; i++) {
    //create element
    const square = document.createElement("div");
    square.classList.add("square");
    //append in a grid container
    grid.append(square);
    //push it into square array
    squares.push(square);
  }
}

createGrid();

currentSnake.forEach((index) => {
  squares[index].classList.add("snake");
});

function move() {
  //remove last element from our current snake
  let tail = currentSnake.pop();

  //remove styling from it
  squares[tail].classList.remove("snake");
  //add square in the direction we are heading
  currentSnake.unshift(currentSnake[0] + direction);
  //style the element
  squares[currentSnake[0]].classList.add("snake");
}

move();

//calling move functin repeatedly
let timerId = setInterval(move, 1000);

//keycode
//39 is right arrow
//38 is for the up arrow
//37 is for left arrow
//40 is for down arrow

function control(e) {
  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
}

document.addEventListener("keyup", control);
